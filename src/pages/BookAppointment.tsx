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

  const doctor = state?.doctor;
  const doctorName = state?.doctorName || doctor?.user?.username || "Doctor";
  const slot = state?.slot;
  const passedMode = state?.mode;
  const doctorId = Number(doctor?.user_id);

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

  // Handle hybrid mode when passedMode is 'all'
  useEffect(() => {
    if (passedMode === "all") {
      const slotMode = slot.mode?.toLowerCase();
      if (slotMode === "hybrid") {
        setShowModeModal(true);
      } else if (slotMode === "online") {
        setResolvedMode("online");
      } else if (slotMode === "offline") {
        setResolvedMode("inclinic");
      }
    } else {
      setResolvedMode(passedMode === "online" ? "online" : "inclinic");
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
  };

  if (isOnline || paymentMode === "online") {
    navigate("/payment", {
      state: {
        ...bookingPayload,
        doctorName,
        paymentMode: "online",
      },
    });
  } else {
    try {
      const res = await fetch("https://landing.docapp.co.in/api/appointment/create-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookingPayload),
      });

      const data = await res.json();
      console.log("Booking doctor ID:", doctorId);

      if (res.ok && data.message === "appointment scheduled") {
        toast.success("Appointment successfully booked!");
        // navigate("/");
      } else {
        console.error("Booking failed:", data);
        toast.error(data?.message || "Booking failed.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Network or server error.");
    }
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
          <p><strong>Fee:</strong> ₹{doctor?.consultation_fee}</p>

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

        <button
          onClick={handleBook}
          className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
        >
          {resolvedMode === "online" || paymentMode === "online"
            ? "Proceed to Payment"
            : "Confirm Booking"}
        </button>
      </div>

      {/* 🔥 Mode Select Modal for Hybrid */}
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
