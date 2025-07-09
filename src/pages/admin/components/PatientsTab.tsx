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
      // For simplicity, editing updates the form but doesn't save changes yet
      // In a real app, you'd need to handle updating the patient list after form submission
    }
  };

  const handleDeletePatient = (id) => {
    setPatientList(patientList.filter((p) => p.id !== id));
  };

  return (
    <div className="relative">
      <Card className="border-[#007E85]/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#007E85]">Patient Management</CardTitle>
              <CardDescription className="text-[black]/70">View and manage patient records</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search patients..." className="pl-10 w-64 border-[#007E85]/20" />
              </div>
              <Button className="bg-[#007E85] hover:bg-[#006A6F] text-white" onClick={() => setIsModalOpen(true)}>
                <User className="h-4 w-4 mr-2" /> Add Patient
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patientList.map((patient) => (
              <div key={patient.id} className="flex justify-between p-4 rounded-lg border border-[#007E85]/20">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-[#007E85] text-white">
                      {patient.name.split(" ")[0]?.[0] || "P"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-[black]">{patient.gender}, {patient.age} years</p>
                    <p className="text-sm text-[black]/70">Last Visit: {patient.lastVisit}</p>
                    <p className="text-sm text-[black]-900">Condition: {patient.condition}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className="bg-[#007E85]/10 text-[#007E85]">{patient.status}</Badge>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#007E85] border-[#007E85] hover:bg-[#007E85]/10"
                      onClick={() => handleEditPatient(patient.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-600/10"
                      onClick={() => handleDeletePatient(patient.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Patient Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#007E85]">Add New Patient</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="h-5 w-5 text-[#007E85]" />
              </Button>
            </div>
            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#007E85]">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="border-[#007E85]/20"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#007E85]">Age</label>
                <Input
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="30"
                  className="border-[#007E85]/20"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#007E85]">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full border-[#007E85]/20 rounded-md p-2 text-sm"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[#007E85]">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border-[#007E85]/20 rounded-md p-2 text-sm"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-[#007E85]">Medical Condition</label>
                <Input
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  placeholder="Hypertension"
                  className="border-[#007E85]/20"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#007E85] border-[#007E85] hover:bg-[#007E85]/10"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#007E85] hover:bg-[#006A6F] text-white">
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