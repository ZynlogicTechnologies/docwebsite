// components/ui/flip-card.tsx
import React from "react";
import { cn } from "@/lib/utils"; // Optional if using className merge helper

export const FlipCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("group [perspective:1000px] w-full h-full", className)}>
      <div className="relative w-full h-full duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {children}
      </div>
    </div>
  );
};

export const FlipCardFront = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)]", className)}>
      {children}
    </div>
  );
};

export const FlipCardBack = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]", className)}>
      {children}
    </div>
  );
};
