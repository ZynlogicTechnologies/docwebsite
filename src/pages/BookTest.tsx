import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin } from "lucide-react";

const labTests = [
  {
    id: "1",
    name: "Complete Blood Count (CBC)",
    description: "Comprehensive blood analysis including RBC, WBC, platelets",
    price: 299,
    originalPrice: 399,
    preparationTime: "No fasting required",
    reportTime: "Same day",
  },
  {
    id: "2",
    name: "Lipid Profile",
    description: "Cholesterol and triglyceride levels assessment",
    price: 449,
    originalPrice: 599,
    preparationTime: "12 hours fasting",
    reportTime: "Same day",
  },
  {
    id: "3",
    name: "Thyroid Function Test",
    description: "TSH, T3, T4 levels to assess thyroid health",
    price: 599,
    originalPrice: 799,
    preparationTime: "No fasting required",
    reportTime: "Next day",
  },
];

const BookTest = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const test = labTests.find((t) => t.id === id);

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Test Not Found</h1>
          <p className="text-gray-600 mt-2">The requested lab test could not be found.</p>
          <Button className="mt-4" onClick={() => navigate("/lab-tests")}>
            Back to Lab Tests
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking submission (e.g., API call)
    alert(`Booking confirmed for ${test.name}!`);
    navigate("/lab-tests");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Book {test.name}</CardTitle>
              <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Select Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input id="date" type="date" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Select Time</Label>
                  <Select required>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Test Location</Label>
                  <Select required>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">Home Collection</SelectItem>
                      <SelectItem value="lab">Lab Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price</Label>
                  <p className="text-lg font-bold text-primary">₹{test.price}</p>
                </div>
                <Button type="submit" className="w-full">
                  Confirm Booking
                </Button>
              </form>
            </CardContent>
          </Card>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => navigate("/lab-tests")}
          >
            Back to Lab Tests
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookTest;