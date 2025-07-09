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
  
      <div className="relative w-full bg-gradient-to-r from-[#26A69A] to-[#00695C]/80 py-20 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Doctor Dashboard</h1>
          <p className="text-xl text-[#E0E0E0] mb-6">Connect with top doctors across specialties.</p>
          <Link to="/find-doctors">
            <Button className="bg-[#E0E0E0] text-[#00695C] hover:bg-[#D5D5D5] shadow-lg">Find a Doctor</Button>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#424242] mb-10 text-center">Featured Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <Link key={doctor.id} to={doctor.href} className="group">
                <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-[#E0E0E0]/50 overflow-hidden h-full">
                  <CardHeader className="p-6 text-center bg-gradient-to-b from-[#26A69A]/20 to-white">
                    <div className="w-20 h-20 bg-[#00695C]/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                      <User className="h-10 w-10 text-[#00695C]" />
                    </div>
                    <CardTitle className="text-2xl text-[#424242] font-semibold">{doctor.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="text-[#424242]/70 mb-4 text-center">
                      {doctor.specialty} | {doctor.experience} | Fee: {doctor.fee}
                    </CardDescription>
                    <div className="text-center">
                      <Button className="bg-gradient-to-r from-[#26A69A] to-[#00695C] text-white shadow-md hover:shadow-lg transition-all duration-200">
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