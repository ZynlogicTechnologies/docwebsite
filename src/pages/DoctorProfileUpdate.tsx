import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const DoctorBasicProfile: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phone_number: "",
  });

  const [basicInfo, setBasicInfo] = useState({
    date_of_birth: "",
    gender: "",
    specialization: "",
    license_number: "",
    experience_years: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://landing.docapp.co.in/api/auth/get-user-data", {
          withCredentials: true,
        });

        const user = res.data.userData;

        setUserInfo({
          username: user.username || "",
          email: user.email || "",
          phone_number: user.phone_number || "",
        });

        setBasicInfo({
          date_of_birth: user.date_of_birth || "",
          gender: user.gender || "",
          specialization: user.specialization || "",
          license_number: user.license_number || "",
          experience_years: user.experience_years?.toString() || "",
        });
      } catch (err) {
        console.error(err);
        setMessage("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(
        "https://landing.docapp.co.in/api/auth/profile/complete/doctor",
        {
          ...basicInfo,
          experience_years: parseInt(basicInfo.experience_years),
        },
        { withCredentials: true }
      );
      setMessage("Basic profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Doctor Profile</h2>

      {message && (
        <div className="text-sm bg-blue-100 text-blue-800 px-3 py-2 rounded">
          {message}
        </div>
      )}

      {/* Readonly User Info */}
      <div className="grid gap-4">
        <div>
          <Label>Name</Label>
          <Input value={userInfo.username} disabled />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={userInfo.email} disabled />
        </div>
        <div>
          <Label>Phone Number</Label>
          <Input value={userInfo.phone_number} disabled />
        </div>
      </div>

      <hr className="my-4" />

      {/* Editable Basic Info */}
      <div className="grid gap-4">
        <div>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            value={basicInfo.date_of_birth}
            onChange={(e) => setBasicInfo({ ...basicInfo, date_of_birth: e.target.value })}
          />
        </div>

        <div>
          <Label>Gender</Label>
          <Input
            placeholder="Male / Female / Other"
            value={basicInfo.gender}
            onChange={(e) => setBasicInfo({ ...basicInfo, gender: e.target.value })}
          />
        </div>

        <div>
          <Label>Specialization</Label>
          <Input
            placeholder="e.g., Cardiologist"
            value={basicInfo.specialization}
            onChange={(e) => setBasicInfo({ ...basicInfo, specialization: e.target.value })}
          />
        </div>

        <div>
          <Label>License Number</Label>
          <Input
            value={basicInfo.license_number}
            onChange={(e) => setBasicInfo({ ...basicInfo, license_number: e.target.value })}
          />
        </div>

        <div>
          <Label>Experience (Years)</Label>
          <Input
            type="number"
            value={basicInfo.experience_years}
            onChange={(e) => setBasicInfo({ ...basicInfo, experience_years: e.target.value })}
          />
        </div>

        <Button onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update Basic Info"}
        </Button>
      </div>
    </div>
  );
};

export default DoctorBasicProfile;
