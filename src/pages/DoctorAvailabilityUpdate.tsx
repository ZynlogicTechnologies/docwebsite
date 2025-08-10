import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type BreakSlot = { start: string; end: string };

type AvailabilitySlot = {
  day: string;
  start?: string;
  end?: string;
  breaks: BreakSlot[];
  mode: "online" | "offline" | "hybrid" | "";
};

const DoctorAvailabilityUpdate: React.FC = () => {
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [consultationFee, setConsultationFee] = useState("");
  const [appointmentSlot, setAppointmentSlot] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExtraInfo = async () => {
      try {
        const res = await axios.get("https://landing.docapp.co.in/api/auth/get-user-data", {
          withCredentials: true,
        });
        const user = res.data.userData;

        if (Array.isArray(user.availability_schedule)) {
          const fetched = user.availability_schedule.map((item: any) => ({
            day: capitalize(item.day),
            start: item.loginTime || "09:00",
            end: item.logoutTime || "17:00",
            breaks: (item.breaks || []).map((br: string) => {
              const [start, end] = br.split("-");
              return { start, end };
            }),
            mode: item.mode || "",
          }));
          setAvailability(fetched);
        }

        setConsultationFee(user.consultation_fee?.toString() || "");
        setAppointmentSlot(user.appointment_slot?.toString() || "");
        setExperienceYears(user.experience_years?.toString() || "");
      } catch (err) {
        console.error(err);
        setMessage("Failed to load profile.");
      }
    };

    fetchExtraInfo();
  }, []);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const toggleDay = (day: string) => {
    const exists = availability.find((slot) => slot.day === day);
    if (exists) {
      setAvailability(availability.filter((slot) => slot.day !== day));
    } else {
      setAvailability([
        ...availability,
        { day, start: "09:00", end: "17:00", breaks: [], mode: "online" },
      ]);
    }
  };

  const updateTime = (day: string, field: "start" | "end", value: string) => {
    setAvailability((prev) =>
      prev.map((slot) =>
        slot.day === day ? { ...slot, [field]: value } : slot
      )
    );
  };

  const updateBreakTime = (day: string, index: number, field: "start" | "end", value: string) => {
    setAvailability((prev) =>
      prev.map((slot) => {
        if (slot.day === day) {
          const newBreaks = [...slot.breaks];
          newBreaks[index][field] = value;
          return { ...slot, breaks: newBreaks };
        }
        return slot;
      })
    );
  };

  const addBreak = (day: string) => {
    setAvailability((prev) =>
      prev.map((slot) =>
        slot.day === day
          ? { ...slot, breaks: [...slot.breaks, { start: "12:00", end: "12:30" }] }
          : slot
      )
    );
  };

  const removeBreak = (day: string, index: number) => {
    setAvailability((prev) =>
      prev.map((slot) => {
        if (slot.day === day) {
          const newBreaks = [...slot.breaks];
          newBreaks.splice(index, 1);
          return { ...slot, breaks: newBreaks };
        }
        return slot;
      })
    );
  };

  const updateMode = (day: string, mode: "online" | "offline" | "hybrid" | "") => {
    setAvailability((prev) =>
      prev.map((slot) =>
        slot.day === day ? { ...slot, mode } : slot
      )
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const finalAvailability = daysOfWeek.map((day) => {
        const slot = availability.find((s) => s.day === day);
        return slot
          ? {
              day: day.toLowerCase(),
              loginTime: slot.start || "09:00",
              logoutTime: slot.end || "17:00",
              breaks: slot.breaks.map((br) => `${br.start}-${br.end}`),
              mode: slot.mode || "",
            }
          : {
              day: day.toLowerCase(),
              loginTime: "09:00",
              logoutTime: "17:00",
              breaks: [],
              mode: "",
            };
      });

      await axios.put(
        "https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info",
        {
          availability_schedule: finalAvailability,
          consultation_fee: parseInt(consultationFee, 10),
          experience_years: parseInt(experienceYears, 10),
          appointment_slot: parseInt(appointmentSlot, 10),
        },
        {
          withCredentials: true,
        }
      );

      setMessage("Availability updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Set Doctor Availability</h2>

      {message && (
        <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded text-sm">{message}</div>
      )}

      <div className="space-y-4">
        <Label className="block text-sm font-semibold">Availability Schedule</Label>
        <div className="space-y-4">
          {daysOfWeek.map((day) => {
            const slot = availability.find((s) => s.day === day);
            return (
              <div key={day} className="border p-4 rounded space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <Switch checked={!!slot} onCheckedChange={() => toggleDay(day)} />
                  <span className="w-24 font-semibold">{day}</span>
                  <Input
                    type="time"
                    value={slot?.start || ""}
                    disabled={!slot}
                    onChange={(e) => updateTime(day, "start", e.target.value)}
                    className="w-28"
                  />
                  <Input
                    type="time"
                    value={slot?.end || ""}
                    disabled={!slot}
                    onChange={(e) => updateTime(day, "end", e.target.value)}
                    className="w-28"
                  />
                  <select
                    disabled={!slot}
                    value={slot?.mode || ""}
                    onChange={(e) =>
                      updateMode(day, e.target.value as "online" | "offline" | "hybrid" | "")
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Select Mode</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Breaks */}
                {slot && (
                  <div className="space-y-2 pl-10">
                    <Label>Breaks</Label>
                    {slot.breaks.map((br, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Input
                          type="time"
                          value={br.start}
                          onChange={(e) =>
                            updateBreakTime(day, i, "start", e.target.value)
                          }
                          className="w-28"
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          value={br.end}
                          onChange={(e) =>
                            updateBreakTime(day, i, "end", e.target.value)
                          }
                          className="w-28"
                        />
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => removeBreak(day, i)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => addBreak(day)}
                      className="mt-2"
                    >
                      Add Break
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <Label>Consultation Fee (₹)</Label>
          <Input
            type="number"
            value={consultationFee}
            onChange={(e) => setConsultationFee(e.target.value)}
          />
        </div>
        <div>
          <Label>Appointment Slot (Minutes)</Label>
          <Input
            type="number"
            value={appointmentSlot}
            onChange={(e) => setAppointmentSlot(e.target.value)}
          />
        </div>
        <div>
          <Label>Experience (Years)</Label>
          <Input
            type="number"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Save Availability Info"}
        </Button>
      </div>
    </div>
  );
};

export default DoctorAvailabilityUpdate;
