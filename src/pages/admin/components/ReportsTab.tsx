import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Activity, BarChart, UserPlus, CalendarCheck, Stethoscope } from "lucide-react";

const topDoctors = [
  { name: "Dr. Sarah Johnson", patients: 120, rating: 4.9 },
  { name: "Dr. Michael Smith", patients: 95, rating: 4.7 },
  { name: "Dr. Emily Brown", patients: 88, rating: 4.8 },
];

const ReportsTab = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center py-4">
          <CalendarCheck className="mx-auto text-[#007E85]" />
          <p className="text-sm text-gray-500 mt-2">Total Appointments</p>
          <p className="text-xl font-bold text-[#007E85]">350</p>
        </Card>
        <Card className="text-center py-4">
          <UserPlus className="mx-auto text-[#007E85]" />
          <p className="text-sm text-gray-500 mt-2">New Patients</p>
          <p className="text-xl font-bold text-[#007E85]">128</p>
        </Card>
        <Card className="text-center py-4">
          <BarChart className="mx-auto text-[#007E85]" />
          <p className="text-sm text-gray-500 mt-2">Revenue Generated</p>
          <p className="text-xl font-bold text-[#007E85]">₹2.5L</p>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">Monthly Appointment Trends</CardTitle>
          <CardDescription className="text-gray-500">Graphical data representation (mock)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center border border-dashed border-gray-300 rounded-md text-sm text-gray-400">
            Chart Placeholder (e.g., Line Chart)
          </div>
        </CardContent>
      </Card>

      {/* Top Doctors */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">Top Performing Doctors</CardTitle>
          <CardDescription className="text-gray-500">Based on number of patients and ratings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {topDoctors.map((doc, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <Stethoscope className="text-[#007E85]" />
                <div>
                  <p className="font-semibold text-gray-800">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.patients} patients</p>
                </div>
              </div>
              <p className="text-sm font-medium text-[#007E85]">⭐ {doc.rating}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsTab;
