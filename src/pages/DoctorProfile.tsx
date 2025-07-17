import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Calendar, Award, Video } from "lucide-react";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<any | null>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorAndSlots = async () => {
      try {
        const res = await fetch("https://landing.docapp.co.in/api/filter/filter-doctors", {
          credentials: "include",
        });
        const { doctors } = await res.json();
        const found = doctors.find((d: any) => String(d.id) === id);
        if (!found) throw new Error("Doctor not found");

        setDoctor(found);

        const slotRes = await fetch(
          `https://landing.docapp.co.in/api/auth/show-slots?doctor_id=${found.user_id}`,
          {
            credentials: "include",
          }
        );

        const slotData = await slotRes.json();
        const parsedSlots = JSON.parse(slotData?.slots?.[0]?.slots || "[]");
        setSlots(parsedSlots);
      } catch (error) {
        console.error("Error fetching doctor or slots:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDoctorAndSlots();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Doctor Not Found</h2>
          <Link to="/find-doctors">
            <Button className="bg-[#007E85] hover:bg-[#006A6F]">Browse All Doctors</Button>
          </Link>
        </div>
      </div>
    );
  }

  const availableDays = slots.filter((day: any) => day.slots.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex flex-col items-center lg:items-start">
                  <img
                    src={doctor.profile_picture}
                    alt={doctor.user?.username}
                    className="w-32 h-32 rounded-2xl object-cover mb-4"
                  />
                  <Badge className="bg-[#007E85]">
                    {doctor.verified_status ? "Verified" : "Unverified"}
                  </Badge>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{doctor.user?.username}</h1>
                    <p className="text-xl text-[#007E85] font-semibold mb-2">{doctor.specialization}</p>
                    <p className="text-gray-600">{doctor.qualification || doctor.license_number}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-[#007E85]" />
                      <span>{doctor.experience_years} years experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{doctor.doctorRatings?.average || "N/A"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-[#007E85]" />
                      <span>{doctor.user?.address?.[0]?.city}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-80">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center">Book Consultation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#007E85]">
                          ₹{doctor.consultation_fee}
                        </div>
                        <div className="text-sm text-gray-600">Consultation Fee</div>
                      </div>
                      <div className="space-y-2">
                        <Button
                          className="w-full bg-[#007E85] hover:bg-[#006A6F]"
                          onClick={() => navigate(`/book-appointment?doctor=${doctor.id}&type=online_video`)}
                        >
                          <Calendar className="mr-2 h-4 w-4" /> Book Appointment
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Video className="mr-2 h-4 w-4" /> Video Consultation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="availability" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="availability">
              <Card>
                <CardHeader>
                  <CardTitle>Available Time Slots</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {availableDays.map((day: any) => (
                    <div key={day.date}>
                      <h3 className="font-medium mb-3">{day.day}, {day.date}</h3>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {day.slots.map((slot: any) => (
                          <Button
                            key={slot.start}
                            variant="outline"
                            size="sm"
                            className="text-xs cursor-not-allowed"
                            disabled
                          >
                            {slot.start} - {slot.end}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Dr. {doctor.user?.username}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Specialization:</strong> {doctor.specialization}</li>
                    <li><strong>License:</strong> {doctor.license_number}</li>
                    <li><strong>Appointment Duration:</strong> {doctor.appointment_time} mins</li>
                  </ul>
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
