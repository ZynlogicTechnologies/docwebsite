import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  patient: string;
  date: string;
  time: string;
  type: "Video" | "In-person";
}

const ViewAppointments = () => {
  const appointments: Appointment[] = [
    { id: "1", patient: "Alice Smith", date: "Today", time: "2:30 PM", type: "Video" },
    { id: "2", patient: "Bob Johnson", date: "Tomorrow", time: "10:00 AM", type: "In-person" },
  ];

  return (
    <Card className="border-[#007E85]/20">
      <CardHeader>
        <CardTitle className="text-[#007E85] flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Appointments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((app) => (
          <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold text-[#007E85]">{app.patient}</h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {app.date} at {app.time}
              </div>
            </div>
            <Button variant="outline" size="sm">
              {app.type === "Video" ? <Video className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
            </Button>
          </div>
        ))}
        <Button className="w-full bg-[#007E85] hover:bg-[#006A6F]">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule New
        </Button>
      </CardContent>
    </Card>
  );
};

export default ViewAppointments;