import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, FileText, Heart } from "lucide-react";

const DoctorDashboardSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-[#007E85]/20">
        <CardContent className="p-6 text-center">
          <Calendar className="h-8 w-8 text-[#007E85] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#007E85]">10</div>
          <div className="text-sm text-gray-600">Appointments</div>
        </CardContent>
      </Card>
      <Card className="border-[#007E85]/20">
        <CardContent className="p-6 text-center">
          <Users className="h-8 w-8 text-[#007E85] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#007E85]">50</div>
          <div className="text-sm text-gray-600">Patients</div>
        </CardContent>
      </Card>
      <Card className="border-[#007E85]/20">
        <CardContent className="p-6 text-center">
          <FileText className="h-8 w-8 text-[#007E85] mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#007E85]">15</div>
          <div className="text-sm text-gray-600">Prescriptions</div>
        </CardContent>
      </Card>
      <Card className="border-[#007E85]/20">
        <CardContent className="p-6 text-center">
          <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-[#007E85]">Good</div>
          <div className="text-sm text-gray-600">Performance</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboardSummary;