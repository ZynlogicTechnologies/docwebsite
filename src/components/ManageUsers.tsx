import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  role: string;
}

const ManageUsers = () => {
  const users: User[] = [
    { id: "1", name: "Dr. Emily Brown", role: "Cardiologist" },
    { id: "2", name: "Dr. Michael Lee", role: "General Physician" },
  ];

  return (
    <Card className="border-[#007E85]/20">
      <CardHeader>
        <CardTitle className="text-[#007E85] flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Manage Users/Doctors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-[black]">{user.name}</h3>
            <p className="text-sm text-gray-600">Role: {user.role}</p>
          </div>
        ))}
        <Button className="w-full bg-[#007E85] hover:bg-[#006A6F]">
          <Users className="h-4 w-4 mr-2" />
          Manage Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default ManageUsers;