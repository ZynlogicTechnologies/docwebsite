"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const recentAppointments = [
  { id: "1", patient: "John Doe", doctor: "Dr. Sarah", time: "10:30 AM", type: "Video", status: "Completed" },
  { id: "2", patient: "Jane Smith", doctor: "Dr. Michael", time: "11:00 AM", type: "In-person", status: "In Progress" },
  
];

const OverviewTab = () => {
  return (
    <div className="w-full">
      <Card className="w-full border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">Recent Appointments</CardTitle>
          <CardDescription className="text-gray-500">Latest appointment activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-[#007E85] text-white">
                      {appointment.patient.split(" ").map(i => i[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-800">{appointment.patient}</p>
                    <p className="text-sm text-gray">{appointment.doctor}</p>
                    <p className="text-xs text-gray-500">{appointment.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-[#007E85]/10 text-[#007E85]">{appointment.type}</Badge>
                  <p className="text-xs text-gray-500 mt-1">{appointment.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
