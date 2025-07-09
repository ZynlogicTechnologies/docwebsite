import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const DoctorDashboard = () => {
  const doctors = [
    { id: "1", name: "Dr. Anil Sharma", specialty: "Cardiology", experience: "15 yrs", fee: "₹1500", href: "/doctors/1" },
    { id: "2", name: "Dr. Priya Patel", specialty: "Dermatology", experience: "10 yrs", fee: "₹1200", href: "/doctors/2" },
    { id: "3", name: "Dr. Ravi Kumar", specialty: "Pediatrics", experience: "8 yrs", fee: "₹1000", href: "/doctors/3" },
    { id: "4", name: "Dr. Sneha Gupta", specialty: "Orthopedics", experience: "12 yrs", fee: "₹1300", href: "/doctors/4" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-[#007E85] to-[#006670] py-20 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Doctor Dashboard</h1>
          <p className="text-lg text-gray-100 mb-6">Connect with top doctors across specialties.</p>
          <Link to="/find-doctors">
            <Button className="bg-white text-[#007E85] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all">
              Find a Doctor
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Doctors Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Featured Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <Link key={doctor.id} to={doctor.href} className="group">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-gray-200 overflow-hidden h-full">
                  <CardHeader className="p-6 text-center bg-[#007E85]/5">
                    <div className="w-20 h-20 bg-[#007E85]/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                      <User className="h-10 w-10 text-[#007E85]" />
                    </div>
                    <CardTitle className="text-xl text-gray-800 font-semibold">{doctor.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="text-gray-600 mb-4 text-center">
                      <span className="block font-medium">{doctor.specialty}</span>
                      <span className="block text-sm">{doctor.experience} experience</span>
                      <span className="block text-sm">Fee: {doctor.fee}</span>
                    </CardDescription>
                    <div className="text-center">
                      <Button 
                        variant="outline"
                        className="border-[#007E85] text-[#007E85] hover:bg-[#007E85]/10 hover:text-[#007E85]"
                      >
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;