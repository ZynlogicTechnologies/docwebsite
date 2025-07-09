import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Star, Hospital } from "lucide-react";
import { mockDoctors } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

const HospitalsPage = () => {
  const hospitals = [
    {
      id: "1",
      name: "Apollo Hospitals",
      location: "Mumbai, Maharashtra",
      beds: "500+ Beds",
      rating: 4.8,
      doctors: mockDoctors.filter((doc) => doc.hospital === "Apollo Hospitals" || Math.random() > 0.5).slice(0, 3) // Fixed hospitalId to hospital
    },
    {
      id: "2",
      name: "Fortis Healthcare",
      location: "Delhi, NCR",
      beds: "450+ Beds",
      rating: 4.7,
      doctors: mockDoctors.filter((doc) => doc.hospital === "Fortis Healthcare" || Math.random() > 0.5).slice(0, 3) // Fixed hospitalId to hospital
    },
    {
      id: "3",
      name: "Manipal Hospitals",
      location: "Bengaluru, Karnataka",
      beds: "600+ Beds",
      rating: 4.9,
      doctors: mockDoctors.filter((doc) => doc.hospital === "Manipal Hospitals" || Math.random() > 0.5).slice(0, 3) // Fixed hospitalId to hospital
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-[#007E85] mb-8 text-center">Our Hospitals</h1>
          <div className="space-y-12">
            {hospitals.map((hospital) => (
              <Card key={hospital.id} className="border-[#007E85]/20">
                <CardHeader className="p-6">
                  <CardTitle className="text-2xl text-[#007E85]">{hospital.name}</CardTitle>
                  <CardDescription className="text-gray-600">{hospital.location}</CardDescription>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                    <MapPin className="h-4 w-4" />
                    <span>{hospital.beds}</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{hospital.rating}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <h3 className="text-xl font-semibold text-[#007E85] mb-4">Associated Doctors</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hospital.doctors.map((doctor) => (
                      <Link key={doctor.id} to={`/doctor/${doctor.id}`}>
                        <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-[#007E85]/20">
                          <CardHeader className="text-center pb-4">
                            <img
                              src={doctor.avatar}
                              alt={doctor.name}
                              className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border-2 border-[#007E85]/20"
                            />
                            <CardTitle className="text-lg text-[#007E85]">{doctor.name}</CardTitle>
                            <CardDescription className="text-[#007E85]">{doctor.specialty}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Exp.</span>
                              <span className="font-medium">{doctor.experience} yrs</span>
                            </div>
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{doctor.rating}</span>
                              </div>
                              <span className="text-gray-600">({doctor.reviews} reviews)</span>
                            </div>
                            <Badge 
                              variant={doctor.available ? "default" : "secondary"}
                              className={doctor.available ? "w-full justify-center bg-[#007E85] hover:bg-[#006A6F]" : "w-full justify-center"}
                            >
                              {doctor.available ? "Available" : "Busy"}
                            </Badge>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                  <div className="text-center mt-6">
                    <Link to={`/hospitals/${hospital.id}`}>
                      <Button className="bg-[#007E85] hover:bg-[#006A6F] text-white shadow-md">
                        View More Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HospitalsPage;