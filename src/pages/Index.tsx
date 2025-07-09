import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadArticleSection from "@/components/Articles";
import HospitalSection from "@/components/HospitalSection";
import SpecialtySection from "@/components/SpecialtySection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Calendar,
  Heart,
  Shield,
  Clock,
  Users,
  Star,
  MapPin,
  Video,
  FileText,
  Pill,
  TestTube,
  Phone,
  Award,
  CheckCircle
} from "lucide-react";
import { mockDoctors } from "@/data/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const features = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book appointments with top doctors in just a few clicks"
    },
    {
      icon: Video,
      title: "Online Consultation",
      description: "Consult with doctors from the comfort of your home"
    },
    {
      icon: FileText,
      title: "Digital Records",
      description: "Access your medical records anytime, anywhere"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is protected with bank-level security"
    }
  ];

  const services = [
    {
      icon: Users,
      title: "Find Doctors",
      description: "Search and book appointments with verified doctors",
      href: "/find-doctors",
      color: "bg-[#007E85]/10 text-[#007E85]"
    },
    {
      icon: Pill,
      title: "Order Medicine",
      description: "Get medicines delivered to your doorstep",
      href: "/medicine",
      color: "bg-[#007E85]/10 text-[#007E85]"
    },
    {
      icon: TestTube,
      title: "Lab Tests",
      description: "Book lab tests and get reports online",
      href: "/lab-tests",
      color: "bg-[#007E85]/10 text-[#007E85]"
    },
    {
      icon: FileText,
      title: "Health Records",
      description: "Manage your health records digitally",
      href: "/health-records",
      color: "bg-[#007E85]/10 text-[#007E85]"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Verified Doctors" },
    { number: "2M+", label: "Happy Patients" },
    { number: "1000+", label: "Hospitals" },
    { number: "200+", label: "Cities" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#007E85]/10 via-[#007E85]/5 to-[#006670]/5 py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-center">
            {/* Left Side (Text + Search) */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-[#007E85]/10 text-[#007E85] border-[#007E85]/20">
                  ✨ Your Health, Our Priority
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find & Book
                  <span className="text-[#007E85] block">Doctor Appointments</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Connect with verified doctors, book appointments instantly, and manage your health records - all in one platform.
                </p>
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#007E85]" />
                    <Input
                      placeholder="Search doctors, specialties, hospitals..."
                      className="pl-12 h-14 text-lg border-0 focus-visible:ring-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button size="lg" className="h-14 px-8 text-lg bg-[#007E85] hover:bg-[#006670]">
                    <Search className="mr-2 h-5 w-5" />
                    Search
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="rounded-full border-[#007E85] text-[#007E85] hover:bg-[#007E85]/10">
                  <Video className="mr-2 h-4 w-4" />
                  Video Consultation
                </Button>
                <Button variant="outline" size="sm" className="rounded-full border-[#007E85] text-[#007E85] hover:bg-[#007E85]/10">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
                <Button variant="outline" size="sm" className="rounded-full border-[#007E85] text-[#007E85] hover:bg-[#007E85]/10">
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency
                </Button>
              </div>
            </div>

            {/* Right Side (Image) */}
            <div className="relative w-full max-w-full">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop&crop=face"
                  alt="Doctor consultation"
                  className="rounded-2xl shadow-xl w-full h-auto max-h-[400px] object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#007E85]/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#006670]/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#007E85] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Health Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed to meet all your medical needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={index} to={service.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer border-gray-200">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Top Rated Doctors
              </h2>
              <p className="text-xl text-gray-600">
                Consult with our verified and experienced doctors
              </p>
            </div>
            <Link to="/find-doctors">
              <Button variant="outline" className="border-[#007E85] text-[#007E85] hover:bg-[#007E85]/10">
                View All Doctors
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockDoctors.map((doctor) => (
              <Link key={doctor.id} to={`/doctor/${doctor.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-gray-200">
                  <CardHeader className="text-center pb-4">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <CardDescription className="text-[#007E85]">{doctor.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-medium">{doctor.experience} years</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                      <span className="text-gray-600">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Consultation</span>
                      <span className="font-medium text-[#007E85]">₹{doctor.consultationFee}</span>
                    </div>
                    <div className="pt-2">
                      <Badge
                        variant={doctor.available ? "default" : "secondary"}
                        className={`w-full justify-center ${doctor.available ? 'bg-[#007E85]' : ''}`}
                      >
                        {doctor.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SpecialtySection />
      <HospitalSection />

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-[#007E85]/5 to-[#006670]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediCare?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best healthcare experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#007E85]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-[#007E85]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ReadArticleSection />

      {/* CTA Section */}
      <section className="py-20 bg-[#007E85] text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join millions of users who trust MediCare for their healthcare needs.
              Start your journey to better health today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="text-[#007E85] border-[#007E85] bg-white hover:bg-white hover:text-[#007E85] hover:border-[#007E85]"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Your First Appointment
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-[#007E85] border-[#007E85] bg-white hover:bg-white hover:text-[#007E85] hover:border-[#007E85]"
              >
                Download Mobile App
              </Button>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;