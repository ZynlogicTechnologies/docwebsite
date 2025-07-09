import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart,
  Users,
  Award,
  Shield,
  Clock,
  Globe,
  Star,
  CheckCircle
} from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Happy Patients", value: "10M+" },
    { icon: Heart, label: "Doctors", value: "50K+" },
    { icon: Globe, label: "Cities", value: "200+" },
    { icon: Award, label: "Years of Trust", value: "15+" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Patient First",
      description: "Every decision we make is centered around improving patient outcomes and experience."
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "We maintain the highest standards of medical ethics and data security."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every aspect of healthcare delivery."
    },
    {
      icon: Clock,
      title: "Accessibility",
      description: "Making quality healthcare accessible to everyone, everywhere, anytime."
    }
  ];

  return (
    <div className="min-h-screen bg-[#C8E6C9]">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#424242] mb-4">
              About MediCare
            </h1>
            <p className="text-xl text-[#424242]/70 max-w-3xl mx-auto">
              We're on a mission to make healthcare accessible, affordable, and convenient for everyone. 
              Our platform connects patients with qualified doctors and provides comprehensive health services.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center border-[#C8E6C9]/50">
                  <CardContent className="p-6">
                    <IconComponent className="h-8 w-8 text-[#2E7D32] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[#424242] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#424242]/70">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Our Story */}
          <Card className="mb-12 border-[#C8E6C9]/50">
            <CardHeader>
              <CardTitle className="text-2xl text-[#424242]">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-[#424242]/70 mb-4">
                Founded in 2008, MediCare started with a simple vision: to make healthcare more accessible 
                and convenient for everyone. What began as a small team of passionate healthcare professionals 
                has grown into India's leading healthcare platform.
              </p>
              <p className="text-[#424242]/70 mb-4">
                Today, we serve millions of patients across 200+ cities, connecting them with over 50,000 
                verified doctors and healthcare providers. Our platform offers everything from online 
                consultations to lab tests, medicine delivery, and health record management.
              </p>
              <p className="text-[#424242]/70">
                We believe that quality healthcare should be available to everyone, regardless of their 
                location or background. Through technology and innovation, we're breaking down barriers 
                and making healthcare truly accessible.
              </p>
            </CardContent>
          </Card>

          {/* Our Values */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#424242] text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-[#C8E6C9]/50">
                    <CardContent className="p-6 text-center">
                      <IconComponent className="h-12 w-12 text-[#2E7D32] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#424242] mb-2">{value.title}</h3>
                      <p className="text-[#424242]/70 text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <Card className="mb-12 border-[#C8E6C9]/50">
            <CardHeader>
              <CardTitle className="text-2xl text-[#424242]">Our Achievements</CardTitle>
              <CardDescription className="text-[#424242]/70">Recognition and milestones that make us proud</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#2E7D32] mt-0.5" />
                    <div>
                      <div className="font-medium text-[#424242]">ISO 27001 Certified</div>
                      <div className="text-sm text-[#424242]/70">International security standards compliance</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#2E7D32] mt-0.5" />
                    <div>
                      <div className="font-medium text-[#424242]">Healthcare Innovation Award 2023</div>
                      <div className="text-sm text-[#424242]/70">For digital healthcare transformation</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#2E7D32] mt-0.5" />
                    <div>
                      <div className="font-medium text-[#424242]">99.9% Uptime</div>
                      <div className="text-sm text-[#424242]/70">Reliable platform availability</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#2E7D32] mt-0.5" />
                    <div>
                      <div className="font-medium text-[#424242]">4.8/5 Patient Satisfaction</div>
                      <div className="text-sm text-[#424242]/70">Based on 2M+ reviews</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#2E7D32] mt-0.5" />
                    <div>
                      <div className="font-medium text-[#424242]">NABH Accredited</div>
                      <div className="text-sm text-[#424242]/70">National quality standards</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-[#2E7D32] mt-0.5" />
                    <div>
                      <div className="font-medium text-[#424242]">Data Privacy Compliant</div>
                      <div className="text-sm text-[#424242]/70">GDPR and Indian IT Act compliance</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;