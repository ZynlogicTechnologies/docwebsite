
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Calendar, Clock, MapPin, Video, XCircle, CalendarPlus } from "lucide-react";

// // Define TypeScript interfaces for API response
// interface Appointment {
//   id: number;
//   user_id: number;
//   doctor_id: number;
//   appointment_date: string;
//   appointment_start_time: string;
//   appointment_end_time: string;
//   appointment_status: string;
//   appointment_type: string;
//   checkup_time: string | null;
//   prescription: string | null;
//   created_at: string;
//   createdAt: string;
//   updatedAt: string;
//   checkupAppointment: any[];
//   followUp: any[];
// }

// interface AppointmentFormatted {
//   id: string;
//   patient: string;
//   date: string;
//   time: string;
//   type: string;
//   status: string;
// }

// const ViewAppointments: React.FC = () => {
//   const [appointments, setAppointments] = useState<AppointmentFormatted[]>([]);
//   const [filteredAppointments, setFilteredAppointments] = useState<AppointmentFormatted[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [filterType, setFilterType] = useState<string>("all");
//   const [filterStatus, setFilterStatus] = useState<string>("all");
//   const [sortBy, setSortBy] = useState<"date" | "status">("date");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [rescheduleId, setRescheduleId] = useState<string | null>(null);
//   const [newDate, setNewDate] = useState<string>("");
//   const [newStart, setNewStart] = useState<string>("");
//   const [newEnd, setNewEnd] = useState<string>("");
//   const itemsPerPage = 5;

//   // Placeholder token (replace with actual token retrieval logic)
//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbnVkb2NAZ21haWwuY29tIiwiaXAiOiIxMjcuMC4wLjEiLCJpYXQiOjE3NDQ1NjgyODYsImV4cCI6MTc0NDU3MTg4Nn0.QazpQDkY3QIa_3w8qC1RRV6lvhio4DeXNxdymBIasZU";

//   // Fallback data based on provided API response
//   const fallbackAppointments: AppointmentFormatted[] = [
//     {
//       id: "14",
//       patient: "Dr. Unknown",
//       date: new Date("2025-07-24T00:00:00.000Z").toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       time: "12:00 PM",
//       type: "In-person",
//       status: "pending"
//     }
//   ];

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch("https://landing.docapp.co.in/api/appointment/list-appointments", {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`API error: ${response.status} ${response.statusText}`);
//         }

//         const data: { appointments: Appointment[] } = await response.json();

//         const formattedAppointments: AppointmentFormatted[] = data.appointments.map((appointment) => {
//           const date = new Date(appointment.appointment_date);
//           const time = new Date(`1970-01-01T${appointment.appointment_start_time}Z`).toLocaleTimeString('en-US', {
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//           });
//           return {
//             id: appointment.id.toString(),
//             patient: "Dr. Unknown", // Placeholder since API lacks patient name
//             date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//             time,
//             type: appointment.appointment_type === "offline" ? "In-person" : "Video",
//             status: appointment.appointment_status,
//           };
//         });

//         setAppointments(formattedAppointments);
//         setFilteredAppointments(formattedAppointments);
//         setLoading(false);
//       } catch (error: any) {
//         console.error("Error fetching appointments:", error.message);
//         setError(`Failed to load appointments: ${error.message}. Using fallback data.`);
//         setAppointments(fallbackAppointments);
//         setFilteredAppointments(fallbackAppointments);
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, []);

//   // Handle filtering and sorting
//   useEffect(() => {
//     let result = [...appointments];

//     if (filterType !== "all") {
//       result = result.filter((appt) => appt.type === filterType);
//     }

//     if (filterStatus !== "all") {
//       result = result.filter((appt) => appt.status === filterStatus);
//     }

//     if (sortBy === "date") {
//       result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//     } else if (sortBy === "status") {
//       result.sort((a, b) => a.status.localeCompare(b.status));
//     }

//     setFilteredAppointments(result);
//   }, [filterType, filterStatus, sortBy, appointments]);

