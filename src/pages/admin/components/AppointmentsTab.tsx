import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Download, Calendar, Video, User, PlusCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const appointments = [
  { id: "1", patient: "John Doe", doctor: "Dr. Sarah Johnson", date: "2025-07-10", time: "10:30 AM", type: "Video", status: "Completed" },
  { id: "2", patient: "Jane Smith", doctor: "Dr. Michael Chen", date: "2025-07-10", time: "11:00 AM", type: "In-person", status: "In Progress" },
  { id: "3", patient: "Anita Sharma", doctor: "Dr. Priya Sharma", date: "2025-07-11", time: "09:15 AM", type: "Video", status: "Scheduled" },
  { id: "4", patient: "Ravi Kumar", doctor: "Dr. David Patel", date: "2025-07-11", time: "02:00 PM", type: "In-person", status: "Scheduled" },
  { id: "5", patient: "Neha Gupta", doctor: "Dr. Emily Gupta", date: "2025-07-12", time: "03:30 PM", type: "Video", status: "Cancelled" },
];

const getStatusCount = (status: string) => appointments.filter(a => a.status === status).length;

const AppointmentsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    date: "",
    time: "",
    type: "Video",
    status: "Scheduled",
  });
  const [appointmentList, setAppointmentList] = useState(appointments);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: String(appointmentList.length + 1),
      patient: formData.patient,
      doctor: formData.doctor,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      status: formData.status,
    };
    setAppointmentList([...appointmentList, newAppointment]);
    setFormData({ patient: "", doctor: "", date: "", time: "", type: "Video", status: "Scheduled" });
    setIsModalOpen(false);
  };

  const handleEditAppointment = (id) => {
    const appointment = appointmentList.find((appt) => appt.id === id);
    if (appointment) {
      setFormData({
        patient: appointment.patient,
        doctor: appointment.doctor,
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        status: appointment.status,
      });
      setIsModalOpen(true);
      // For simplicity, editing pre-fills the form but saving creates a new appointment
      // In a real app, you'd update the existing appointment
    }
  };

  const handleDeleteAppointment = (id) => {
    setAppointmentList(appointmentList.filter((appt) => appt.id !== id));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center py-4 border-[#007E85]/20">
          <p className="text-xs sm:text-sm text-[#007E85]/70">Total</p>
          <p className="text-lg sm:text-xl font-bold text-[#007E85]">{appointmentList.length}</p>
          <p className="text-xs text-gray-400">Appointments</p>
        </Card>
        <Card className="text-center py-4 border-[#007E85]/20">
          <p className="text-xs sm:text-sm text-[#007E85]/70">Completed</p>
          <p className="text-lg sm:text-xl font-bold text-green-600">{getStatusCount("Completed")}</p>
          <p className="text-xs text-gray-400">Today</p>
        </Card>
        <Card className="text-center py-4 border-[#007E85]/20">
          <p className="text-xs sm:text-sm text-[#007E85]/70">In Progress</p>
          <p className="text-lg sm:text-xl font-bold text-orange-500">{getStatusCount("In Progress")}</p>
          <p className="text-xs text-gray-400">Currently</p>
        </Card>
        <Card className="text-center py-4 border-[#007E85]/20">
          <p className="text-xs sm:text-sm text-[#007E85]/70">Cancelled</p>
          <p className="text-lg sm:text-xl font-bold text-red-500">{getStatusCount("Cancelled")}</p>
          <p className="text-xs text-gray-400">Today</p>
        </Card>
      </div>

      {/* Appointment List Section */}
      <Card className="border-[#007E85]/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-[#007E85] text-lg sm:text-xl">Appointment Management</CardTitle>
              <CardDescription className="text-[#007E85]/70 text-sm">Track and manage all appointments</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" className="border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-4">
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-4">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Export
              </Button>
              <Button className="bg-[#007E85] hover:bg-[#006A6F] text-white text-xs sm:text-sm px-2 sm:px-4" onClick={() => setIsModalOpen(true)}>
                <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Add Appointment
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {appointmentList.map((appt) => (
            <div
              key={appt.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border border-[#007E85]/20"
            >
              <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarFallback className="bg-[#007E85] text-white text-xs sm:text-sm">
                    {appt.patient.split(" ").map((l) => l[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{appt.patient}</p>
                  <p className="text-sm text-gray-900">{appt.doctor}</p>
                  <p className="text-xs text-[#007E85]/70">{appt.date} at {appt.time}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-2">
                <div className="text-right">
                  <Badge
                    className={
                      appt.type === "Video"
                        ? "bg-[#007E85]/10 text-[#007E85] text-xs"
                        : "bg-[#007E85]/20 text-[#007E85] text-xs"
                    }
                  >
                    {appt.type}
                  </Badge>
                  <p className="text-xs text-[#007E85]/70 mt-1">{appt.status}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#007E85] border-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => handleEditAppointment(appt.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-600/10 text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => handleDeleteAppointment(appt.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add/Edit Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-[#007E85]">Add New Appointment</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-[#007E85]" />
              </Button>
            </div>
            <form onSubmit={handleAddAppointment} className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-[#007E85]">Patient Name</label>
                <Input
                  name="patient"
                  value={formData.patient}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-[#007E85]">Doctor Name</label>
                <Input
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleInputChange}
                  placeholder="Dr. Sarah Johnson"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-[#007E85]">Date</label>
                <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-[#007E85]">Time</label>
                <Input
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  placeholder="10:30 AM"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-[#007E85]">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border-[#007E85]/20 rounded-md p-2 text-xs sm:text-sm"
                  required
                >
                  <option value="Video">Video</option>
                  <option value="In-person">In-person</option>
                </select>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-[#007E85]">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border-[#007E85]/20 rounded-md p-2 text-xs sm:text-sm"
                  required
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#007E85] border-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-3"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#007E85] hover:bg-[#006A6F] text-white text-xs sm:text-sm px-2 sm:px-3">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTab;