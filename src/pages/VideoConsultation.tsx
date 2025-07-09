import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Video,
  Clock,
  Star,
  Calendar,
  Shield,
  MessageSquare,
  User,
  Heart,
  Search
} from "lucide-react";

const VideoConsultation = () => {
  const consultationPackages = [
    {
      id: "1",
      title: "Quick Consultation",
      description: "15-minute video call with general physician",
      price: 299,
      originalPrice: 399,
      duration: "15 min",
      speciality: "General Medicine",
      rating: 4.8,
      features: ["Instant booking", "Digital prescription", "Follow-up chat"]
    },
    {
      id: "2",
      title: "Detailed Consultation", 
      description: "30-minute comprehensive health checkup",
      price: 599,
      originalPrice: 799,
      duration: "30 min",
      speciality: "General Medicine",
      rating: 4.9,
      features: ["Detailed diagnosis", "Health plan", "7-day follow-up"]
    },
    {
      id: "3",
      title: "Specialist Consultation",
      description: "45-minute session with specialist doctor",
      price: 899,
      originalPrice: 1199,
      duration: "45 min",
      speciality: "Cardiology",
      rating: 4.9,
      features: ["Expert consultation", "Treatment plan", "Report analysis"]
    }
  ];

  const availableDoctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      speciality: "General Medicine",
      experience: "15 years",
      rating: 4.9,
      nextSlot: "Available now",
      price: 299,
      image: "/placeholder.svg"
    },
    {
      id: "2", 
      name: "Dr. Michael Chen",
      speciality: "Cardiology",
      experience: "12 years",
      rating: 4.8,
      nextSlot: "2:30 PM today",
      price: 899,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[black] mb-4">
              Video Consultation
            </h1>
            <p className="text-xl text-[#4b5563] max-w-3xl mx-auto">
              Connect with certified doctors from the comfort of your home. 
              Get instant medical advice through secure video calls.
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8 border-[#007E85]/20">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by symptoms or speciality"
                    className="pl-10"
                  />
                </div>
                <Input placeholder="Preferred language" />
                <Button className="bg-[#007E85] hover:bg-[#006A6F]">
                  <Video className="mr-2 h-4 w-4" />
                  Find Doctors
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[#007E85]/20">
              <Video className="h-12 w-12 text-[#007E85] mx-auto mb-4" />
              <h3 className="font-semibold text-[#007E85] mb-2">HD Video Calls</h3>
              <p className="text-sm text-gray-600">Crystal clear video quality</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[#007E85]/20">
              <Shield className="h-12 w-12 text-[#007E85] mx-auto mb-4" />
              <h3 className="font-semibold text-[#007E85] mb-2">100% Secure</h3>
              <p className="text-sm text-gray-600">HIPAA compliant platform</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[#007E85]/20">
              <Clock className="h-12 w-12 text-[#007E85] mx-auto mb-4" />
              <h3 className="font-semibold text-[#007E85] mb-2">Instant Connect</h3>
              <p className="text-sm text-gray-600">Connect within 2 minutes</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[#007E85]/20">
              <MessageSquare className="h-12 w-12 text-[#007E85] mx-auto mb-4" />
              <h3 className="font-semibold text-[#007E85] mb-2">Follow-up Chat</h3>
              <p className="text-sm text-gray-600">Free follow-up for 7 days</p>
            </div>
          </div>

          {/* Consultation Packages */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#007E85] text-center mb-8">
              Choose Your Consultation Package
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {consultationPackages.map((pkg) => (
                <Card key={pkg.id} className="hover:shadow-lg transition-shadow border-[#007E85]/20">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-green-100 text-green-800">
                        Save ₹{pkg.originalPrice - pkg.price}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{pkg.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-[#007E85]">{pkg.title}</CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-[#007E85]">₹{pkg.price}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">₹{pkg.originalPrice}</span>
                      </div>
                      <Badge variant="outline" className="text-[#007E85] border-[#007E85]">
                        {pkg.duration}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-[#007E85] font-medium">{pkg.speciality}</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="h-1.5 w-1.5 bg-[#007E85] rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full bg-[#007E85] hover:bg-[#006A6F]">
                      <Video className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Available Doctors */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#007E85] text-center mb-8">
              Available Doctors
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {availableDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow border-[#007E85]/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-16 w-16 bg-[#007E85]/10 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-[#007E85]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#007E85] text-lg">{doctor.name}</h3>
                        <p className="text-[#007E85]">{doctor.speciality}</p>
                        <p className="text-sm text-gray-600">{doctor.experience} experience</p>
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{doctor.rating}</span>
                          <Badge className="ml-3 bg-green-100 text-green-800 text-xs">
                            {doctor.nextSlot}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-lg font-bold text-[#007E85]">₹{doctor.price}</p>
                        <Link to={`/doctor/${doctor.id}`} className="block">
                          <Button variant="outline" size="sm" className="w-full">
                            View Profile
                          </Button>
                        </Link>
                        <Link to="/book-appointment" className="block">
                          <Button size="sm" className="w-full bg-[#007E85] hover:bg-[#006A6F]">
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VideoConsultation;