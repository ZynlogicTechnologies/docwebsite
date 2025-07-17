// components/ui/MenuVertical.tsx
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export type MenuItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

interface MenuVerticalProps {
  title?: string;
  menuItems: MenuItem[];
  color?: string;
}

export const MenuVertical = ({
  title = "Menu",
  menuItems,
  color = "#007E85",
}: MenuVerticalProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 font-semibold px-4 py-2 rounded-md border transition"
        style={{
          color,
          borderColor: `${color}50`,
        }}
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-md z-50"
        >
          <div className="flex flex-col">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  onClick={() => {
                    setOpen(false);
                    if (item.onClick) item.onClick();
                  }}
                  className="group flex items-center px-4 py-2 transition-all cursor-pointer hover:bg-[#007E85]/10"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mr-3 text-gray-500 group-hover:text-[#007E85]"
                  >
                    <ArrowRight size={16} />
                  </motion.div>

                  {item.href ? (
                    <Link
                      to={item.href}
                      className="w-full text-sm font-medium text-gray-700 group-hover:text-[#007E85] transition"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="w-full text-sm font-medium text-gray-700 group-hover:text-[#007E85] transition">
                      {item.label}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
