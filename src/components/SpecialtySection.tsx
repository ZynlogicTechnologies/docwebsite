import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const healthConcerns = [
  {
    title: "Period doubts or Pregnancy",
    img: "/icons/period.png",
  },
  {
    title: "Acne, pimple or skin issues",
    img: "/icons/skin.png",
  },
  {
    title: "Performance issues in bed",
    img: "/icons/performance.png",
  },
  {
    title: "Cold, cough or fever",
    img: "/icons/cough.png",
  },
  {
    title: "Child not feeling well",
    img: "/icons/child.png",
  },
  {
    title: "Depression or anxiety",
    img: "/icons/depression.png",
  },
];

const ConsultSection = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-br from-practo-light/80 via-white to-practo-sky/10">
      <div className="container mx-auto w-full">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-10 px-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-practo-navy text-left">
              Consult top doctors online for any health concern
            </h2>
            <p className="text-gray-600 mt-2 text-left">
              Private online consultations with verified doctors in all specialties
            </p>
          </div>
          <Link to="/specialties">
            <Button variant="outline" className="text-practo-sky border-practo-sky hover:bg-practo-sky/10">
              View All Specialties
            </Button>
          </Link>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 px-4">
          {healthConcerns.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-all hover:shadow-lg">
                <img src={item.img} alt={item.title} className="w-24 h-24 object-contain" />
              </div>
              <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.title}</p>
              <Link
                to={`/find-doctors?concern=${encodeURIComponent(item.title.toLowerCase().replace(/\s+/g, '-'))}`}
                className="text-practo-sky text-xs font-semibold mt-2 block hover:underline"
              >
                CONSULT NOW
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultSection;