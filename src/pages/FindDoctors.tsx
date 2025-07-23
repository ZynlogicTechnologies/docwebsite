// src/pages/FindDoctors.tsx
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Search, Filter as IconFilter, Star, MapPin, Award, Calendar, Video, Clock as IconClock
} from "lucide-react";

const FindDoctors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modeFilter, setModeFilter] = useState<"all" | "online" | "inclinic">("all");


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "https://landing.docapp.co.in/api/filter/filter-doctors",
          { withCredentials: true }
        );
        const docs = res.data.doctors.map((d: any) => ({
          ...d,
          availability_schedule: d.user?.doctorSlots?.slots
  ? JSON.parse(d.user.doctorSlots.slots)
  : []

        }));
        setDoctors(docs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const specialties = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.specialization).filter(Boolean))),
    [doctors]
  );
  const locations = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.user?.address?.[0]?.city).filter(Boolean))),
    [doctors]
  );

 const filteredDoctors = useMemo(() => {
  let arr = doctors.filter((d) => {
    const name = d.user?.username?.toLowerCase() || "";
    const spec = (d.specialization || "").toLowerCase();
    const city = d.user?.address?.[0]?.city || "";

    // Get available modes
    const availableModes = d.availability_schedule?.map((s: any) => s.mode) || [];

    // Hybrid match logic
    const matchesMode =
      modeFilter === "all" ||
      (modeFilter === "online" && (availableModes.includes("online") || availableModes.includes("hybrid"))) ||
      (modeFilter === "inclinic" && (availableModes.includes("offline") || availableModes.includes("hybrid")));

    return (
      (name.includes(searchQuery.toLowerCase()) || spec.includes(searchQuery.toLowerCase())) &&
      (selectedSpecialty === "all" || d.specialization === selectedSpecialty) &&
      (selectedLocation === "all" || city === selectedLocation) &&
      (!availableOnly || d.verified_status) &&
      matchesMode
    );
  });

  return arr.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.doctorRatings?.average || 0) - (a.doctorRatings?.average || 0);
      case "experience":
        return b.experience_years - a.experience_years;
      case "fee-low":
        return parseFloat(a.consultation_fee) - parseFloat(b.consultation_fee);
      case "fee-high":
        return parseFloat(b.consultation_fee) - parseFloat(a.consultation_fee);
      default:
        return 0;
    }
  });
}, [doctors, searchQuery, selectedSpecialty, selectedLocation, availableOnly, sortBy, modeFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#007E85]" />
            <Input
              placeholder="Search doctors by name or specialty..."
              className="pl-12 h-12 text-lg border-gray-300 focus-visible:ring-[#007E85]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="border-gray-300 focus:ring-[#007E85]"
            >
              <option value="all">All Specialties</option>
              {specialties.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border-gray-300 focus:ring-[#007E85]"
            >
              <option value="all">All Locations</option>
              {locations.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value as "all" | "online" | "inclinic")}
              className="border-gray-300 focus:ring-[#007E85]"
            >
              <option value="all">All Modes</option>
              <option value="online">Video Consultation</option>
              <option value="inclinic">In-Clinic</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-gray-300 focus:ring-[#007E85]"
            >
              <option value="rating">Highest Rated</option>
              <option value="experience">Most Experienced</option>
              <option value="fee-low">Fee: Low to High</option>
              <option value="fee-high">Fee: High to Low</option>
            </select>
           
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {filteredDoctors.length} Doctors Found
        </h1>

        {loading ? (
          <div className="text-center py-20 text-[#007E85] text-xl">Loading...</div>
        ) : (
          <div className="space-y-6">
            {filteredDoctors.map((d) => (
              <Card key={d.id} className="hover:shadow-lg border-gray-200">
                <CardContent className="flex flex-col lg:flex-row gap-6 p-6">
                  <img
                    src={d.profile_picture}
                    alt={d.user?.username}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold">{d.user?.username}</h3>
                    <p className="text-[#007E85]">{d.specialization}</p>
                    <p className="text-sm text-gray-600">{d.license_number}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <Award className="text-[#007E85] w-4 h-4" />
                      <span>{d.experience_years} yrs</span>
                      <Star className="fill-yellow-400 w-4 h-4" />
                      <span>{d.doctorRatings?.average || 4.5}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="text-[#007E85] w-4 h-4" />
                      <span>{d.user?.address?.[0]?.city}</span>
                    </div>
                  </div>
                  <div className="flex-1 lg:ml-auto lg:max-w-md space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Consultation Fee</span>
                        <span className="text-lg font-semibold text-[#007E85]">
                          ₹{d.consultation_fee}
                        </span>
                      </div>
                      <Badge
                        variant={d.verified_status ? "default" : "secondary"}
                        className={`text-xs ${d.verified_status ? "bg-[#007E85]" : ""}`}
                      >
                        {d.verified_status ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                  <Link to={`/doctor/${d.id}?mode=${modeFilter}`}>
  <Button variant="outline" className="text-[#007E85]">View Profile</Button>
</Link>

                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredDoctors.length === 0 && (
              <div className="text-center py-12 text-[#007E85]">
                No doctors found
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FindDoctors;
