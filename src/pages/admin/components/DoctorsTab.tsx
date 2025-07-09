import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Star, X } from "lucide-react";

const doctors = [
  { id: "1", name: "Dr. Sarah Johnson", speciality: "Cardiology", patients: 245, rating: 4.9, status: "Active", revenue: "₹45,680", experience: "15 years", qualifications: "MD, FACC" },
  { id: "2", name: "Dr. Michael Chen", speciality: "Neurology", patients: 180, rating: 4.7, status: "Active", revenue: "₹38,450", experience: "12 years", qualifications: "MD, PhD" },
  { id: "3", name: "Dr. Priya Sharma", speciality: "Pediatrics", patients: 300, rating: 4.8, status: "Inactive", revenue: "₹52,120", experience: "10 years", qualifications: "MBBS, DCH" },
  { id: "4", name: "Dr. David Patel", speciality: "Orthopedics", patients: 150, rating: 4.6, status: "Active", revenue: "₹41,230", experience: "8 years", qualifications: "MS, Ortho" },
  { id: "5", name: "Dr. Emily Gupta", speciality: "Dermatology", patients: 200, rating: 4.9, status: "Active", revenue: "₹47,890", experience: "14 years", qualifications: "MD, DDVL" },
  { id: "6", name: "Dr. Anil Kumar", speciality: "Ophthalmology", patients: 175, rating: 4.5, status: "Active", revenue: "₹39,500", experience: "11 years", qualifications: "MBBS, MS" },
];

const DoctorsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    status: "Active",
    experience: "",
    qualifications: "",
  });
  const [doctorList, setDoctorList] = useState(doctors);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const newDoctor = {
      id: String(doctorList.length + 1),
      name: formData.name,
      speciality: formData.speciality,
      patients: 0,
      rating: 0,
      status: formData.status,
      revenue: "₹0",
      experience: formData.experience,
      qualifications: formData.qualifications,
    };
    setDoctorList([...doctorList, newDoctor]);
    setFormData({ name: "", speciality: "", status: "Active", experience: "", qualifications: "" });
    setIsModalOpen(false);
  };

  const handleEditDoctor = (id) => {
    const doctor = doctorList.find((doc) => doc.id === id);
    if (doctor) {
      setFormData({
        name: doctor.name,
        speciality: doctor.speciality,
        status: doctor.status,
        experience: doctor.experience,
        qualifications: doctor.qualifications,
      });
      setIsModalOpen(true);
    }
  };

  const handleDeleteDoctor = (id) => {
    setDoctorList(doctorList.filter((doc) => doc.id !== id));
  };

  return (
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="border-[#007E85]/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-[#007E85] text-lg sm:text-xl">Doctor Management</CardTitle>
              <CardDescription className="text-[black]/70 text-sm">Manage doctors and their performance</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-48 md:w-64">
                <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search doctors..."
                  className="pl-8 sm:pl-10 w-full border-[#007E85]/20 text-xs sm:text-sm"
                />
              </div>
              <Button
                className="bg-[#007E85] hover:bg-[#006A6F] text-white text-xs sm:text-sm px-2 sm:px-4"
                onClick={() => setIsModalOpen(true)}
              >
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Add Doctor
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {doctorList.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border border-[#007E85]/20"
            >
              <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarFallback className="bg-[#007E85] text-white text-xs sm:text-sm">
                    {doc.name.split(" ")[1]?.[0] || "D"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{doc.name}</h3>
                  <p className="text-sm text-gray-900">{doc.speciality}</p>
                  <div className="flex text-xs sm:text-sm text-[black]/70 mt-1">
                    <Users className="h-3 w-3 mr-1" /> {doc.patients} patients
                    <Star className="h-3 w-3 ml-3 mr-1 fill-yellow-400 text-yellow-400" /> {doc.rating}
                  </div>
                  <p className="text-xs text-[black]/70 mt-1">Experience: {doc.experience}</p>
                  <p className="text-xs text-[black]/70">Qualifications: {doc.qualifications}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-2">
                <div className="text-right">
                  <p className="font-semibold text-[#007E85] text-sm sm:text-base">{doc.revenue}</p>
                  <Badge className="bg-[#007E85]/10 text-[#007E85] text-xs">{doc.status}</Badge>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#007E85] border-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => handleEditDoctor(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-600/10 text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => handleDeleteDoctor(doc.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add/Edit Doctor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-[#007E85]">Add New Doctor</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-[#007E85]" />
              </Button>
            </div>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Dr. John Doe"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Speciality</label>
                <Input
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleInputChange}
                  placeholder="Cardiology"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border-[#007E85]/20 rounded-md p-2 text-xs sm:text-sm"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Experience</label>
                <Input
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="10 years"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Qualifications</label>
                <Input
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  placeholder="MD, FACC"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#007E85] border-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-3"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#007E85] hover:bg-[#006A6F] text-white text-xs sm:text-sm px-2 sm:px-3"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsTab;