import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HospitalSection = () => {
  const specialties = [
    {
      id: "1",
      name: "Cardiology",
      description: "Expert care for heart conditions.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&h=200&q=80"
    },
    {
      id: "2",
      name: "Dermatology",
      description: "Solutions for skin and hair issues.",
      image: "https://images.unsplash.com/photo-1614181899754-8da567a7db63?auto=format&fit=crop&w=300&h=200&q=80"
    },
    {
      id: "3",
      name: "Pediatrics",
      description: "Specialized care for children.",
      image: "https://images.unsplash.com/photo-1594882645120-7e87e5eaae27?auto=format&fit=crop&w=300&h=200&q=80"
    },
    {
      id: "4",
      name: "Orthopedics",
      description: "Treatment for bone and joint health.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&h=200&q=80"
    },
    {
      id: "5",
      name: "Neurology",
      description: "Care for nervous system disorders.",
      image: "https://images.unsplash.com/photo-1584036561566-7d3c9a3c1e36?auto=format&fit=crop&w=300&h=200&q=80"
    },
    {
      id: "6",
      name: "Ophthalmology",
      description: "Expert eye care services.",
      image: "https://images.unsplash.com/photo-1592502963674-8da567a7db90?auto=format&fit=crop&w=300&h=200&q=80"
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const scrollSpeed = 1; // Pixels per frame
    const intervalTime = 50; // Milliseconds between frames

    const autoScroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollWidth) {
        scrollPosition = 0; // Reset to start for seamless loop
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const interval = setInterval(autoScroll, intervalTime);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
  <h2 className="text-3xl lg:text-4xl font-bold text-practo-black mb-2 md:mb-0">
    Book an appointment for an in-clinic 
    <span className="block text-practo-black-600 mt-1 text-base font-medium">
      consultation — Find experienced doctors across all specialties
    </span>
  </h2>

  <Link to="/hospitals">
    <button className="text-sky-600 hover:text-sky-800 text-sm font-semibold border border-sky-600 px-4 py-2 rounded-md mt-2 md:mt-0">
      View all
    </button>
  </Link>
</div>

        <br></br>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth gap-4 pb-4 hide-scrollbar"
          style={{ scrollBehavior: "smooth", WebkitOverflowScrolling: "touch" }}
        >
          {specialties.map((specialty) => (
            <Link key={specialty.id} to="/hospitals" className="block min-w-[300px] flex-shrink-0">
              <Card
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-practo-light overflow-hidden"
              >
                <CardHeader className="p-0">
                  <img
                    src={specialty.image}
                    alt={specialty.name}
                    className="w-full h-40 object-cover rounded-t-lg transition-opacity hover:opacity-90"
                  />
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <CardTitle className="text-practo-navy text-lg font-semibold">{specialty.name}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm line-clamp-2">{specialty.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalSection;