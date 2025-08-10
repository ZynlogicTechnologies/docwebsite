
// // import { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import Header from "@/components/Header";
// // import Footer from "@/components/Footer";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// // import { Input } from "@/components/ui/input";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// // import { Calendar, Clock, MapPin, Video, XCircle, CalendarPlus } from "lucide-react";

// // // Define TypeScript interfaces for API response
// // interface Appointment {
// //   id: number;
// //   user_id: number;
// //   doctor_id: number;
// //   appointment_date: string;
// //   appointment_start_time: string;
// //   appointment_end_time: string;
// //   appointment_status: string;
// //   appointment_type: string;
// //   checkup_time: string | null;
// //   prescription: string | null;
// //   created_at: string;
// //   createdAt: string;
// //   updatedAt: string;
// //   checkupAppointment: any[];
// //   followUp: any[];
// // }

// // interface AppointmentFormatted {
// //   id: string;
// //   doctor: string;
// //   speciality: string;
// //   date: string;
// //   time: string;
// //   type: string;
// //   status: string;
// // }

// // const ViewAppointments: React.FC = () => {
// //   const [appointments, setAppointments] = useState<AppointmentFormatted[]>([]);
// //   const [filteredAppointments, setFilteredAppointments] = useState<AppointmentFormatted[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [filterType, setFilterType] = useState<string>("all");
// //   const [filterStatus, setFilterStatus] = useState<string>("all");
// //   const [sortBy, setSortBy] = useState<"date" | "status">("date");
// //   const [currentPage, setCurrentPage] = useState<number>(1);
// //   const [rescheduleId, setRescheduleId] = useState<string | null>(null);
// //   const [newDate, setNewDate] = useState<string>("");
// //   const [newStart, setNewStart] = useState<string>("");
// //   const [newEnd, setNewEnd] = useState<string>("");
// //   const itemsPerPage = 5;

// //   // Placeholder token (replace with actual token retrieval logic)
// //   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbnVkb2NAZ21haWwuY29tIiwiaXAiOiIxMjcuMC4wLjEiLCJpYXQiOjE3NDQ1NjgyODYsImV4cCI6MTc0NDU3MTg4Nn0.QazpQDkY3QIa_3w8qC1RRV6lvhio4DeXNxdymBIasZU";

// //   // Fallback data based on provided API response
// //   const fallbackAppointments: AppointmentFormatted[] = [
// //     {
// //       id: "18",
// //       doctor: "Dr. Unknown",
// //       speciality: "Unknown Specialty",
// //       date: new Date("2025-07-25T00:00:00.000Z").toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
// //       time: "1:30 PM",
// //       type: "In-person",
// //       status: "pending"
// //     },
// //     {
// //       id: "16",
// //       doctor: "Dr. Unknown",
// //       speciality: "Unknown Specialty",
// //       date: new Date("2025-07-24T00:00:00.000Z").toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
// //       time: "12:00 PM",
// //       type: "In-person",
// //       status: "pending"
// //     },
// //     {
// //       id: "17",
// //       doctor: "Dr. Unknown",
// //       speciality: "Unknown Specialty",
// //       date: new Date("2025-07-24T00:00:00.000Z").toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
// //       time: "2:00 PM",
// //       type: "In-person",
// //       status: "pending"
// //     },
// //     {
// //       id: "15",
// //       doctor: "Dr. Unknown",
// //       speciality: "Unknown Specialty",
// //       date: new Date("2025-07-22T00:00:00.000Z").toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
// //       time: "2:30 PM",
// //       type: "In-person",
// //       status: "pending"
// //     }
// //   ];

// //   useEffect(() => {
// //     const fetchAppointments = async () => {
// //       try {
// //         const response = await fetch("https://landing.docapp.co.in/api/appointment/list-appointments", {
// //           method: "GET",
// //           credentials: "include",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         });

// //         if (!response.ok) {
// //           throw new Error(`API error: ${response.status} ${response.statusText}`);
// //         }

// //         const data: { appointments: Appointment[] } = await response.json();

// //         const formattedAppointments: AppointmentFormatted[] = data.appointments.map((appointment) => {
// //           const date = new Date(appointment.appointment_date);
// //           const time = new Date(`1970-01-01T${appointment.appointment_start_time}Z`).toLocaleTimeString('en-US', {
// //             hour: 'numeric',
// //             minute: '2-digit',
// //             hour12: true,
// //           });
// //           return {
// //             id: appointment.id.toString(),
// //             doctor: "Dr. Unknown",
// //             speciality: "Unknown Specialty",
// //             date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
// //             time,
// //             type: appointment.appointment_type === "offline" ? "In-person" : "Video Consultation",
// //             status: appointment.appointment_status,
// //           };
// //         });

// //         setAppointments(formattedAppointments);
// //         setFilteredAppointments(formattedAppointments);
// //         setLoading(false);
// //       } catch (error: any) {
// //         console.error("Error fetching appointments:", error.message);
// //         setError(`Failed to load appointments: ${error.message}. Using fallback data.`);
// //         setAppointments(fallbackAppointments);
// //         setFilteredAppointments(fallbackAppointments);
// //         setLoading(false);
// //       }
// //     };

// //     fetchAppointments();
// //   }, []);

// //   // Handle filtering and sorting
// //   useEffect(() => {
// //     let result = [...appointments];

// //     if (filterType !== "all") {
// //       result = result.filter((appt) => appt.type === filterType);
// //     }

// //     if (filterStatus !== "all") {
// //       result = result.filter((appt) => appt.status === filterStatus);
// //     }

// //     if (sortBy === "date") {
// //       result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
// //     } else if (sortBy === "status") {
// //       result.sort((a, b) => a.status.localeCompare(b.status));
// //     }

// //     setFilteredAppointments(result);
// //   }, [filterType, filterStatus, sortBy, appointments]);

// //   // Handle update appointment
// //   const handleUpdateAppointment = async (appointmentId: string) => {
// //     if (!newDate || !newStart || !newEnd) {
// //       setError("Please fill all fields for rescheduling.");
// //       return;
// //     }

// //     try {
// //       const response = await fetch("https://landing.docapp.co.in/api/appointment/update-appointment", {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //           "Authorization": `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           appointment_id: appointmentId,
// //           newDate,
// //           newStart,
// //           newEnd,
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Update API error: ${response.status} ${response.statusText}`);
// //       }

// //       const updatedAppointment = await response.json();
// //       setAppointments((prev) =>
// //         prev.map((appt) =>
// //           appt.id === appointmentId
// //             ? {
// //                 ...appt,
// //                 date: new Date(updatedAppointment.appointment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
// //                 time: new Date(`1970-01-01T${updatedAppointment.appointment_start_time}Z`).toLocaleTimeString('en-US', {
// //                   hour: 'numeric',
// //                   minute: '2-digit',
// //                   hour12: true,
// //                 }),
// //               }
// //             : appt
// //         )
// //       );
// //       setFilteredAppointments((prev) =>
// //         prev.map((appt) =>
// //           appt.id === appointmentId
// //             ? {
// //                 ...appt,
// //                 date: new Date(updatedAppointment.appointment_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
// //                 time: new Date(`1970-01-01T${updatedAppointment.appointment_start_time}Z`).toLocaleTimeString('en-US', {
// //                   hour: 'numeric',
// //                   minute: '2-digit',
// //                   hour12: true,
// //                 }),
// //               }
// //             : appt
// //         )
// //       );
// //       setRescheduleId(null);
// //       setNewDate("");
// //       setNewStart("");
// //       setNewEnd("");
// //       setError(null);
// //     } catch (error: any) {
// //       console.error("Error updating appointment:", error.message);
// //       setError(`Failed to update appointment: ${error.message}`);
// //     }
// //   };

// //   // Handle delete appointment
// //   const handleDeleteAppointment = async (appointmentId: string) => {
// //     try {
// //       const response = await fetch("https://landing.docapp.co.in/api/appointment/delete-appointment", {
// //         method: "DELETE",
// //         headers: {
// //           "Content-Type": "application/json",
// //           "Authorization": `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           appointment_id: appointmentId,
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Delete API error: ${response.status} ${response.statusText}`);
// //       }

// //       setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
// //       setFilteredAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
// //       setError(null);
// //     } catch (error: any) {
// //       console.error("Error deleting appointment:", error.message);
// //       setError(`Failed to delete appointment: ${error.message}`);
// //     }
// //   };

// //   // Pagination
// //   const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
// //   const paginatedAppointments = filteredAppointments.slice(
// //     (currentPage - 1) * itemsPerPage,
// //     currentPage * itemsPerPage
// //   );

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Header />

// //       <div className="container mx-auto px-4 py-8">
// //         <div className="max-w-7xl mx-auto">
// //           {/* Page Title */}
// //           <div className="mb-8">
// //             <h1 className="text-3xl font-bold text-[#007E85] flex items-center">
// //               <Calendar className="h-8 w-8 mr-2" />
// //               View Appointments
// //             </h1>
// //             <p className="text-[#007E85] mt-1">Manage your upcoming and past appointments</p>
// //           </div>

// //           {/* Error Message */}
// //           {error && (
// //             <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
// //               {error}
// //             </div>
// //           )}

// //           {/* Filters and Sorting */}
// //           <div className="mb-6 flex flex-col sm:flex-row gap-4">
// //             <div className="flex-1">
// //               <label className="text-sm font-medium text-[#007E85] mb-1 block">Filter by Type</label>
// //               <Select value={filterType} onValueChange={setFilterType}>
// //                 <SelectTrigger className="border-[#007E85]/20">
// //                   <SelectValue placeholder="Select type" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="all">All Types</SelectItem>
// //                   <SelectItem value="In-person">In-person</SelectItem>
// //                   <SelectItem value="Video Consultation">Video Consultation</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //             <div className="flex-1">
// //               <label className="text-sm font-medium text-[#007E85] mb-1 block">Filter by Status</label>
// //               <Select value={filterStatus} onValueChange={setFilterStatus}>
// //                 <SelectTrigger className="border-[#007E85]/20">
// //                   <SelectValue placeholder="Select status" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="all">All Statuses</SelectItem>
// //                   <SelectItem value="pending">Pending</SelectItem>
// //                   <SelectItem value="confirmed">Confirmed</SelectItem>
// //                   <SelectItem value="cancelled">Cancelled</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //             <div className="flex-1">
// //               <label className="text-sm font-medium text-[#007E85] mb-1 block">Sort By</label>
// //               <Select value={sortBy} onValueChange={(value) => setSortBy(value as "date" | "status")}>
// //                 <SelectTrigger className="border-[#007E85]/20">
// //                   <SelectValue placeholder="Sort by" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="date">Date</SelectItem>
// //                   <SelectItem value="status">Status</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           </div>

// //           {/* Appointments Table */}
// //           <Card className="border-[#007E85]/20">
// //             <CardHeader>
// //               <CardTitle className="text-[#007E85] flex items-center">
// //                 <Calendar className="h-5 w-5 mr-2" />
// //                 Your Appointments
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               {loading ? (
// //                 <div className="text-center text-[#007E85] py-8">Loading...</div>
// //               ) : filteredAppointments.length === 0 ? (
// //                 <p className="text-gray-600 text-center">No appointments found.</p>
// //               ) : (
// //                 <>
// //                   <Table>
// //                     <TableHeader>
// //                       <TableRow>
// //                         {/* <TableHead className="text-[#007E85]">Doctor</TableHead>
// //                         <TableHead className="text-[#007E85]">Speciality</TableHead> */}
// //                         <TableHead className="text-[#007E85]">Date</TableHead>
// //                         <TableHead className="text-[#007E85]">Time</TableHead>
// //                         <TableHead className="text-[#007E85]">Type</TableHead>
// //                         <TableHead className="text-[#007E85]">Status</TableHead>
// //                         <TableHead className="text-[#007E85]">Actions</TableHead>
// //                       </TableRow>
// //                     </TableHeader>
// //                     <TableBody>
// //                       {paginatedAppointments.map((appointment) => (
// //                         <TableRow key={appointment.id}>
// //                           {/* <TableCell className="font-medium text-[#007E85]">{appointment.doctor}</TableCell>
// //                           <TableCell>{appointment.speciality}</TableCell> */}
// //                           <TableCell>
// //                             <div className="flex items-center">
// //                               <Calendar className="h-4 w-4 mr-1 text-[#007E85]" />
// //                               {appointment.date}
// //                             </div>
// //                           </TableCell>
// //                           <TableCell>
// //                             <div className="flex items-center">
// //                               <Clock className="h-4 w-4 mr-1 text-[#007E85]" />
// //                               {appointment.time}
// //                             </div>
// //                           </TableCell>
// //                           <TableCell>
// //                             <Badge className={appointment.type === "Video Consultation" ? "bg-[#007E85] hover:bg-[#006A6F]" : "bg-[#007E85]/80 hover:bg-[#006A6F]/80"}>
// //                               {appointment.type === "Video Consultation" ? <Video className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
// //                               {appointment.type}
// //                             </Badge>
// //                           </TableCell>
// //                           <TableCell>
// //                             <Badge className={appointment.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
// //                               {appointment.status}
// //                             </Badge>
// //                           </TableCell>
// //                           <TableCell>
// //                             <div className="flex space-x-2">
// //                               <Dialog>
// //                                 <DialogTrigger asChild>
// //                                   <Button
// //                                     variant="outline"
// //                                     size="sm"
// //                                     className="text-[#007E85] border-[#007E85]/20 hover:bg-[#007E85]/10"
// //                                     onClick={() => setRescheduleId(appointment.id)}
// //                                   >
// //                                     <CalendarPlus className="h-4 w-4 mr-1" />
// //                                     Reschedule
// //                                   </Button>
// //                                 </DialogTrigger>
// //                                 <DialogContent>
// //                                   <DialogHeader>
// //                                     <DialogTitle>Reschedule Appointment</DialogTitle>
// //                                   </DialogHeader>
// //                                   <div className="space-y-4">
// //                                     <div>
// //                                       <label className="text-sm font-medium text-[#007E85]">New Date</label>
// //                                       <Input
// //                                         type="date"
// //                                         value={newDate}
// //                                         onChange={(e) => setNewDate(e.target.value)}
// //                                         className="border-[#007E85]/20"
// //                                       />
// //                                     </div>
// //                                     <div>
// //                                       <label className="text-sm font-medium text-[#007E85]">New Start Time</label>
// //                                       <Input
// //                                         type="time"
// //                                         value={newStart}
// //                                         onChange={(e) => setNewStart(e.target.value)}
// //                                         className="border-[#007E85]/20"
// //                                       />
// //                                     </div>
// //                                     <div>
// //                                       <label className="text-sm font-medium text-[#007E85]">New End Time</label>
// //                                       <Input
// //                                         type="time"
// //                                         value={newEnd}
// //                                         onChange={(e) => setNewEnd(e.target.value)}
// //                                         className="border-[#007E85]/20"
// //                                       />
// //                                     </div>
// //                                     <Button
// //                                       className="bg-[#007E85] hover:bg-[#006A6F]"
// //                                       onClick={() => rescheduleId && handleUpdateAppointment(rescheduleId)}
// //                                     >
// //                                       Save Changes
// //                                     </Button>
// //                                   </div>
// //                                 </DialogContent>
// //                               </Dialog>
// //                               <Button
// //                                 variant="outline"
// //                                 size="sm"
// //                                 className="text-red-600 border-red-200 hover:bg-red-100"
// //                                 onClick={() => handleDeleteAppointment(appointment.id)}
// //                               >
// //                                 <XCircle className="h-4 w-4 mr-1" />
// //                                 Cancel
// //                               </Button>
// //                             </div>
// //                           </TableCell>
// //                         </TableRow>
// //                       ))}
// //                     </TableBody>
// //                   </Table>

// //                   {/* Pagination */}
// //                   <div className="flex justify-between items-center mt-4">
// //                     <div className="text-sm text-gray-600">
// //                       Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
// //                       {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} of{" "}
// //                       {filteredAppointments.length} appointments
// //                     </div>
// //                     <div className="flex space-x-2">
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         disabled={currentPage === 1}
// //                         onClick={() => setCurrentPage((prev) => prev - 1)}
// //                         className="border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10"
// //                       >
// //                         Previous
// //                       </Button>
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         disabled={currentPage === totalPages}
// //                         onClick={() => setCurrentPage((prev) => prev + 1)}
// //                         className="border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10"
// //                       >
// //                         Next
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </>
// //               )}
// //             </CardContent>
// //           </Card>

// //           {/* Link to Book Appointment Page */}
// //           <div className="mt-6">
// //             <Link to="/book-appointment">
// //               <Button className="w-full sm:w-auto bg-[#007E85] hover:bg-[#006A6F]">
// //                 <CalendarPlus className="h-4 w-4 mr-2" />
// //                 Book New Appointment
// //               </Button>
// //             </Link>
// //           </div>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default ViewAppointments;

// // import React, { useState, useEffect, useRef } from 'react';

// // interface CallData {
// //   call_id: string;
// //   offer: RTCSessionDescriptionInit;
// //   from_user: number;
// // }

// // const UserAppointments: React.FC = () => {
// //   const [incomingCall, setIncomingCall] = useState<CallData | null>(null);
// //   const [callStatus, setCallStatus] = useState<string>('waiting');
// //   const [error, setError] = useState<string | null>(null);
// //   const [pollAttempts, setPollAttempts] = useState<number>(0);
// //   const [endpointIndex, setEndpointIndex] = useState<number>(0);
// //   const localVideoRef = useRef<HTMLVideoElement>(null);
// //   const remoteVideoRef = useRef<HTMLVideoElement>(null);
// //   const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
// //   const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

// //   const BASE_URL = 'https://landing.docapp.co.in';
// //   const MAX_POLL_ATTEMPTS = 30;
// //   const ENDPOINTS = [
// //     '/api/call/receive-call',
// //     '/api/call/recieve-call',
// //     '/api/call/get-call',
// //   ];

// //   useEffect(() => {
// //     const pollForCalls = async () => {
// //       try {
// //         const endpoint = `${BASE_URL}${ENDPOINTS[endpointIndex]}`;
// //         const response = await fetch(endpoint, {
// //           method: 'GET',
// //           credentials: 'include',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //         });

// //         if (!response.ok) {
// //           if (response.status === 401) {
// //             throw new Error('Unauthorized: Please log in');
// //           }
// //           if (response.status === 404 && endpointIndex < ENDPOINTS.length - 1) {
// //             console.log(`Endpoint ${ENDPOINTS[endpointIndex]} failed, trying ${ENDPOINTS[endpointIndex + 1]}`);
// //             setEndpointIndex((prev) => prev + 1);
// //             throw new Error('Trying alternate endpoint');
// //           }
// //           throw new Error(`Failed to poll for calls: HTTP ${response.status} - ${response.statusText}`);
// //         }

// //         const data = await response.json();
// //         console.log('Poll for calls response:', data);
// //         if (data.call_id && data.offer && data.from_user) {
// //           setIncomingCall({
// //             call_id: data.call_id,
// //             offer: data.offer,
// //             from_user: data.from_user,
// //           });
// //           setPollAttempts(0);
// //         }
// //       } catch (err: any) {
// //         console.error('Poll for calls error:', err);
// //         setPollAttempts((prev) => prev + 1);
// //         if (pollAttempts + 1 >= MAX_POLL_ATTEMPTS) {
// //           setError('Failed to detect incoming calls: Server unavailable. Please contact support or try again later.');
// //           if (pollingIntervalRef.current) {
// //             clearInterval(pollingIntervalRef.current);
// //           }
// //         }
// //       }
// //     };

// //     pollingIntervalRef.current = setInterval(pollForCalls, 2000);

// //     return () => {
// //       if (pollingIntervalRef.current) {
// //         clearInterval(pollingIntervalRef.current);
// //       }
// //       if (peerConnectionRef.current) {
// //         peerConnectionRef.current.close();
// //         peerConnectionRef.current = null;
// //       }
// //       if (localVideoRef.current?.srcObject) {
// //         (localVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
// //       }
// //       if (remoteVideoRef.current?.srcObject) {
// //         (remoteVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
// //       }
// //     };
// //   }, [pollAttempts, endpointIndex]);

// //   const requestMediaPermissions = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         audio: true,
// //         video: true,
// //       });
// //       if (localVideoRef.current) {
// //         localVideoRef.current.srcObject = stream;
// //       }
// //       return stream;
// //     } catch (err) {
// //       setError('Failed to get media permissions. Please allow camera and microphone access.');
// //       console.error('Media permission error:', err);
// //       return null;
// //     }
// //   };

// //   const acceptCall = async () => {
// //     if (!incomingCall) return;

// //     setCallStatus('connecting');
// //     try {
// //       peerConnectionRef.current = new RTCPeerConnection({
// //         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
// //       });

// //       const stream = await requestMediaPermissions();
// //       if (!stream || !peerConnectionRef.current) {
// //         setCallStatus('failed');
// //         setError('Failed to initialize media or peer connection');
// //         return;
// //       }

// //       stream.getTracks().forEach((track) => {
// //         peerConnectionRef.current?.addTrack(track, stream);
// //       });

// //       peerConnectionRef.current.ontrack = (event) => {
// //         if (remoteVideoRef.current) {
// //           remoteVideoRef.current.srcObject = event.streams[0];
// //         }
// //       };

// //       peerConnectionRef.current.onicecandidate = async (event) => {
// //         if (event.candidate) {
// //           try {
// //             const response = await fetch(`${BASE_URL}/api/call/add-answer-candidates`, {
// //               method: 'POST',
// //               credentials: 'include',
// //               headers: {
// //                 'Content-Type': 'application/json',
// //               },
// //               body: JSON.stringify({
// //                 call_id: incomingCall.call_id,
// //                 answer_candidate: event.candidate.toJSON(),
// //               }),
// //             });
// //             console.log('Add answer candidate response:', await response.json());
// //           } catch (err) {
// //             console.error('Failed to send answer candidate:', err);
// //           }
// //         }
// //       };

// //       await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));
// //       const answer = await peerConnectionRef.current.createAnswer();
// //       await peerConnectionRef.current.setLocalDescription(answer);

// //       const endpoint = ENDPOINTS[endpointIndex];
// //       const response = await fetch(`${BASE_URL}${endpoint}`, {
// //         method: 'put',
// //         credentials: 'include',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           call_id: incomingCall.call_id,
// //           answer: {
// //             sdp: answer.sdp,
// //             type: answer.type,
// //           },
// //         }),
// //       });

// //       if (!response.ok) {
// //         if (response.status === 401) {
// //           throw new Error('Unauthorized: Please log in');
// //         }
// //         throw new Error(`Failed to send answer: HTTP ${response.status} - ${response.statusText}`);
// //       }

// //       console.log('Send answer response:', await response.json());
// //       setCallStatus('connected');
// //       if (pollingIntervalRef.current) {
// //         clearInterval(pollingIntervalRef.current);
// //       }
// //     } catch (err: any) {
// //       setError(err.message || 'Failed to accept call');
// //       setCallStatus('failed');
// //       console.error('Accept call error:', err);
// //     }
// //   };

// //   const endCall = () => {
// //     if (peerConnectionRef.current) {
// //       peerConnectionRef.current.close();
// //       peerConnectionRef.current = null;
// //     }
// //     if (localVideoRef.current?.srcObject) {
// //       (localVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
// //     }
// //     if (remoteVideoRef.current?.srcObject) {
// //       (remoteVideoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
// //     }
// //     if (pollingIntervalRef.current) {
// //       clearInterval(pollingIntervalRef.current);
// //     }
// //     setCallStatus('waiting');
// //     setIncomingCall(null);
// //     setPollAttempts(0);
// //     setError(null);
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">Receive Call</h1>
// //       {error && <div className="text-center mt-8 text-red-500">{error}</div>}
// //       {callStatus === 'waiting' && !incomingCall && (
// //         <div className="text-center mt-8">Waiting for incoming calls...</div>
// //       )}
// //       {incomingCall && callStatus === 'waiting' && (
// //         <div className="text-center mt-8">
// //           <p>Incoming call from user {incomingCall.from_user}</p>
// //           <button
// //             onClick={acceptCall}
// //             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
// //           >
// //             Accept Call
// //           </button>
// //         </div>
// //       )}
// //       {callStatus !== 'waiting' && (
// //         <div className="mt-4">
// //           <p className="mb-2">Call Status: {callStatus}</p>
// //           <div className="flex gap-4">
// //             <video ref={localVideoRef} autoPlay playsInline className="w-1/2 rounded-lg border" />
// //             <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 rounded-lg border" />
// //           </div>
// //           <button
// //             onClick={endCall}
// //             className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
// //           >
// //             End Call
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserAppointments;

// import React, { useEffect, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const CallerScreen = () => {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

//   const BASE_URL = 'https://landing.docapp.co.in';

//   useEffect(() => {
//     const setupConnection = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/call/get-call/${id}`);
//         const data = await res.json();

