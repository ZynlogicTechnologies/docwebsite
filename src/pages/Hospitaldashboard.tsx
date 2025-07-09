import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital } from "lucide-react";

const HospitalDashboard = () => {
  const hospitals = [
    { id: "1", name: "Apollo Hospitals", beds: "500+", location: "Mumbai, Maharashtra", href: "/hospitals/1" },
    { id: "2", name: "Fortis Healthcare", beds: "450+", location: "Delhi, NCR", href: "/hospitals/2" },
    { id: "3", name: "Manipal Hospitals", beds: "600+", location: "Bengaluru, Karnataka", href: "/hospitals/3" },
    { id: "4", name: "Max Healthcare", beds: "400+", location: "Chennai, Tamil Nadu", href: "/hospitals/4" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-[#007E85] to-[#006670] py-20 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hospital Dashboard</h1>
          <p className="text-lg text-gray-100 mb-6">
            Manage and explore top hospitals across India.
          </p>
          <Link to="/hospitals">
            <Button className="bg-white text-[#007E85] hover:bg-gray-100 shadow-lg hover:shadow-xl">
              View All Hospitals
            </Button>
          </Link>
        </div>
      </div>

      {/* Hospitals Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Featured Hospitals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hospitals.map((hospital) => (
              <Link key={hospital.id} to={hospital.href} className="group">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-gray-200 overflow-hidden h-full">
                  <CardHeader className="p-6 text-center bg-[#007E85]/5">
                    <div className="w-20 h-20 bg-[#007E85]/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                      <Hospital className="h-10 w-10 text-[#007E85]" />
                    </div>
                    <CardTitle className="text-xl text-gray-800 font-semibold">
                      {hospital.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="text-gray-600 mb-4 text-center">
                      <span className="block">{hospital.location}</span>
                      <span className="block font-medium">{hospital.beds} Beds</span>
                    </CardDescription>
                    <div className="text-center">
                      <Button 
                        variant="outline"
                        className="border-[#007E85] text-[#007E85] hover:bg-[#007E85]/10 hover:text-[#007E85]"
                      >
                        View Details
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

export default HospitalDashboard;