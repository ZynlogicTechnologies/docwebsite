import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Calendar, Award } from "lucide-react";
import { useAuth } from "@/AuthContext";


// Simulate user login status (replace with real auth check in production)
const isLoggedIn = () => {
  return localStorage.getItem("user_token") !== null;
};

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [doctor, setDoctor] = useState<any | null>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModeModal, setShowModeModal] = useState(false);
const [pendingPayload, setPendingPayload] = useState<any>(null);

  const searchParams = new URLSearchParams(location.search);
  const selectedMode = searchParams.get("mode");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch("https://landing.docapp.co.in/api/filter/filter-doctors", {
          credentials: "include",
        });
        const { doctors } = await res.json();
        const found = doctors.find((d: any) => String(d.id) === id);
        if (!found) throw new Error("Doctor not found");

        setDoctor(found);

        const slotRes = await fetch(
          `https://landing.docapp.co.in/api/auth/show-slots/${found.user_id}`,
          {
            credentials: "include",
          }
        );

        const slotData = await slotRes.json();
        const parsed = slotData?.slots?.[0]?.slots;
        if (parsed) {
          const parsedSlots = JSON.parse(parsed);
          setSlots(parsedSlots);
          if (parsedSlots.length > 0) {
            setSelectedDate(parsedSlots[0].date);
          }
        }
      } catch (error) {
        console.error("Error fetching doctor or slots:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDoctor();
  }, [id]);

  const availableDays = slots.filter((day: any) => {
    const mode = day.mode?.toLowerCase();
    if (!day.slots?.length) return false;

    if (selectedMode === "online") return ["online", "hybrid"].includes(mode);
    if (selectedMode === "inclinic") return ["offline", "hybrid"].includes(mode);

    return true;
  });
const handleBook = () => {
  if (!user) {
    toast.error("Please login first.");
    navigate("/auth");
    return;
  }

  if (!selectedSlot) {
    toast.error("Please select a slot.");
    return;
  }

  let finalMode = selectedMode;

  if (selectedMode === "all") {
    const selectedDay = slots.find((s: any) => s.date === selectedSlot.date);
    const dayMode = selectedDay?.mode?.toLowerCase();

    if (dayMode === "hybrid") {
      setShowModeModal(true);
      setPendingPayload({
        doctorId: doctor.user_id,
        doctorName: doctor.user?.username,
        slot: selectedSlot,
        doctor,
      });
      return;
    } else if (dayMode === "online") {
      finalMode = "online";
    } else if (dayMode === "offline") {
      finalMode = "inclinic";
    }
  }

  navigate("/book-appointment", {
    state: {
      doctorId: doctor.id,
      doctorName: doctor.user?.username,
      slot: selectedSlot,
      mode: finalMode,
      doctor,
    },
  });
};




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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Doctor Info */}
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
                  <h1 className="text-3xl font-bold">{doctor.user?.username}</h1>
                  <p className="text-xl text-[#007E85]">{doctor.specialization}</p>
                  <p className="text-gray-600">{doctor.qualification || doctor.license_number}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-[#007E85]" />
                      <span>{doctor.experience_years} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{doctor.doctorRatings?.average || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#007E85]" />
                      <span>{doctor.user?.address?.[0]?.city}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Card */}
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
                     <Button
                        className="w-full bg-[#007E85]"
                        disabled={!user || !selectedSlot}
                        onClick={handleBook}
                      >
                        <Calendar className="mr-2 h-4 w-4" /> Book Appointment
                      </Button>

                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="availability">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            {/* Availability */}
            <TabsContent value="availability">
              <Card>
                <CardHeader>
                  <CardTitle>Available Time Slots</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {availableDays.length === 0 ? (
                    <p>No slots available.</p>
                  ) : (
                    <>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {availableDays.map((day: any) => (
                          <Button
                            key={day.date}
                            variant={day.date === selectedDate ? "default" : "outline"}
                            className={`text-sm px-4 rounded-full ${
                              day.date === selectedDate
                                ? "bg-[#007E85] text-white"
                                : "border-[#007E85] text-[#007E85]"
                            }`}
                            onClick={() => {
                              setSelectedDate(day.date);
                              setSelectedSlot(null);
                            }}
                          >
                            <div className="flex flex-col items-center">
                              <span className="capitalize">{day.day}</span>
                              <span className="text-xs">{day.date}</span>
                            </div>
                          </Button>
                        ))}
                      </div>

                      {/* Time Slots */}
                      {availableDays
                        .filter((d: any) => d.date === selectedDate)
                        .map((day: any) => (
                          <div key={day.date} className="grid grid-cols-3 md:grid-cols-6 gap-2">
                            {day.slots.map((slot: any) => {
                              const isSelected =
                                selectedSlot &&
                                selectedSlot.date === day.date &&
                                selectedSlot.start === slot.start;

                              return (
                                <Button
                                  key={slot.start}
                                  variant={isSelected ? "default" : "outline"}
                                  size="sm"
                                  className={`text-xs ${
                                    isSelected ? "bg-[#007E85] text-white" : ""
                                  }`}
                                  onClick={() =>
                                    setSelectedSlot({ ...slot, date: day.date, day: day.day })
                                  }
                                >
                                  {slot.start} - {slot.end}
                                </Button>
                              );
                            })}
                          </div>
                        ))}
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            {showModeModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
    <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl">
      <h2 className="text-lg font-bold text-green-700 mb-4 text-center">
        Choose Consultation Mode
      </h2>

      <div className="flex flex-col space-y-3">
        <button
          onClick={() => {
            setShowModeModal(false);
            navigate("/book-appointment", {
              state: { ...pendingPayload, mode: "online" },
            });
          }}
          className="bg-green-600 text-white py-2 rounded-xl"
        >
          Online
        </button>
        <button
          onClick={() => {
            setShowModeModal(false);
            navigate("/book-appointment", {
              state: { ...pendingPayload, mode: "inclinic" },
            });
          }}
          className="bg-green-800 text-white py-2 rounded-xl"
        >
          In-Clinic
        </button>
        <button
          onClick={() => setShowModeModal(false)}
          className="text-gray-500 text-sm underline text-center mt-1"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


            {/* About */}
            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Dr. {doctor.user?.username}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <strong>Specialization:</strong> {doctor.specialization}
                    </li>
                    <li>
                      <strong>Appointment Duration:</strong> {doctor.appointment_time} mins
                    </li>
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