//         const peerConnection = new RTCPeerConnection({
//           iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//         });
//         peerConnectionRef.current = peerConnection;

//         // Get user media
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         if (localVideoRef.current) localVideoRef.current.srcObject = stream;
//         stream.getTracks().forEach((track) => {
//           peerConnection.addTrack(track, stream);
//         });

//         peerConnection.ontrack = (event) => {
//           if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//         };

//         peerConnection.onicecandidate = async (event) => {
//           if (event.candidate) {
//             await fetch(`${BASE_URL}/api/call/add-answer-candidates`, {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               credentials: 'include',
//               body: JSON.stringify({
//                 call_id: id,
//                 answer_candidate: event.candidate.toJSON(),
//               }),
//             });
//           }
//         };

//         await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);

//         // Send answer to caller
//         await fetch(`${BASE_URL}/api/call/recieve-call`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//           body: JSON.stringify({
//             call_id: id,
//             answer: {
//               sdp: answer.sdp,
//               type: answer.type,
//             },
//           }),
//         });
//       } catch (error) {
//         console.error('Error handling call:', error);
//       }
//     };

//     if (id) {
//       setupConnection();
//     }
//   }, [id]);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold text-center">Receiving Call</h2>
//       <div className="flex gap-4 mt-4">
//         <video ref={localVideoRef} autoPlay playsInline className="w-1/2 border rounded" />
//         <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 border rounded" />
//       </div>
//     </div>
//   );
// };

