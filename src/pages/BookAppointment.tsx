import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";

const BookAppointment = () => {
  const { toast } = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get("doctor");
  const type = queryParams.get("type") || "online_video";

  const [slots, setSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<{ start: string; end: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch("https://landing.docapp.co.in/api/auth/show-slots", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        const allSlots = data?.slots || [];
        const doctorSlot = allSlots.find((s: any) => String(s.doctor_id) === String(doctorId));
        const parsed = doctorSlot?.slots ? JSON.parse(doctorSlot.slots) : [];
        setSlots(parsed);
      } catch (err) {
        console.error("Failed to fetch slots", err);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) fetchSlots();
  }, [doctorId]);

  const handleBook = async () => {
    if (!doctorId || !selectedDate || !selectedTime) {
      toast({ title: "Select a slot before booking", variant: "destructive" });
      return;
    }

    try {
      const res = await fetch("http://3.108.233.123:5000/api/appointment/create-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor_id: doctorId,
          date: selectedDate,
          start: selectedTime.start,
          end: selectedTime.end,
          type: type,
        }),
      });

      if (!res.ok) throw new Error("Failed to book");

      toast({
        title: "Appointment Booked!",
        description: `Your appointment is confirmed for ${selectedDate} at ${selectedTime.start}`,
      });

      setSelectedDate("");
      setSelectedTime(null);
    } catch (err) {
      toast({ title: "Booking failed", description: "Try again", variant: "destructive" });
      console.error(err);
    }
  };

  const availableDates = slots.filter((day: any) => day.slots.length > 0);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Select a Slot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {availableDates.map((day: any) => (
              <div key={day.date}>
                <h3 className="font-medium mb-2">{day.day}, {day.date}</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {day.slots.map((slot: any) => (
                    <Button
                      key={slot.start}
                      variant={
                        selectedDate === day.date && selectedTime?.start === slot.start
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedTime({ start: slot.start, end: slot.end });
                      }}
                    >
                      {slot.start} - {slot.end}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            <Button
              onClick={handleBook}
              className="w-full bg-[#007E85] hover:bg-[#006670]"
              disabled={!selectedDate || !selectedTime}
            >
              Confirm Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default BookAppointment;
