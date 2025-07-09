import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Patient {
  id: string;
  name: string;
  lastConsultation: string;
}

const ConsultPatients = () => {
  const patients: Patient[] = [
    { id: "1", name: "Alice Smith", lastConsultation: "Jul 08, 2025" },
    { id: "2", name: "Bob Johnson", lastConsultation: "Jul 07, 2025" },
    { id: "3", name: "Clara Davis", lastConsultation: "Jul 06, 2025" },
  ];

  return (
    <Card className="border-[#007E85]/20">
      <CardHeader>
        <CardTitle className="text-[#007E85] flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Consult Patients
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {patients.map((patient) => (
          <div key={patient.id} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-[#007E85]">{patient.name}</h3>
            <p className="text-sm text-gray-600">Last Consultation: {patient.lastConsultation}</p>
          </div>
        ))}
        <Button className="w-full bg-[#007E85] hover:bg-[#006A6F]">
          <Video className="h-4 w-4 mr-2" />
          Start Consultation
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsultPatients;