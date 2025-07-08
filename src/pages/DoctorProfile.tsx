
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Star,
  MapPin,
  Calendar,
  Award,
  Clock,
  Video,
  Phone,
  Languages,
  GraduationCap,
  Building,
  Users,
  CheckCircle
} from "lucide-react";
import { mockDoctors } from "@/data/mockData";

const DoctorProfile = () => {
  const { id } = useParams();
  const doctor = mockDoctors.find(doc => doc.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Not Found</h2>
          <p className="text-gray-600 mb-4">The doctor you're looking for doesn't exist.</p>
          <Link to="/find-doctors">
            <Button>Browse All Doctors</Button>
          </Link>
        </div>
      </div>
    );
  }

  const reviews = [
    {
      id: 1,
      name: "Sarah Wilson",
      rating: 5,
      date: "2024-07-05",
      comment: "Excellent doctor! Very thorough examination and clear explanations. Highly recommended."
    },
    {
      id: 2,
      name: "John Davis",
      rating: 5,
      date: "2024-07-03",
      comment: "Dr. Johnson is very professional and caring. The consultation was very helpful."
    },
    {
      id: 3,
      name: "Emily Chen",
      rating: 4,
      date: "2024-07-01",
      comment: "Good experience overall. The doctor was knowledgeable and answered all my questions."
    }
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Doctor Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex flex-col items-center lg:items-start">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-32 h-32 rounded-2xl object-cover mb-4"
                  />
                  <Badge 
                    variant={doctor.available ? "default" : "secondary"}
                    className="text-sm"
                  >
                    {doctor.available ? "Available Now" : "Currently Busy"}
                  </Badge>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {doctor.name}
                    </h1>
                    <p className="text-xl text-primary font-semibold mb-2">
                      {doctor.specialty}
                    </p>
                    <p className="text-gray-600">{doctor.qualification}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span>{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{doctor.rating} ({doctor.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{doctor.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Languages className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      Speaks: {doctor.languages.join(", ")}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-primary" />
                    <span className="text-sm">{doctor.hospital}</span>
                  </div>
                </div>

                <div className="lg:w-80">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center">Book Consultation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          ₹{doctor.consultationFee}
                        </div>
                        <div className="text-sm text-gray-600">Consultation Fee</div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Next Available:</div>
                        <div className="text-sm text-primary font-semibold">
                          {doctor.nextSlot}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Link to={`/book-appointment?doctor=${doctor.id}`}>
                          <Button className="w-full">
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Appointment
                          </Button>
                        </Link>
                        <Button variant="outline" className="w-full">
                          <Video className="mr-2 h-4 w-4" />
                          Video Consultation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Details Tabs */}
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Dr. {doctor.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">
                    {doctor.about}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Education & Qualifications
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-3 w-3 text-green-500" />
                          {doctor.qualification}
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-3 w-3 text-green-500" />
                          Board Certified {doctor.specialty}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Building className="mr-2 h-4 w-4" />
                        Practice Information
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li><strong>Hospital:</strong> {doctor.hospital}</li>
                        <li><strong>Location:</strong> {doctor.location}</li>
                        <li><strong>Experience:</strong> {doctor.experience} years</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability">
              <Card>
                <CardHeader>
                  <CardTitle>Available Time Slots</CardTitle>
                  <CardDescription>
                    Select a time slot to book your appointment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Today - July 8, 2024</h3>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {timeSlots.slice(0, 8).map(time => (
                          <Button
                            key={time}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Tomorrow - July 9, 2024</h3>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {timeSlots.map(time => (
                          <Button
                            key={time}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Patient Reviews</span>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{doctor.rating}</span>
                      <span className="text-gray-600">({doctor.reviews} reviews)</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Rating Breakdown */}
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center space-x-3">
                          <span className="text-sm w-3">{rating}</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <Progress 
                            value={rating === 5 ? 80 : rating === 4 ? 15 : 5} 
                            className="flex-1 h-2"
                          />
                          <span className="text-sm text-gray-600 w-8">
                            {rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {reviews.map(review => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{review.name}</h4>
                              <div className="flex items-center space-x-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-600">{review.date}</span>
                          </div>
                          <p className="text-gray-700 text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold">Senior {doctor.specialty}</h3>
                      <p className="text-sm text-gray-600">{doctor.hospital} • 2018 - Present</p>
                      <p className="text-sm text-gray-700 mt-2">
                        Leading the cardiology department and specializing in interventional procedures.
                      </p>
                    </div>

                    <div className="border-l-4 border-gray-300 pl-4">
                      <h3 className="font-semibold">Associate {doctor.specialty}</h3>
                      <p className="text-sm text-gray-600">Metro General Hospital • 2015 - 2018</p>
                      <p className="text-sm text-gray-700 mt-2">
                        Provided comprehensive cardiac care and performed diagnostic procedures.
                      </p>
                    </div>

                    <div className="border-l-4 border-gray-300 pl-4">
                      <h3 className="font-semibold">Resident Doctor</h3>
                      <p className="text-sm text-gray-600">Medical College Hospital • 2012 - 2015</p>
                      <p className="text-sm text-gray-700 mt-2">
                        Completed residency training in internal medicine and cardiology.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Preventive Cardiology</Badge>
                      <Badge variant="outline">Interventional Procedures</Badge>
                      <Badge variant="outline">Heart Disease Management</Badge>
                      <Badge variant="outline">Cardiac Rehabilitation</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoctorProfile;
