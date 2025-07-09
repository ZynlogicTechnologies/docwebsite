import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PatientHistory {
  id: string;
  patient: string;
  visitDate: string;
  diagnosis: string;
}

const AccessPatientHistory = () => {
  const patientHistory: PatientHistory[] = [
    { id: "1", patient: "Alice Smith", visitDate: "Jul 08, 2025", diagnosis: "Cold" },
    { id: "2", patient: "Bob Johnson", visitDate: "Jul 07, 2025", diagnosis: "Fever" },
    { id: "3", patient: "Clara Davis", visitDate: "Jul 06, 2025", diagnosis: "Allergy" },
  ];

  return (
    <Card className="border-[#007E85]/20">
      <CardHeader>
        <CardTitle className="text-[#007E85] flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Patient History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {patientHistory.map((history) => (
          <div key={history.id} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-[black]">{history.patient}</h3>
            <p className="text-sm text-gray-600">Visit Date: {history.visitDate}</p>
            <p className="text-sm text-gray-600">Diagnosis: {history.diagnosis}</p>
          </div>
        ))}
        <Button className="w-full bg-[#007E85] hover:bg-[#006A6F]">
          <FileText className="h-4 w-4 mr-2" />
          View History
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccessPatientHistory;