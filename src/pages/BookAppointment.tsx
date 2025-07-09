import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  CalendarIcon,
  Clock,
  Video,
  MapPin,
  CreditCard,
  CheckCircle,
  User,
  Phone,
  Mail
} from "lucide-react";
import { format } from "date-fns";
import { mockDoctors } from "@/data/mockData";

const BookAppointment = () => {
  const { toast } = useToast();
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentType, setAppointmentType] = useState("online");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM"
  ];

  const selectedDoctorData = mockDoctors.find(doc => doc.id === selectedDoctor);

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !patientName || !patientPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Booked Successfully!",
      description: `Your appointment with ${selectedDoctorData?.name} is confirmed for ${format(selectedDate, "PPP")} at ${selectedTime}`,
    });

    // Reset form
    setSelectedDoctor("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setPatientName("");
    setPatientPhone("");
    setPatientEmail("");
    setSymptoms("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Book Your Appointment
            </h1>
            <p className="text-lg text-[#007E85]">
              Choose your preferred doctor and schedule your consultation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Doctor Selection */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-[#007E85]" />
                    <span>Select Doctor</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDoctors.map(doctor => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={doctor.avatar} 
                              alt={doctor.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-medium">{doctor.name}</div>
                              <div className="text-xs text-gray-500">{doctor.specialty}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Appointment Type */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Consultation Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={appointmentType} onValueChange={setAppointmentType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" className="text-[#007E85]" />
                      <Label htmlFor="online" className="flex items-center space-x-2 cursor-pointer">
                        <Video className="h-4 w-4 text-[#007E85]" />
                        <span>Online Consultation</span>
                        <Badge className="bg-[#007E85]/10 text-[#007E85]">Recommended</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="offline" id="offline" className="text-[#007E85]" />
                      <Label htmlFor="offline" className="flex items-center space-x-2 cursor-pointer">
                        <MapPin className="h-4 w-4 text-[#007E85]" />
                        <span>In-Person Visit</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Date and Time Selection */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-[#007E85]" />
                    <span>Select Date & Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-[#007E85]" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label>Time Slot</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {timeSlots.map(time => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className={`text-xs ${selectedTime === time ? 'bg-[#007E85] hover:bg-[#006670]' : ''}`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Information */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <Label htmlFor="symptoms">Symptoms/Reason for Visit</Label>
                    <Textarea
                      id="symptoms"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      placeholder="Describe your symptoms or reason for consultation"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-[#007E85]" />
                    <span>Payment Method</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" className="text-[#007E85]" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" className="text-[#007E85]" />
                      <Label htmlFor="upi">UPI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wallet" id="wallet" className="text-[#007E85]" />
                      <Label htmlFor="wallet">Digital Wallet</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              {selectedDoctorData && (
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle>Doctor Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedDoctorData.avatar}
                        alt={selectedDoctorData.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{selectedDoctorData.name}</h3>
                        <p className="text-sm text-[#007E85]">{selectedDoctorData.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience</span>
                        <span>{selectedDoctorData.experience} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating</span>
                        <span className="flex items-center">
                          ⭐ {selectedDoctorData.rating} ({selectedDoctorData.reviews})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location</span>
                        <span>{selectedDoctorData.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consultation Type</span>
                      <span className="capitalize">{appointmentType}</span>
                    </div>
                    {selectedDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span>{format(selectedDate, "PPP")}</span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time</span>
                        <span>{selectedTime}</span>
                      </div>
                    )}
                    {selectedDoctorData && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Consultation Fee</span>
                        <span className="font-semibold text-[#007E85]">₹{selectedDoctorData.consultationFee}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Amount</span>
                      <span className="text-[#007E85]">
                        ₹{selectedDoctorData?.consultationFee || 0}
                      </span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBookAppointment}
                    className="w-full h-12 text-lg bg-[#007E85] hover:bg-[#006670]"
                    disabled={!selectedDoctor || !selectedDate || !selectedTime || !patientName}
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Button>

                  <p className="text-xs text-gray-600 text-center">
                    By booking, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookAppointment;