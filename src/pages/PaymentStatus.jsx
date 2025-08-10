// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const PaymentStatus = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const razorpayOrderId = state?.razorpay_order_id;
//   const doctorName = state?.doctorName || "Doctor";
//   const slot = state?.slot;
//   const mode = state?.mode;
//   const errorDescription = state?.errorDescription; // Razorpay error description
//   const errorReason = state?.errorReason; // Razorpay error reason

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://landing.docapp.co.in";

//   // Early validation
//   if (!razorpayOrderId || !slot || !mode) {
//     toast.error("Missing payment or appointment data.");
//     return (
//       <div className="text-center mt-10 text-red-600">
//         Invalid Payment Data
//         <button
//           className="block mt-2 text-blue-600 underline"
//           onClick={() => navigate("/")}
//         >
//           Go to Home
//         </button>
//       </div>
//     );
//   }

//   // Fetch payment status
//   useEffect(() => {
//     const fetchPaymentStatus = async () => {
//       try {
//         console.log("Fetching payment status for order:", razorpayOrderId);
//         const res = await fetch(
//           `${API_BASE_URL}/api/payment/status/${razorpayOrderId}`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const data = await res.json();
//         console.log("Payment status response:", data);

//         if (res.ok) {
//           setPaymentStatus(data.status);
//           setPaymentDetails(data.order); // Store order details for display
//         } else {
//           toast.error(data?.message || "Failed to fetch payment status.");
//         }
//       } catch (err) {
//         console.error("Fetch payment status error:", err);
//         toast.error("Error fetching payment status.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentStatus();
//   }, [API_BASE_URL, razorpayOrderId]);

//   // Handle retry booking
//   const handleRetryBooking = () => {
//     navigate("/book-appointment", { state: { doctor: state?.doctor, doctorName, slot, mode } });
//   };

//   // Render payment status
//   const renderStatusContent = () => {
//     if (loading) {
//       return (
//         <div className="text-center">
//           <p className="text-gray-600">Loading payment status...</p>
//           <div className="loader mx-auto mt-4 h-8 w-8 border-4 border-t-4 border-green-700 border-solid rounded-full animate-spin"></div>
//         </div>
//       );
//     }

//     if (!paymentStatus || !paymentDetails) {
//       return (
//         <div className="text-center">
//           <p className="text-red-600">Unable to retrieve payment status.</p>
//           <button
//             onClick={() => navigate("/")}
//             className="mt-4 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
//           >
//             Go to Home
//           </button>
//         </div>
//       );
//     }

//     switch (paymentStatus.toLowerCase()) {
//       case "paid":
//       case "success":
//         return (
//           <div className="text-center">
//             <h3 className="text-2xl font-semibold text-green-700 mb-4">
//               Payment Successful! 🎉
//             </h3>
//             <p className="mb-4">Your appointment has been booked successfully.</p>
//             <button
//               onClick={() => navigate("/")}
//               className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
//             >
//               Go to Home
//             </button>
//           </div>
//         );
//       case "failed":
//         return (
//           <div className="text-center">
//             <h3 className="text-2xl font-semibold text-red-600 mb-4">
//               Payment Failed ❌
//             </h3>
//             <p className="mb-4">
//               {errorDescription
//                 ? errorDescription
//                 : "There was an issue with your payment. Please try again."}
//               {errorReason === "payment_failed" && (
//                 <span className="block mt-2">
//                   Please try another payment method or contact your bank for assistance.
//                 </span>
//               )}
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleRetryBooking}
//                 className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
//               >
//                 Retry Booking
//               </button>
//               <button
//                 onClick={() => navigate("/")}
//                 className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
//               >
//                 Go to Home
//               </button>
//             </div>
//           </div>
//         );
//       case "pending":
//         return (
//           <div className="text-center">
//             <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
//               Payment Pending ⏳
//             </h3>
//             <p className="mb-4">
//               Your payment is being processed. Please check back later or contact support if the status does not update.
//             </p>
//             <button
//               onClick={() => navigate("/")}
//               className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
//             >
//               Go to Home
//             </button>
//           </div>
//         );
//       default:
//         return (
//           <div className="text-center">
//             <p className="text-red-600">Unknown payment status: {paymentStatus}</p>
//             <button
//               onClick={() => navigate("/")}
//               className="mt-4 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
//             >
//               Go to Home
//             </button>
//           </div>
//         );
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
//           Payment Status
//         </h2>

