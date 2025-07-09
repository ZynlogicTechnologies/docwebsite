import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Search, X } from "lucide-react";

const patients = [
  { id: "1", name: "Anita Sharma", age: 34, gender: "Female", lastVisit: "2025-06-15", status: "Active", condition: "Hypertension" },
  { id: "2", name: "Ravi Kumar", age: 45, gender: "Male", lastVisit: "2025-05-20", status: "Active", condition: "Diabetes" },
  { id: "3", name: "Priya Singh", age: 28, gender: "Female", lastVisit: "2025-04-10", status: "Inactive", condition: "Asthma" },
  { id: "4", name: "Vikram Patel", age: 60, gender: "Male", lastVisit: "2025-07-01", status: "Active", condition: "Arthritis" },
  { id: "5", name: "Neha Gupta", age: 19, gender: "Female", lastVisit: "2025-06-25", status: "Active", condition: "Allergies" },
  { id: "6", name: "Amit Verma", age: 52, gender: "Male", lastVisit: "2025-07-05", status: "Active", condition: "Heart Disease" },
];

const PatientsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    status: "Active",
    condition: "",
  });
  const [patientList, setPatientList] = useState(patients);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      id: String(patientList.length + 1),
      name: formData.name,
      age: parseInt(formData.age) || 0,
      gender: formData.gender,
      lastVisit: new Date().toISOString().split("T")[0], // Set to current date
      status: formData.status,
      condition: formData.condition,
    };
    setPatientList([...patientList, newPatient]);
    setFormData({ name: "", age: "", gender: "Male", status: "Active", condition: "" });
    setIsModalOpen(false);
  };

  const handleEditPatient = (id) => {
    const patient = patientList.find((p) => p.id === id);
    if (patient) {
      setFormData({
        name: patient.name,
        age: patient.age.toString(),
        gender: patient.gender,
        status: patient.status,
        condition: patient.condition,
      });
      setIsModalOpen(true);
    }
  };

  const handleDeletePatient = (id) => {
    setPatientList(patientList.filter((p) => p.id !== id));
  };

  return (
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="border-[#007E85]/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-[#007E85] text-lg sm:text-xl">Patient Management</CardTitle>
              <CardDescription className="text-gray-900/70 text-sm">View and manage patient records</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-48 md:w-64">
                <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search patients..."
                  className="pl-8 sm:pl-10 w-full border-[#007E85]/20 text-xs sm:text-sm"
                />
              </div>
              <Button
                className="bg-[#007E85] hover:bg-[#006A6F] text-white text-xs sm:text-sm px-2 sm:px-4"
                onClick={() => setIsModalOpen(true)}
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Add Patient
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {patientList.map((patient) => (
            <div
              key={patient.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg border border-[#007E85]/20"
            >
              <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarFallback className="bg-[#007E85] text-white text-xs sm:text-sm">
                    {patient.name.split(" ")[0]?.[0] || "P"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{patient.name}</h3>
                  <p className="text-sm text-gray-900">{patient.gender}, {patient.age} years</p>
                  <p className="text-xs text-gray-900/70">Last Visit: {patient.lastVisit}</p>
                  <p className="text-sm text-gray-900">Condition: {patient.condition}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-2">
                <div className="text-right">
                  <Badge className="bg-[#007E85]/10 text-[#007E85] text-xs">{patient.status}</Badge>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#007E85] border-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => handleEditPatient(patient.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-600/10 text-xs sm:text-sm px-2 sm:px-3"
                    onClick={() => handleDeletePatient(patient.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add/Edit Patient Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-[#007E85]">Add New Patient</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-[#007E85]" />
              </Button>
            </div>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Age</label>
                <Input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="30"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full border-[#007E85]/20 rounded-md p-2 text-xs sm:text-sm"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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
                <label className="text-xs sm:text-sm font-medium text-gray-900">Medical Condition</label>
                <Input
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  placeholder="Hypertension"
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

export default PatientsTab;