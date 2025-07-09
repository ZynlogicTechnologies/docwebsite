import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  HeadphonesIcon
} from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our support team",
      contact: "+91 1800-XXX-XXXX",
      availability: "24/7 Available"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us your queries",
      contact: "support@medicare.com",
      availability: "Response within 2 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our agents",
      contact: "Start Chat",
      availability: "24/7 Available"
    },
    {
      icon: HeadphonesIcon,
      title: "WhatsApp",
      description: "Message us on WhatsApp",
      contact: "+91 98XXX-XXXXX",
      availability: "9 AM - 9 PM"
    }
  ];

  const offices = [
    {
      city: "Mumbai",
      address: "123 Business District, Bandra Kurla Complex, Mumbai - 400051",
      phone: "+91 22 XXXX XXXX",
      email: "mumbai@medicare.com"
    },
    {
      city: "Bangalore",
      address: "456 Tech Park, Electronic City, Bangalore - 560100",
      phone: "+91 80 XXXX XXXX", 
      email: "bangalore@medicare.com"
    },
    {
      city: "Delhi",
      address: "789 Corporate Plaza, Connaught Place, New Delhi - 110001",
      phone: "+91 11 XXXX XXXX",
      email: "delhi@medicare.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help! Reach out to us through any of the channels below 
              and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <IconComponent className="h-12 w-12 text-[#007E85] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                    <div className="font-medium text-[#007E85] mb-1">{method.contact}</div>
                    <div className="text-xs text-gray-500">{method.availability}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input type="email" placeholder="john.doe@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone</label>
                  <Input type="tel" placeholder="+91 98XXX XXXXX" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Subject</label>
                  <Input placeholder="How can we help you?" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Message</label>
                  <Textarea 
                    placeholder="Please describe your query or concern..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-[#007E85] hover:bg-[#006A6F]">
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* FAQ & Support */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Quick answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="font-medium mb-2">How do I book an appointment?</h4>
                  <p className="text-sm text-gray-600">
                    You can book appointments through our website or mobile app. 
                    Search for doctors, select a time slot, and confirm your booking.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-medium mb-2">Are online consultations safe?</h4>
                  <p className="text-sm text-gray-600">
                    Yes, our platform uses encrypted video calls and follows all 
                    medical privacy regulations to ensure your consultation is secure.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-medium mb-2">How do I access my health records?</h4>
                  <p className="text-sm text-gray-600">
                    Login to your account and visit the Health Records section. 
                    All your prescriptions, reports, and medical history are stored securely.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h4 className="font-medium mb-2">What payment methods do you accept?</h4>
                  <p className="text-sm text-gray-600">
                    We accept all major credit/debit cards, UPI, net banking, 
                    and digital wallets for seamless payments.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">How do I cancel an appointment?</h4>
                  <p className="text-sm text-gray-600">
                    You can cancel appointments up to 2 hours before the scheduled time 
                    through your dashboard or by calling our support team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Office Locations */}
          <Card>
            <CardHeader>
              <CardTitle>Our Offices</CardTitle>
              <CardDescription>
                Visit us at our offices across major cities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {offices.map((office, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-[#007E85]">
                      {office.city}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-600">{office.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{office.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{office.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;