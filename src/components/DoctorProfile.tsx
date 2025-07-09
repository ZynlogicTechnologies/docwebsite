import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Profile {
  name: string;
  specialization: string;
  availability: string;
}

const DoctorProfile = () => {
  const profile: Profile = {
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    availability: "Mon-Fri, 9:00 AM - 5:00 PM IST",
  };

  return (
    <Card className="border-[#007E85]/20">
      <CardHeader>
        <CardTitle className="text-[#007E85] flex items-center">
          <User className="h-5 w-5 mr-2" />
          Profile & Availability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-[black]">{profile.name}</h3>
          <p className="text-sm text-gray-600">Specialization: {profile.specialization}</p>
          <p className="text-sm text-gray-600">Availability: {profile.availability}</p>
        </div>
        <Button className="w-full bg-[#007E85] hover:bg-[#006A6F]">
          <User className="h-4 w-4 mr-2" />
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorProfile;