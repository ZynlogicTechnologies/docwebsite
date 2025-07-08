
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter,
  Star,
  MapPin,
  Calendar,
  Video,
  Clock,
  Award
} from "lucide-react";
import { mockDoctors } from "@/data/mockData";

const FindDoctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("rating");

  const specialties = [
    "Cardiologist",
    "Dermatologist", 
    "Pediatrician",
    "Orthopedic Surgeon",
    "Neurologist",
    "Gynecologist"
  ];

  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Miami, FL",
    "Boston, MA"
  ];

  const filteredDoctors = useMemo(() => {
    let filtered = mockDoctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
      const matchesLocation = selectedLocation === "all" || doctor.location === selectedLocation;
      const matchesAvailability = !availableOnly || doctor.available;
      
      return matchesSearch && matchesSpecialty && matchesLocation && matchesAvailability;
    });

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return b.experience - a.experience;
        case "fee-low":
          return a.consultationFee - b.consultationFee;
        case "fee-high":
          return b.consultationFee - a.consultationFee;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedSpecialty, selectedLocation, availableOnly, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search doctors by name or specialty..."
                className="pl-12 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                  <SelectItem value="fee-low">Fee: Low to High</SelectItem>
                  <SelectItem value="fee-high">Fee: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={availableOnly}
                  onCheckedChange={(checked) => setAvailableOnly(checked as boolean)}
                />
                <label
                  htmlFor="available"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Available only
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {filteredDoctors.length} Doctors Found
          </h1>
          <div className="text-sm text-gray-600">
            Showing results for "{searchQuery || 'all doctors'}"
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="space-y-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Doctor Image and Basic Info */}
                  <div className="flex items-start space-x-4">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {doctor.name}
                      </h3>
                      <p className="text-primary font-medium">{doctor.specialty}</p>
                      <p className="text-sm text-gray-600">{doctor.qualification}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4" />
                          <span>{doctor.experience} years exp</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{doctor.rating} ({doctor.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{doctor.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details and Actions */}
                  <div className="flex-1 lg:ml-auto lg:max-w-md space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Consultation Fee</span>
                        <span className="text-lg font-semibold text-primary">
                          ₹{doctor.consultationFee}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Next Available</span>
                        <span className="text-sm font-medium">
                          {doctor.nextSlot}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={doctor.available ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {doctor.available ? "Available" : "Busy"}
                        </Badge>
                        {doctor.languages.map(lang => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link to={`/doctor/${doctor.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                      <Link to="/book-appointment" className="flex-1">
                        <Button className="w-full">
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Now
                        </Button>
                      </Link>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <Video className="mr-2 h-4 w-4" />
                        Video Call
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Clock className="mr-2 h-4 w-4" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FindDoctors;
