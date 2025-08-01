import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Video, Clock, Star, Calendar, Shield, MessageSquare, User, Search
} from "lucide-react";

interface SlotDay {
  date: string;
  day: string;
  mode: string;
  slots: { start: string; end: string }[];
}

interface Doctor {
  id: number;
  user_id: number;
  specialization: string;
  experience_years: number;
  consultation_fee: string;
  profile_picture: string;
  doctorSlots: {
    slots: string; // stringified JSON array
  };
  user: {
    username: string;
    address: { city: string }[];
  };
}

const VideoConsultation = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filtered, setFiltered] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("https://landing.docapp.co.in/api/filter/filter-doctors", {
          credentials: "include",
        });
        const data = await res.json();
        const docs: Doctor[] = data.doctors || [];

        // Parse slots and filter by available online/hybrid days
        const valid = docs.filter((d) => {
          try {
            const days: SlotDay[] = JSON.parse(d.user.doctorSlots.slots);
            return days.some(day =>
              ["online", "hybrid"].includes(day.mode) && day.slots.length > 0
            );
          } catch {
            return false;
          }
        });

        setDoctors(valid);
        setFiltered(valid);
      } catch (e) {
        console.error("Error fetching doctors:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = () => {
    setFiltered(doctors.filter(d =>
      d.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.user.username.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Hero + Search */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Video Consultation</h1>
          <br></br>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Connect with certified doctors from the comfort of your home.
          </p>
        </div>

        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-10 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name or speciality"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button
                  className="bg-[#007E85]"
                  onClick={handleSearch}
                >
                  <Video className="mr-2 h-4 w-4" /> Find Doctors
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Doctors */}
        <div>
          <h2 className="text-2xl font-bold text-[#007E85] text-center mb-8">
            Available Doctors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-500">No doctors found.</p>
            ) : (
              filtered.map((d) => {
                const days: SlotDay[] = JSON.parse(d.user.doctorSlots.slots);
                const next = days.find(day =>
                  ["online", "hybrid"].includes(day.mode) && day.slots.length > 0
                );
                return (
                  <Card key={d.id} className="border-[#007E85]/20 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden border border-[#007E85]/20">
                          <img
                            src={d.profile_picture}
                            alt={`Dr. ${d.user.username}`}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-[#007E85] text-lg">
                            Dr. {d.user.username}
                          </h3>
                          <p className="text-[#007E85]">{d.specialization}</p>
                          <p className="text-sm text-gray-600">
                            {d.experience_years} years experience
                          </p>
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1">{/* rating unknown */ "—"}</span>
                            {next && (
                              <Badge className="ml-3 bg-green-100 text-green-800 text-xs">
                                {next.mode === "hybrid" ? "Hybrid" : "Online"}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <br></br>
                          <p className="text-lg font-bold text-[#007E85]">
                            Consultation Fee
                            ₹{d.consultation_fee}
                          </p>
                          <br></br>
                          <Link to={`/doctor/${d.id}?mode=online`}>
                            <Button variant="outline" size="sm" className="w-full">
                              View Profile
                            </Button>
                          </Link>
                          <Link to={`/book-appointment?doctor=${d.id}&type=online_video`}>
                            {/* Booking button can go here if needed */}
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VideoConsultation;