//   // Handle update appointment
//   const handleUpdateAppointment = async (appointmentId: string) => {
//     if (!newDate || !newStart || !newEnd) {
//       setError("Please fill all fields for rescheduling.");
//       return;
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/appointment/update-appointment", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           appointment_id: appointmentId,
//           newDate,
//           newStart,
//           newEnd,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Update API error: ${response.status} ${response.statusText}`);
//       }

//       const updatedAppointment = await response.json();
//       setAppointments((prev) =>
//         prev.map((appt) =>
//           appt.id === appointmentId
//             ? {
//                 ...appt,
//                 date: new Date(updatedAppointment.appointment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//                 time: new Date(`1970-01-01T${updatedAppointment.appointment_start_time}Z`).toLocaleTimeString('en-US', {
//                   hour: 'numeric',
//                   minute: '2-digit',
//                   hour12: true,
//                 }),
//               }
//             : appt
//         )
//       );
//       setFilteredAppointments((prev) =>
//         prev.map((appt) =>
//           appt.id === appointmentId
//             ? {
//                 ...appt,
//                 date: new Date(updatedAppointment.appointment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//                 time: new Date(`1970-01-01T${updatedAppointment.appointment_start_time}Z`).toLocaleTimeString('en-US', {
//                   hour: 'numeric',
//                   minute: '2-digit',
//                   hour12: true,
//                 }),
//               }
//             : appt
//         )
//       );
//       setRescheduleId(null);
//       setNewDate("");
//       setNewStart("");
//       setNewEnd("");
//       setError(null);
//     } catch (error: any) {
//       console.error("Error updating appointment:", error.message);
//       setError(`Failed to update appointment: ${error.message}`);
//     }
//   };

//   // Handle delete appointment
//   const handleDeleteAppointment = async (appointmentId: string) => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/appointment/delete-appointment", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           appointment_id: appointmentId,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Delete API error: ${response.status} ${response.statusText}`);
//       }

//       setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
//       setFilteredAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
//       setError(null);
//     } catch (error: any) {
//       console.error("Error deleting appointment:", error.message);
//       setError(`Failed to delete appointment: ${error.message}`);
//     }
//   };

//   // Pagination
//   const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
//   const paginatedAppointments = filteredAppointments.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (



//       <div className="container mx-auto px-4 py-8 border-solid border-[#007E85]/20">
//         <div className="max-w-7xl mx-auto">
//           {/* Page Title */}
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-[#007E85] flex items-center">
//               <Calendar className="h-8 w-8 mr-2" />
//               View Appointments
//             </h1>
//             <p className="text-[#007E85] mt-1">Manage your upcoming and past appointments</p>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
//               {error}
//             </div>
//           )}

//           {/* Filters and Sorting */}
//           <div className="mb-6 flex flex-col sm:flex-row gap-4">
//             <div className="flex-1">
//               <label className="text-sm font-medium text-[#007E85] mb-1 block">Filter by Type</label>
//               <Select value={filterType} onValueChange={setFilterType}>
//                 <SelectTrigger className="border-[#007E85]/20">
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Types</SelectItem>
//                   <SelectItem value="In-person">In-person</SelectItem>
//                   <SelectItem value="Video">Video</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex-1">
//               <label className="text-sm font-medium text-[#007E85] mb-1 block">Filter by Status</label>
//               <Select value={filterStatus} onValueChange={setFilterStatus}>
//                 <SelectTrigger className="border-[#007E85]/20">
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Statuses</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="confirmed">Confirmed</SelectItem>
//                   <SelectItem value="cancelled">Cancelled</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex-1">
//               <label className="text-sm font-medium text-[#007E85] mb-1 block">Sort By</label>
//               <Select value={sortBy} onValueChange={(value) => setSortBy(value as "date" | "status")}>
//                 <SelectTrigger className="border-[#007E85]/20">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="date">Date</SelectItem>
//                   <SelectItem value="status">Status</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Appointments Card */}
//           <Card className="border-[#007E85]/20">
//             <CardHeader>
//               <CardTitle className="text-[#007E85] flex items-center">
//                 <Calendar className="h-5 w-5 mr-2" />
//                 Your Appointments
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {loading ? (
//                 <div className="text-center text-[#007E85] py-8">Loading...</div>
//               ) : paginatedAppointments.length === 0 ? (
//                 <p className="text-gray-600 text-center">No appointments found.</p>
//               ) : (
//                 <>
//                   {paginatedAppointments.map((app) => (
//                     <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                       <div>
//                         <h3 className="font-semibold text-[#007E85]">{app.patient}</h3>
//                         <div className="flex items-center text-sm text-gray-600 mt-1">
//                           <Clock className="h-3 w-3 mr-1" />
//                           {app.date} at {app.time}
//                         </div>
//                         <Badge className={app.status === "pending" ? "bg-yellow-100 text-yellow-800 mt-1" : "bg-green-100 text-green-800 mt-1"}>
//                           {app.status}
//                         </Badge>
//                       </div>
//                       <div className="flex space-x-2">
//                         <Badge className={app.type === "Video" ? "bg-[#007E85] hover:bg-[#006A6F]" : "bg-[#007E85]/80 hover:bg-[#006A6F]/80"}>
//                           {app.type === "Video" ? <Video className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
//                           {app.type}
//                         </Badge>
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             {/* <Button
//                               variant="outline"
//                               size="sm"
//                               className="text-[#007E85] border-[#007E85]/20 hover:bg-[#007E85]/10"
//                               onClick={() => setRescheduleId(app.id)}
//                             >
//                               <CalendarPlus className="h-4 w-4 mr-1" />
//                               Reschedule
//                             </Button> */}
//                           </DialogTrigger>
//                           <DialogContent>
//                             <DialogHeader>
//                               <DialogTitle>Reschedule Appointment</DialogTitle>
//                             </DialogHeader>
//                             <div className="space-y-4">
//                               <div>
//                                 <label className="text-sm font-medium text-[#007E85]">New Date</label>
//                                 <Input
//                                   type="date"
//                                   value={newDate}
//                                   onChange={(e) => setNewDate(e.target.value)}
//                                   className="border-[#007E85]/20"
//                                 />
//                               </div>
//                               <div>
//                                 <label className="text-sm font-medium text-[#007E85]">New Start Time</label>
//                                 <Input
//                                   type="time"
//                                   value={newStart}
//                                   onChange={(e) => setNewStart(e.target.value)}
//                                   className="border-[#007E85]/20"
//                                 />
//                               </div>
//                               <div>
//                                 <label className="text-sm font-medium text-[#007E85]">New End Time</label>
//                                 <Input
//                                   type="time"
//                                   value={newEnd}
//                                   onChange={(e) => setNewEnd(e.target.value)}
//                                   className="border-[#007E85]/20"
//                                 />
//                               </div>
//                               {/* <Button
//                                 className="bg-[#007E85] hover:bg-[#006A6F]"
//                                 onClick={() => rescheduleId && handleUpdateAppointment(rescheduleId)}
//                               >
//                                 Save Changes
//                               </Button> */}
//                             </div>
//                           </DialogContent>
//                         </Dialog>
//                         {/* <Button
//                           variant="outline"
//                           size="sm"
//                           className="text-red-600 border-red-200 hover:bg-red-100"
//                           onClick={() => handleDeleteAppointment(app.id)}
//                         >
//                           <XCircle className="h-4 w-4 mr-1" />
//                           Cancel
//                         </Button> */}
//                       </div>
//                     </div>
//                   ))}
//                   {/* Pagination */}
//                   <div className="flex justify-between items-center mt-4">
//                     <div className="text-sm text-gray-600">
//                       Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                       {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} of{" "}
//                       {filteredAppointments.length} appointments
//                     </div>
//                     <div className="flex space-x-2">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         disabled={currentPage === 1}
//                         onClick={() => setCurrentPage((prev) => prev - 1)}
//                         className="border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10"
//                       >
//                         Previous
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         disabled={currentPage === totalPages}
//                         onClick={() => setCurrentPage((prev) => prev + 1)}
//                         className="border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10"
//                       >
//                         Next
//                       </Button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </CardContent>
//           </Card>

//           {/* Link to Book Appointment Page */}
          
//         </div>
      
//     </div>
//   );
// };

// export default ViewAppointments;

// import React, { useState, useEffect, useRef } from 'react';

// interface Appointment {
//   id: number;
//   user_id: number;
//   doctor_id: number;
//   appointment_date: string;
//   appointment_start_time: string;
//   appointment_end_time: string;
//   appointment_status: string;
//   appointment_type: string;
//   checkup_time: string | null;
//   prescription: string | null;
//   created_at: string;
//   createdAt: string;
//   updatedAt: string;
//   checkupAppointment: any[];
//   followUp: any[];
// }

// const ViewAppointments: React.FC = () => {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [callStatus, setCallStatus] = useState<string>('idle');
//   const [currentCallId, setCurrentCallId] = useState<string | null>(null);
//   const [pollAttempts, setPollAttempts] = useState<number>(0);
//   const [endpointIndex, setEndpointIndex] = useState<number>(0);
//   const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

//   const BASE_URL = 'https://landing.docapp.co.in';
//   const MAX_POLL_ATTEMPTS = 10;
//   const ENDPOINTS = [
//     '/api/call/receive-call',
//     '/api/call/recieve-call',
//     '/api/call/get-call',
//   ];

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/appointment/list-appointments`, {
//           method: 'GET',
//           credentials: 'include',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error('Unauthorized: Please log in to access appointments');
//           }
//           throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log('Appointments response:', data);
//         if (data && Array.isArray(data.appointments)) {
//           setAppointments(data.appointments);
//         } else {
//           throw new Error('Invalid response format: Expected an "appointments" array');
//         }
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message || 'Failed to fetch appointments');
//         setAppointments([]);
//         setLoading(false);
//         console.error('Fetch appointments error:', err);
//       }
//     };
//     fetchAppointments();

//     return () => {
//       if (peerConnectionRef.current) {
//         peerConnectionRef.current.close();
//         peerConnectionRef.current = null;
//       }
//       if (localVideoRef.current?.srcObject) {
//         (localVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
//       }
//       if (remoteVideoRef.current?.srcObject) {
//         (remoteVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
//       }
//       if (pollingIntervalRef.current) {
//         clearInterval(pollingIntervalRef.current);
//       }
//     };
//   }, []);

//   const requestMediaPermissions = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }
//       return stream;
//     } catch (err) {
//       setError('Failed to get media permissions. Please allow camera and microphone access.');
//       console.error('Media permission error:', err);
//       return null;
//     }
//   };

//   const pollForAnswer = async (callId: string) => {
//     try {
//       const endpoint = `${BASE_URL}${ENDPOINTS[endpointIndex]}`;
//       const response = await fetch(endpoint, {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('Unauthorized: Please log in');
//         }
//         if (response.status === 404 && endpointIndex < ENDPOINTS.length - 1) {
//           console.log(`Endpoint ${ENDPOINTS[endpointIndex]} failed, trying ${ENDPOINTS[endpointIndex + 1]}`);
//           setEndpointIndex((prev) => prev + 1);
//           throw new Error('Trying alternate endpoint');
//         }
//         throw new Error(`Failed to poll for answer: HTTP ${response.status} - ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('Poll for answer response:', data);
//       if (data.answer && peerConnectionRef.current) {
//         await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.answer));
//         setCallStatus('connected');
//         setPollAttempts(0);
//         if (pollingIntervalRef.current) {
//           clearInterval(pollingIntervalRef.current);
//         }
//       }
//     } catch (err: any) {
//       console.error('Poll for answer error:', err);
//       setPollAttempts((prev) => prev + 1);
//       if (pollAttempts + 1 >= MAX_POLL_ATTEMPTS) {
//         setError('Failed to connect call: No answer received from server. Please contact support or try again.');
//         setCallStatus('failed');
//         if (pollingIntervalRef.current) {
//           clearInterval(pollingIntervalRef.current);
//         }
//       }
//     }
//   };

//   const initiateCall = async (userId: number) => {
//     setCallStatus('connecting');
//     setPollAttempts(0);
//     setEndpointIndex(0);
//     try {
//       peerConnectionRef.current = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//       });

//       const stream = await requestMediaPermissions();
//       if (!stream || !peerConnectionRef.current) {
//         setCallStatus('failed');
//         setError('Failed to initialize media or peer connection');
//         return;
//       }

//       stream.getTracks().forEach((track) => {
//         peerConnectionRef.current?.addTrack(track, stream);
//       });

//       peerConnectionRef.current.ontrack = (event) => {
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = event.streams[0];
//         }
//       };

//       peerConnectionRef.current.onicecandidate = async (event) => {
//         if (event.candidate && currentCallId) {
//           try {
//             const response = await fetch(`${BASE_URL}/api/call/add-offer-candidates`, {
//               method: 'POST',
//               credentials: 'include',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 call_id: currentCallId,
//                 offer_candidate: event.candidate.toJSON(),
//               }),
//             });
//             console.log('Add offer candidate response:', await response.json());
//           } catch (err) {
//             console.error('Failed to send offer candidate:', err);
//           }
//         }
//       };

//       const offer = await peerConnectionRef.current.createOffer();
//       await peerConnectionRef.current.setLocalDescription(offer);

//       const response = await fetch(`${BASE_URL}/api/call/initialise-call`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           call_to_user: userId,
//           offer: {
//             sdp: offer.sdp,
//             type: offer.type,
//           },
//         }),
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error('Unauthorized: Please log in to initiate call');
//         }
//         throw new Error(`Failed to initiate call: HTTP ${response.status} - ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log('Initiate call response:', data);
//       if (data.call_id) {
//         setCurrentCallId(data.call_id);
//         pollingIntervalRef.current = setInterval(() => pollForAnswer(data.call_id), 2000);
//       } else {
//         throw new Error('No call_id received from server');
//       }
//     } catch (err: any) {
//       setError(err.message || 'Failed to initiate call');
//       setCallStatus('failed');
//       console.error('Initiate call error:', err);
//     }
//   };

//   const endCall = () => {
//     if (peerConnectionRef.current) {
//       peerConnectionRef.current.close();
//       peerConnectionRef.current = null;
//     }
//     if (localVideoRef.current?.srcObject) {
//       (localVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
//     }
//     if (remoteVideoRef.current?.srcObject) {
//       (remoteVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
//     }
//     if (pollingIntervalRef.current) {
//       clearInterval(pollingIntervalRef.current);
//     }
//     setCallStatus('idle');
//     setCurrentCallId(null);
//     setPollAttempts(0);
//     setError(null);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Appointments</h1>
//       {loading && <div className="text-center mt-8">Loading...</div>}
//       {error && <div className="text-center mt-8 text-red-500">{error}</div>}
//       {!loading && !error && appointments.length === 0 && (
//         <div className="text-center mt-8">No appointments found</div>
//       )}
//       {!loading && appointments.length > 0 && (
//         <div className="grid gap-4">
//           {appointments.map((appointment) => (
//             <div key={appointment.id} className="border rounded-lg p-4 flex justify-between items-center">
//               <div>
//                 <p className="font-semibold">
//                   {new Date(appointment.appointment_date).toLocaleDateString()} at{' '}
//                   {appointment.appointment_start_time}
//                 </p>
//                 <p>Type: {appointment.appointment_type}</p>
//                 <p>Status: {appointment.appointment_status}</p>
//               </div>
//               <button
//                 onClick={() => initiateCall(appointment.user_id)}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
//                 disabled={callStatus !== 'idle'}
//               >
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                   />
//                 </svg>
//                 Call
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       {callStatus !== 'idle' && (
//         <div className="mt-4">
//           <p className="mb-2">Call Status: {callStatus}</p>
//           <div className="flex gap-4">
//             <video ref={localVideoRef} autoPlay playsInline className="w-1/2 rounded-lg border" />
//             <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 rounded-lg border" />
//           </div>
//           <button
//             onClick={endCall}
//             className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             End Call
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewAppointments;


import React, { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase"; // your firebase init file
import axios from "axios";

const BASE_URL = "https://landing.docapp.co.in"; // prod API base
const userId = 30; // TODO: replace with logged-in user ID
const platform = "web"; // "android" | "ios" | "web"

export default function ViewAppointments() {
  const [fcmToken, setFcmToken] = useState("");
  const [callId, setCallId] = useState("");

  // ✅ Register FCM token & send to backend
  const registerFcmToken = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: "BAw0FRbdlAJHz0bR2siHdlRhs-YLFfNDEKOYaiUZKYPP9LcR7mdu5zINa1_l8JT2pNOgBhlxmZvu3TqNCLfb3Po" // from Firebase → Project Settings → Cloud Messaging
      });

      if (!token) {
        console.warn("⚠ No FCM token retrieved. Must be HTTPS or localhost.");
        return;
      }

      setFcmToken(token);
      console.log("✅ Got FCM token:", token);

      await axios.post(`${BASE_URL}/api/notifications/save-token`, {
        token,
        userId,
        platform
      });

      console.log("✅ Token saved to backend");
    } catch (err) {
      console.error("❌ Error getting/saving FCM token:", err);
    }
  };

  // ✅ Initialise call
  const initiateCall = async () => {
    try {
      const payload = {
        call_to_user: "29", // Replace with actual callee ID
        offer: {
          sdp: "offer_sdp",
          type: "offer"
        }
      };

      console.log("📤 Initiating call with payload:", payload);

      const { data } = await axios.post(
        `${BASE_URL}/api/call/initialise-call`,
        payload
      );

      console.log("✅ Call initiated:", data);
      setCallId(data.call_id);
    } catch (err) {
      console.error("❌ Failed to initiate call:", err.response?.data || err);
    }
  };

  // ✅ Add offer candidate
  const addOfferCandidate = async () => {
    if (!callId) return alert("No callId yet");
    try {
      await axios.post(`${BASE_URL}/api/call/add-offer-candidates`, {
        call_id: callId,
        offer_candidate: {
          candidate: "this is offer candidate 1",
          sdpMid: "0",
          sdpMLineIndex: "video"
        }
      });
      console.log("✅ Offer candidate sent");
    } catch (err) {
      console.error("❌ Failed to send offer candidate:", err);
    }
  };

  // ✅ Add answer candidate
  const addAnswerCandidate = async () => {
    if (!callId) return alert("No callId yet");
    try {
      await axios.post(`${BASE_URL}/api/call/add-answer-candidates`, {
        call_id: callId,
        answer_candidate: {
          candidate: "candidate 1",
          sdpMid: "1",
          sdpMLineIndex: "audio"
        }
      });
      console.log("✅ Answer candidate sent");
    } catch (err) {
      console.error("❌ Failed to send answer candidate:", err);
    }
  };

  // ✅ Receive call
  const receiveCall = async () => {
    if (!callId) return alert("No callId yet");
    try {
      await axios.put(`${BASE_URL}/api/call/recieve-call`, {
        call_id: callId,
        answer: {
          sdp: "this is answer sdp",
          type: "answer"
        }
      });
      console.log("✅ Call accepted");
    } catch (err) {
      console.error("❌ Failed to accept call:", err);
    }
  };

  // ✅ Listen for FCM push notifications
  useEffect(() => {
    registerFcmToken();

    onMessage(messaging, (payload) => {
      console.log("📩 Push notification received:", payload);
      // Optional: auto-accept call here if desired
    });
  }, []);

  return (
    <div>
      <h1>📞 View Appointments & Call</h1>

      <button onClick={initiateCall}>Initiate Call</button>
      <button onClick={addOfferCandidate}>Add Offer Candidate</button>
      <button onClick={addAnswerCandidate}>Add Answer Candidate</button>
      <button onClick={receiveCall}>Accept Call</button>

      <p>FCM Token: {fcmToken || "Not yet registered"}</p>
      <p>Call ID: {callId || "No call yet"}</p>
    </div>
  );
}