//         <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Appointment Details
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <p className="text-gray-600">
//                 <strong>Doctor:</strong> {doctorName}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Mode:</strong> {mode === "online" ? "Online" : "In-Clinic"}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Slot:</strong> {slot.day}, {slot.date} — {slot.start} to {slot.end}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Fee:</strong> ₹{(paymentDetails?.amount / 100).toFixed(2) || "399.00"}
//               </p>
//             </div>
//             {paymentDetails && (
//               <div>
//                 <p className="text-gray-600">
//                   <strong>Patient Name:</strong> {paymentDetails.notes?.patientName || "N/A"}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Patient Email:</strong> {paymentDetails.notes?.patientEmail || "N/A"}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Order ID:</strong> {paymentDetails.id || "N/A"}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Payment Status:</strong>{" "}
//                   <span
//                     className={
//                       paymentStatus.toLowerCase() === "paid" || paymentStatus.toLowerCase() === "success"
//                         ? "text-green-600"
//                         : paymentStatus.toLowerCase() === "failed"
//                         ? "text-red-600"
//                         : "text-yellow-600"
//                     }
//                   >
//                     {paymentStatus}
//                   </span>
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="bg-white shadow-md rounded-lg p-6">
//           {renderStatusContent()}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PaymentStatus;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentStatus = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const razorpayOrderId = state?.razorpay_order_id;
  const doctorName = state?.doctorName || "Doctor";
  const slot = state?.slot;
  const mode = state?.mode;
  const errorDescription = state?.errorDescription; // Razorpay error description
  const errorReason = state?.errorReason; // Razorpay error reason
  const initialPaymentStatus = state?.paymentStatus; // Status passed from BookAppointment

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://landing.docapp.co.in";

  // Early validation
  if (!razorpayOrderId || !slot || !mode) {
    toast.error("Missing payment or appointment data.");
    return (
      <div className="text-center mt-10 text-red-600">
        Invalid Payment Data
        <button
          className="block mt-2 text-blue-600 underline"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    );
  }

  // Fetch payment status
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        console.log("Fetching payment status for order:", razorpayOrderId);
        const res = await fetch(
          `${API_BASE_URL}/api/payment/status/${razorpayOrderId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();
        console.log("Payment status response:", data);

        if (res.ok) {
          // Use initialPaymentStatus if provided (e.g., 'failed' from Razorpay event), else fallback to backend status
          setPaymentStatus(initialPaymentStatus || data.status);
          setPaymentDetails(data.order); // Store order details for display
        } else {
          toast.error(data?.message || "Failed to fetch payment status.");
          // If backend fails but initialPaymentStatus is provided, use it
          if (initialPaymentStatus) {
            setPaymentStatus(initialPaymentStatus);
          }
        }
      } catch (err) {
        console.error("Fetch payment status error:", err);
        toast.error("Error fetching payment status.");
        // Fallback to initialPaymentStatus if available
        if (initialPaymentStatus) {
          setPaymentStatus(initialPaymentStatus);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [API_BASE_URL, razorpayOrderId, initialPaymentStatus]);

  // Handle retry booking
  const handleRetryBooking = () => {
    navigate("/book-appointment", { state: { doctor: state?.doctor, doctorName, slot, mode } });
  };

  // Render payment status
  const renderStatusContent = () => {
    if (loading) {
      return (
        <div className="text-center">
          <p className="text-gray-600">Loading payment status...</p>
          <div className="loader mx-auto mt-4 h-8 w-8 border-4 border-t-4 border-green-700 border-solid rounded-full animate-spin"></div>
        </div>
      );
    }

    if (!paymentStatus) {
      return (
        <div className="text-center">
          <p className="text-red-600">Unable to retrieve payment status.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
          >
            Go to Home
          </button>
        </div>
      );
    }

    switch (paymentStatus.toLowerCase()) {
      case "paid":
      case "success":
        return (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Payment Successful! 🎉
            </h3>
            <p className="mb-4">Your appointment has been booked successfully.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
            >
              Go to Home
            </button>
          </div>
        );
      case "failed":
        return (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-red-600 mb-4">
              Payment Failed ❌
            </h3>
            <p className="mb-4">
              {errorDescription
                ? errorDescription
                : "There was an issue with your payment. Please try again."}
              {errorReason === "payment_failed" && (
                <span className="block mt-2">
                  Please try another payment method or contact your bank for assistance.
                </span>
              )}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRetryBooking}
                className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
              >
                Retry Booking
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Go to Home
              </button>
            </div>
          </div>
        );
      case "pending":
        return (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-yellow-600 mb-4">
              Payment Pending ⏳
            </h3>
            <p className="mb-4">
              Your payment is being processed. Please check back later or contact support if the status does not update.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
            >
              Go to Home
            </button>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <p className="text-red-600">Unknown payment status: {paymentStatus}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
            >
              Go to Home
            </button>
          </div>
        );
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Payment Status
        </h2>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Appointment Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">
                <strong>Doctor:</strong> {doctorName}
              </p>
              <p className="text-gray-600">
                <strong>Mode:</strong> {mode === "online" ? "Online" : "In-Clinic"}
              </p>
              <p className="text-gray-600">
                <strong>Slot:</strong> {slot.day}, {slot.date} — {slot.start} to {slot.end}
              </p>
              <p className="text-gray-600">
                <strong>Fee:</strong> ₹{(paymentDetails?.amount / 100).toFixed(2) || "399.00"}
              </p>
            </div>
            {paymentDetails && (
              <div>
                <p className="text-gray-600">
                  <strong>Patient Name:</strong> {paymentDetails.notes?.patientName || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Patient Email:</strong> {paymentDetails.notes?.patientEmail || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Order ID:</strong> {paymentDetails.id || "N/A"}
                </p>
                <p className="text-gray-600">
                  <strong>Payment Status:</strong>{" "}
                  <span
                    className={
                      paymentStatus.toLowerCase() === "paid" || paymentStatus.toLowerCase() === "success"
                        ? "text-green-600"
                        : paymentStatus.toLowerCase() === "failed"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {paymentStatus}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          {renderStatusContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentStatus;