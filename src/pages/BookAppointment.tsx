import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookAppointment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [paymentMode, setPaymentMode] = useState<"online" | "offline" | null>(null);
  const [resolvedMode, setResolvedMode] = useState<"online" | "inclinic" | null>(null);
  const [showModeModal, setShowModeModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const doctor = state?.doctor;
  const doctorName = state?.doctorName || doctor?.user?.username || "Doctor";
  const slot = state?.slot;
  const passedMode = state?.mode;
  const doctorId = Number(doctor?.user_id);
  const fee = state?.fee || doctor?.consultation_fee || 0;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://landing.docapp.co.in";
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

  // Early validation
  if (!doctor || !slot || !doctorId || !passedMode || isNaN(doctorId)) {
    toast.error("Missing data for booking. Please go back.");
    return (
      <div className="text-center mt-10 text-red-600">
        Invalid Booking Data
        <button
          className="block mt-2 text-blue-600 underline"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user data from:", `${API_BASE_URL}/api/auth/get-user-data`);
        const res = await fetch(`${API_BASE_URL}/api/auth/get-user-data`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          console.log("User data fetched:", data);
          setUser(data.userData); // Expecting { id, name, email, phone }
        } else {
          console.error("Failed to fetch user data:", res.status, res.statusText);
          toast.error("Failed to fetch user data. Please log in.");
        }
      } catch (err) {
        console.error("Fetch user error:", err);
        toast.error("Error fetching user data.");
      }
    };
    fetchUser();
  }, [API_BASE_URL]);

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay script loaded");
      setRazorpayLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      toast.error("Failed to load payment gateway.");
      setRazorpayLoaded(false);
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle hybrid mode when passedMode is 'all'
  useEffect(() => {
    if (passedMode === "all") {
      const slotMode = slot.mode?.toLowerCase();
      if (slotMode === "hybrid") {
        setShowModeModal(true);
      } else if (slotMode === "online") {
        setResolvedMode("online");
        setPaymentMode("online"); // Default to online payment for online consultation
      } else if (slotMode === "offline") {
        setResolvedMode("inclinic");
      }
    } else {
      setResolvedMode(passedMode === "online" ? "online" : "inclinic");
      if (passedMode === "online") {
        setPaymentMode("online"); // Default to online payment for online consultation
      }
    }
  }, [passedMode, slot]);

  const handleBook = async () => {
    if (!resolvedMode) {
      toast.error("Consultation mode not selected.");
      return;
    }

    const isOnline = resolvedMode === "online";
    const isOffline = resolvedMode === "inclinic";

    if (isOffline && !paymentMode) {
      toast.error("Please select a payment mode.");
      return;
    }

    const bookingPayload = {
      doctor_id: doctorId,
      date: slot.date,
      start: slot.start,
      end: slot.end,
      type: isOnline ? "online_video" : "offline",
      payment_mode: isOnline ? "online" : paymentMode,
       fee,
    };

    try {
      // Create appointment first
      console.log("Creating appointment with payload:", bookingPayload);
      const appointmentRes = await fetch(`${API_BASE_URL}/api/appointment/create-appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookingPayload),
      });

      const appointmentData = await appointmentRes.json();
      console.log("Appointment response:", appointmentData);
if (!appointmentRes.ok || !appointmentData.createdAppointment?.id) {
  const errorMsg = appointmentData?.message || "Failed to create appointment.";
  setErrorMessage(errorMsg); // show on screen
  toast.error(errorMsg); // optional: show toast
  return;
}

      if (isOnline || paymentMode === "online") {
        if (!user) {
          console.error("User data not available:", user);
          toast.error("User data not available. Please log in.");
          return;
        }

        if (!razorpayLoaded || !window.Razorpay) {
          console.error("Razorpay script not loaded or window.Razorpay undefined");
          toast.error("Payment gateway not loaded. Please try again.");
          return;
        }

        // Create Razorpay order
        const paymentPayload = {
          user_id: user.id || 1,
            amount: fee * 100, // ₹399.00 in paise, pending backend confirmation
          appointmentId: appointmentData.createdAppointment.id,
          patientName: user.name || "John Doe",
          patientEmail: user.email || "john@example.com",
          patientPhone: user.phone || "9999999999",
          doctorName,
          appointmentDate: slot.date,
          appointmentTime: slot.start,
        };
        console.log("Creating payment order with payload:", paymentPayload);
        const res = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(paymentPayload),
        });

        const orderData = await res.json();
        console.log("Create order response:", orderData);

        if (!res.ok || !orderData.order?.id) {
          toast.error(orderData?.message || "Failed to create payment order.");
          return;
        }

        // Show success message for initiating payment
        toast.success("Payment initiated successfully!");
// Inside the handleBook function, update the Razorpay options
const options = {
  key: orderData.order.key || RAZORPAY_KEY_ID,
  amount: orderData.order.amount, // Use backend-provided amount
  currency: "INR",
  name: "DocApp",
  description: `Consultation with ${doctorName}`,
  order_id: orderData.order.id,
  handler: async (response) => {
    try {
      // Verify payment
      console.log("Verifying payment with:", response);
      const verifyRes = await fetch(`${API_BASE_URL}/api/payment/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      const verifyData = await verifyRes.json();
      console.log("Verify payment response:", verifyData);

      if (verifyRes.ok && verifyData.message === "payment verified") {
        toast.success("Payment successful! Redirecting to status page...");
        navigate("/payment-status", {
          state: {
            razorpay_order_id: response.razorpay_order_id,
            doctorName,
            slot,
            mode: resolvedMode,
            doctor,
          },
        });
      } else {
        toast.error(verifyData?.message || "Payment verification failed.");
        navigate("/payment-status", {
          state: {
            razorpay_order_id: response.razorpay_order_id,
            doctorName,
            slot,
            mode: resolvedMode,
            doctor,
          },
        });
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("Payment verification error.");
      navigate("/payment-status", {
        state: {
          razorpay_order_id: response.razorpay_order_id,
          doctorName,
          slot,
          mode: resolvedMode,
          doctor,
        },
      });
    }
  },
  prefill: {
    name: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    contact: user?.phone || "9999999999",
  },
  theme: {
    color: "#15803d",
  },
};

console.log("Opening Razorpay with options:", options);
try {
  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", (response) => {
    console.error("Razorpay payment failed:", response.error);
    toast.error(`Payment failed: ${response.error.description}`);
    navigate("/payment-status", {
      state: {
        razorpay_order_id: response.error.metadata.order_id,
        doctorName,
        slot,
        mode: resolvedMode,
        doctor,
        errorDescription: response.error.description, // Pass error description
        errorReason: response.error.reason, // Pass error reason
      },
    });
  });
  rzp.open();
  console.log("Razorpay modal opened");
} catch (err) {
  console.error("Razorpay initialization error:", err);
  toast.error("Failed to open payment gateway.");
}

        console.log("Opening Razorpay with options:", options);
        try {
          const rzp = new window.Razorpay(options);
          rzp.on("payment.failed", (response) => {
            console.error("Razorpay payment failed:", response.error);
            toast.error(`Payment failed: ${response.error.description}`);
            // Navigate to PaymentStatus page on failure
            navigate("/payment-status", {
              state: {
                razorpay_order_id: response.error.metadata.order_id,
                doctorName,
                slot,
                mode: resolvedMode,
                doctor, // Pass doctor data for retry option
              },
            });
          });
          rzp.open();
          console.log("Razorpay modal opened");
        } catch (err) {
          console.error("Razorpay initialization error:", err);
          toast.error("Failed to open payment gateway.");
        }
      } else {
        toast.success("Appointment successfully booked!");
        navigate("/");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Network or server error.");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Confirm Appointment</h2>

        <div className="space-y-2 mb-6">
          <p><strong>Doctor:</strong> {doctorName}</p>
          <p><strong>Mode:</strong> {resolvedMode === "inclinic" ? "In-Clinic" : "Online"}</p>
          <p><strong>Slot:</strong> {slot.day}, {slot.date} — {slot.start} to {slot.end}</p>
          <p><strong>Fee:</strong> ₹{fee}</p>

          {paymentStatus && (
            <p><strong>Payment Status:</strong> {paymentStatus}</p>
          )}

          {resolvedMode === "inclinic" && (
            <>
              <p><strong>Clinic Location:</strong>{" "}
                {doctor.user?.address?.[0]
                  ? `${doctor.user.address[0].house_no || ""}, ${doctor.user.address[0].street}, ${doctor.user.address[0].city}, ${doctor.user.address[0].state}, ${doctor.user.address[0].country}, ${doctor.user.address[0].pincode}`
                  : "Address not available"}
              </p>
              <div className="mt-4">
                <label className="block mb-1 font-medium">Select Payment Mode:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      onChange={() => setPaymentMode("online")}
                    />
                    Online
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="offline"
                      onChange={() => setPaymentMode("offline")}
                    />
                    Pay at Clinic
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
        {errorMessage && (
  <div className="text-red-600 font-medium text-center mb-4">
    {errorMessage}
  </div>
)}

        <button
          onClick={handleBook}
          className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
        >
          {resolvedMode === "online" || paymentMode === "online"
            ? "Proceed to Payment"
            : "Confirm Booking"}
        </button>
      </div>

      {showModeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl">
            <h2 className="text-lg font-bold text-green-700 mb-4 text-center">
              Choose Consultation Mode
            </h2>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setResolvedMode("online");
                  setPaymentMode("online");
                  setShowModeModal(false);
                }}
                className="bg-green-600 text-white py-2 rounded-xl"
              >
                Online
              </button>
              <button
                onClick={() => {
                  setResolvedMode("inclinic");
                  setShowModeModal(false);
                }}
                className="bg-green-800 text-white py-2 rounded-xl"
              >
                In-Clinic
              </button>
              <button
                onClick={() => {
                  setShowModeModal(false);
                  navigate(-1);
                }}
                className="text-gray-500 text-sm underline text-center mt-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default BookAppointment;