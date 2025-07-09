import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Prescription {
  id: string;
  patient: string;
  date: string;
  medication: string;
}

const WritePrescription = () => {
  const prescriptions: Prescription[] = [
    { id: "1", patient: "Alice Smith", date: "Jul 08, 2025", medication: "Paracetamol, 500mg" },
    { id: "2", patient: "Bob Johnson", date: "Jul 07, 2025", medication: "Amoxicillin, 250mg" },
  ];

  return (
    <Card className="border-[#007E85]/20">
      <CardHeader>
        <CardTitle className="text-[#007E85] flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Write e-Prescription
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-[#007E85]">{prescription.patient}</h3>
            <p className="text-sm text-gray-600">Date: {prescription.date}</p>
            <p className="text-sm text-gray-600">Medication: {prescription.medication}</p>
          </div>
        ))}
        <Button className="w-full bg-[#007E85] hover:bg-[#006A6F]">
          <FileText className="h-4 w-4 mr-2" />
          Create Prescription
        </Button>
      </CardContent>
    </Card>
  );
};

export default WritePrescription;