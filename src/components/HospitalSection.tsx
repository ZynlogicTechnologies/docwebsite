"use client";
import React from "react";
import CarouselCard from "@/components/ui/carousel-card";

const specialties = [
  {
    id: 1,
    imgUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=300&h=200&q=80",
    content: "Expert care for heart conditions.",
  },
  {
    id: 2,
    imgUrl: "https://images.unsplash.com/photo-1614181899754-8da567a7db63?auto=format&fit=crop&w=300&h=200&q=80",
    content: "Solutions for skin and hair issues.",
  },
  {
    id: 3,
    imgUrl: "https://images.unsplash.com/photo-1594882645120-7e87e5eaae27?auto=format&fit=crop&w=300&h=200&q=80",
    content: "Specialized care for children.",
  },
  {
    id: 4,
    imgUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&h=200&q=80",
    content: "Treatment for bone and joint health.",
  },
  {
    id: 5,
    imgUrl: "https://images.unsplash.com/photo-1584036561566-7d3c9a3c1e36?auto=format&fit=crop&w=300&h=200&q=80",
    content: "Care for nervous system disorders.",
  },
  {
    id: 6,
    imgUrl: "https://images.unsplash.com/photo-1592502963674-8da567a7db90?auto=format&fit=crop&w=300&h=200&q=80",
    content: "Expert eye care services.",
  },
];

const HospitalSection = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#007E85] mb-2 md:mb-0">
          Book an appointment for an in-clinic  <br></br>
          <span className="block text-[#007E85]/70 mt-1 text-base font-medium">
            consultation — Find experienced doctors across all specialties
          </span>
        </h2>
        <a href="/hospitals">
          <button className="text-[#007E85] hover:text-[#006A6F] text-sm font-semibold border border-[#007E85] px-4 py-2 rounded-md mt-2 md:mt-0">
            View all
          </button>
        </a>
      </div>

      <CarouselCard
        data={specialties}
        showCarousel={true}
        cardsPerView={3}
        autoScroll={true}
        scrollInterval={2500}
      />
    </div>
  );
};

export default HospitalSection;