// export default CallerScreen;


// ReceiverPage.tsx// ReceiverPage.tsx

// import React, { useEffect } from 'react';
// import { getToken, onMessage } from 'firebase/messaging';
// import { messaging } from '../firebase'; // Adjust if path differs
// import axios from 'axios';

// const ReceiverPage = () => {
//   const userId = 456;
//   const platform = 'web';

//   const sendTokenToBackend = async (token: string) => {
//     try {
//       await axios.post('https://landing.docapp.co.in/api/notifications/save-token', {
//         token,
//         userId,
//         platform,
//       });
//       console.log('Receiver FCM token sent to backend');
//     } catch (error) {
//       console.error('Receiver: Error sending FCM token:', error);
//     }
//   };

//   useEffect(() => {
//     getToken(messaging, {
//       vapidKey: 'BKCe8F4JYmH_b7ymVOSpAOY1vRx9OYi5T3bBlTVEQlFVi1oOZbSPLVaZxUpjBqdn0tpM3yIasvY7c_h3MsNnPaE',
//     })
//       .then((currentToken) => {
//         if (currentToken) {
//           console.log('Receiver FCM Token:', currentToken);
//           sendTokenToBackend(currentToken);
//         } else {
//           console.warn('Receiver: No FCM token available');
//         }
//       })
//       .catch((err) => {
//         console.error('Receiver: Error retrieving token:', err);
//       });

