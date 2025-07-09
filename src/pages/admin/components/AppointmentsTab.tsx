import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Download, Calendar, Video, User, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const appointments = [
  { id: "1", patient: "John Doe", doctor: "Dr. Sarah", time: "10:30 AM", type: "Video", status: "Completed" },
  { id: "2", patient: "Jane Smith", doctor: "Dr. Michael", time: "11:00 AM", type: "In-person", status: "In Progress" },
  { id: "3", patient: "Alice Johnson", doctor: "Dr. Raj", time: "12:15 PM", type: "Video", status: "Scheduled" },
  { id: "4", patient: "David Lee", doctor: "Dr. Kavita", time: "1:00 PM", type: "In-person", status: "Completed" },
  { id: "5", patient: "Michael Brown", doctor: "Dr. Emily", time: "2:30 PM", type: "Video", status: "Cancelled" },
];

const getStatusCount = (status: string) => appointments.filter(a => a.status === status).length;

const AppointmentsTab = () => {
  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center py-4">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold text-[#007E85]">{appointments.length}</p>
          <p className="text-xs text-gray-400">Appointments</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-xl font-bold text-green-600">{getStatusCount("Completed")}</p>
          <p className="text-xs text-gray-400">Today</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-xl font-bold text-orange-500">{getStatusCount("In Progress")}</p>
          <p className="text-xs text-gray-400">Currently</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-sm text-gray-500">Cancelled</p>
          <p className="text-xl font-bold text-red-500">{getStatusCount("Cancelled")}</p>
          <p className="text-xs text-gray-400">Today</p>
        </Card>
      </div>

      {/* Appointment List Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-800">Appointment Management</CardTitle>
              <CardDescription className="text-gray-500">Track and manage all appointments</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="border-gray-300 text-[#007E85]">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="border-gray-300 text-[#007E85]">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-[#007E85] text-white">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Appointment
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-[#007E85] text-white">
                    {appt.patient.split(" ").map((l) => l[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-800">{appt.patient}</p>
                  <p className="text-sm text-[#007E85]">{appt.doctor}</p>
                  <p className="text-xs text-gray-500">{appt.time}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  className={
                    appt.type === "Video"
                      ? "bg-[#007E85]/10 text-[#007E85]"
                      : "bg-[#007E85]/20 text-[#007E85]"
                  }
                >
                  {appt.type}
                </Badge>
                <p className="text-xs text-gray-500 mt-1">{appt.status}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsTab;
