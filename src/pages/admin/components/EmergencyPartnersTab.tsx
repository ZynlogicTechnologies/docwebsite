import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X, Search } from "lucide-react";

const initialEmergencyPartners = [
  {
    id: "1",
    name: "Apollo Emergency Services",
    contact: "+91 98765 43210",
    type: "Ambulance",
    status: "Active",
  },
  {
    id: "2",
    name: "Red Cross Rapid Response",
    contact: "+91 91234 56789",
    type: "Disaster Relief",
    status: "Active",
  },
  {
    id: "3",
    name: "CityCare Ambulance",
    contact: "+91 99887 76655",
    type: "Ambulance",
    status: "Temporarily Unavailable",
  },
];

const EmergencyPartnersTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    contact: "",
    type: "",
    status: "Active",
  });
  const [emergencyPartners, setEmergencyPartners] = useState(initialEmergencyPartners);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditPartner = (e) => {
    e.preventDefault();
    if (formData.id) {
      setEmergencyPartners(
        emergencyPartners.map((partner) =>
          partner.id === formData.id ? { ...formData } : partner
        )
      );
    } else {
      const newPartner = {
        id: String(emergencyPartners.length + 1),
        name: formData.name,
        contact: formData.contact,
        type: formData.type,
        status: formData.status,
      };
      setEmergencyPartners([...emergencyPartners, newPartner]);
    }
    setFormData({ id: "", name: "", contact: "", type: "", status: "Active" });
    setIsModalOpen(false);
  };

  const handleEditPartner = (id) => {
    const partner = emergencyPartners.find((item) => item.id === id);
    if (partner) {
      setFormData({
        id: partner.id,
        name: partner.name,
        contact: partner.contact,
        type: partner.type,
        status: partner.status,
      });
      setIsModalOpen(true);
    }
  };

  const handleDeletePartner = (id) => {
    setEmergencyPartners(emergencyPartners.filter((item) => item.id !== id));
  };

  return (
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="border-[#007E85]/20 w-full max-w-full">
        <CardHeader className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <div>
              <CardTitle className="text-[#007E85] text-lg sm:text-xl font-bold">
                Manage Emergency Partners
              </CardTitle>
              <CardDescription className="text-gray-900/70 text-sm">
                View and update emergency contacts, ambulance partners, and response units
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full sm:w-48 md:w-64">
                <Search className="absolute left-3 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search partners..."
                  className="pl-8 sm:pl-10 w-full border-[#007E85]/20 text-xs sm:text-sm"
                />
              </div>
              <Button
                className="bg-[#007E85] hover:bg-[#006A6F] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Add Partner
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4">
          {emergencyPartners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 rounded-lg border border-[#007E85]/20"
            >
              <div className="mb-2 sm:mb-0">
                <p className="text-sm sm:text-base font-medium text-gray-900">{partner.name}</p>
                <p className="text-xs text-gray-900/70">{partner.contact}</p>
                <p className="text-xs text-[#007E85]">{partner.type}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-2">
                <div className="text-right">
                  <Badge
                    className={
                      partner.status === "Active"
                        ? "bg-[#007E85]/10 text-[#007E85] text-xs"
                        : "bg-yellow-100 text-yellow-800 text-xs"
                    }
                  >
                    {partner.status}
                  </Badge>
                </div>
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#007E85] border-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5"
                    onClick={() => handleEditPartner(partner.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-600 hover:bg-red-600/10 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5"
                    onClick={() => handleDeletePartner(partner.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add/Edit Partner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-[#007E85]">
                {formData.id ? "Edit Partner" : "Add New Partner"}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-[#007E85]" />
              </Button>
            </div>
            <form onSubmit={handleAddOrEditPartner} className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Apollo Emergency Services"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Contact</label>
                <Input
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="border-[#007E85]/20 text-xs sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-900">Type</label>
                <Input
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="Ambulance"
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
                  <option value="Temporarily Unavailable">Temporarily Unavailable</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#007E85] border-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#007E85] hover:bg-[#006A6F] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5"
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

export default EmergencyPartnersTab;