//     onMessage(messaging, (payload) => {
//       console.log('Receiver: Message received in foreground:', payload);
//       alert(`Receiver Notification: ${payload?.notification?.title}`);
//     });
//   }, []);

//   return <div><h2>Receiver Page</h2></div>;
// };

// export default ReceiverPage;



import React, { useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase';
import axios from 'axios';

const ReceiverPage = () => {
  const userId = 456;
  const platform = 'web';

  const sendTokenToBackend = async (token: string) => {
    try {
      await axios.post('https://landing.docapp.co.in/api/notifications/save-token', {
        token,
        userId,
        platform,
      }, {
        withCredentials: true,
      });
      console.log('Receiver FCM token sent to backend');
    } catch (error) {
      console.error('Receiver: Error sending FCM token:', error);
    }
  };

  useEffect(() => {
    getToken(messaging, {
      vapidKey: 'BKCe8F4JYmH_b7ymVOSpAOY1vRx9OYi5T3bBlTVEQlFVi1oOZbSPLVaZxUpjBqdn0tpM3yIasvY7c_h3MsNnPaE',
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Receiver FCM Token:', currentToken);
          sendTokenToBackend(currentToken);
        } else {
          console.warn('Receiver: No FCM token available');
        }
      })
      .catch((err) => {
        console.error('Receiver: Error retrieving token:', err);
      });

    onMessage(messaging, (payload) => {
      console.log('Receiver: Message received in foreground:', payload);
      alert(`Receiver Notification: ${payload?.notification?.title}`);
    });
  }, []);

  return <div><h2>Receiver Page</h2></div>;
};

export default ReceiverPage;
