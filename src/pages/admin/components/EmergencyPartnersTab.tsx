import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const emergencyPartners = [
  {
    id: "1",
    name: "Apollo Emergency Services",
    contact: "+91 98765 43210",
    type: "Ambulance",
    status: "Active",
  },
  {
    id: "2",
    name: "Red Cross Rapid Response",
    contact: "+91 91234 56789",
    type: "Disaster Relief",
    status: "Active",
  },
  {
    id: "3",
    name: "CityCare Ambulance",
    contact: "+91 99887 76655",
    type: "Ambulance",
    status: "Temporarily Unavailable",
  },
];

const EmergencyPartnersTab = () => {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-800">Manage Emergency Partners</CardTitle>
            <CardDescription className="text-gray-500">
              View and update emergency contacts, ambulance partners, and response units
            </CardDescription>
          </div>
          <Button className="bg-[#007E85] text-white hover:bg-[#006670]">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {emergencyPartners.map((partner) => (
          <div
            key={partner.id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{partner.name}</p>
              <p className="text-xs text-gray-500">{partner.contact}</p>
              <p className="text-xs text-[#007E85]">{partner.type}</p>
            </div>
            <div className="text-right space-y-1">
              <Badge
                className={
                  partner.status === "Active"
                    ? "bg-[#007E85]/10 text-[#007E85]"
                    : "bg-yellow-100 text-yellow-800"
                }
              >
                {partner.status}
              </Badge>
              <Button variant="outline" className="text-[#007E85] border-gray-300 w-full mt-1">
                <PhoneCall className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EmergencyPartnersTab;
