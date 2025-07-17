import { useState, useEffect, useRef } from "react";

interface CardData {
  id: number;
  imgUrl: string;
  content: string;
}

interface CardProps {
  data: CardData[];
  showCarousel?: boolean;
  cardsPerView?: number;
  autoScroll?: boolean;
  scrollInterval?: number;
}

const CarouselCard = ({
  data,
  showCarousel = true,
  cardsPerView = 3,
  autoScroll = true,
  scrollInterval = 3000,
}: CardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cardWidth = 75 / cardsPerView;

  const nextSlide = () => {
    if (!showCarousel || data.length <= cardsPerView) return;

    const nextIndex = (currentIndex + 1) % data.length;

    if (containerRef.current) {
      containerRef.current.style.transition = "transform 500ms ease";
      containerRef.current.style.transform = `translateX(-${cardWidth}%)`;

      setTimeout(() => {
        setCurrentIndex(nextIndex);
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          containerRef.current.style.transform = "translateX(0)";
          void containerRef.current.offsetWidth;
        }
      }, 500);
    }
  };

  const startAutoScroll = () => {
    if (autoScroll && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (!isHovered) {
          nextSlide();
        }
      }, scrollInterval);
    }
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, [autoScroll, currentIndex, isHovered]);

  const getVisibleCards = () => {
    const visibleCards = [];
    for (let i = 0; i < cardsPerView + 1; i++) {
      const index = (currentIndex + i) % data.length;
      visibleCards.push(data[index]);
    }
    return visibleCards;
  };

  if (!data || data.length === 0) {
    return <div>No card data available</div>;
  }

  return (
    <div
      className="w-full px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div
            ref={containerRef}
            className="flex"
            style={{
              transform: "translateX(0)",
              width: `${(cardsPerView + 1) * 100 / cardsPerView}%`,
            }}
          >
            {getVisibleCards().map((card, idx) => (
              <div
                key={`card-${currentIndex}-${idx}`}
                style={{
                  width: `${100 / (cardsPerView + 1)}%`,
                }}
                className="px-2"
              >
               <div className="relative overflow-hidden rounded-2xl border border-[#C4E1DB] shadow-md group h-full">
  <div className="w-full h-64">
    <img
      src={card.imgUrl}
      alt={`Card ${card.id}`}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>
  <div className="absolute inset-0 bg-[#E6F4F1]/70 text-[#007E85] p-4 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 overflow-y-auto">
  <p className="text-sm font-medium leading-relaxed">{card.content}</p>
</div>
</div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;