import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SpecialtiesPage = () => {
  const specialties = [
    { id: "1", name: "Cardiology", href: "/find-doctors?specialty=cardiology" },
    { id: "2", name: "Dermatology", href: "/find-doctors?specialty=dermatology" },
    { id: "3", name: "Pediatrics", href: "/find-doctors?specialty=pediatrics" },
    { id: "4", name: "Orthopedics", href: "/find-doctors?specialty=orthopedics" },
    { id: "5", name: "Neurology", href: "/find-doctors?specialty=neurology" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-practo-navy to-practo-sky/80 py-20 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Explore Medical Specialties</h1>
          <p className="text-xl text-gray-200 mb-6">
            Discover top-tier healthcare with our expert specialists across all fields.
          </p>
          <Link to="/find-doctors">
            <Button className="bg-white text-practo-navy hover:bg-gray-100 shadow-lg">
              Book a Consultation
            </Button>
          </Link>
        </div>
      </div>

      {/* Specialties Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-practo-navy mb-10 text-center">
            Our Specialties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((specialty) => (
              <Link key={specialty.id} to={specialty.href} className="group">
                <Card className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border-practo-light/50 overflow-hidden h-full">
                  <CardHeader className="p-6 text-center bg-gradient-to-b from-practo-light/20 to-white">
                    <div className="w-20 h-20 bg-practo-sky/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110">
                      <Stethoscope className="h-10 w-10 text-practo-navy" />
                    </div>
                    <CardTitle className="text-2xl text-practo-navy font-semibold">
                      {specialty.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <CardDescription className="text-gray-600 mb-4 text-center">
                      Access top doctors and book consultations with ease.
                    </CardDescription>
                    <div className="text-center">
                      <Button className="bg-gradient-to-r from-practo-navy to-practo-sky hover:from-practo-sky hover:to-practo-navy text-white shadow-md hover:shadow-lg transition-all duration-200">
                        Explore Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SpecialtiesPage;