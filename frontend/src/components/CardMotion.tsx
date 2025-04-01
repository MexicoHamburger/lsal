import { motion } from "motion/react";
import { useState } from "react";

interface CardData {
  id: string;
  thumbnailUrl: string;
}

interface CardMotionProps {
  cards: CardData[];
}

export default function CardMotion({ cards }: CardMotionProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-[240px] h-[150px] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {cards.map((card, i) => {
        const reversedIndex = cards.length - 1 - i;
        return (
          <motion.div
            key={card.id}
            style={{
              backgroundImage: `url(${card.thumbnailUrl})`,
              backgroundSize: "90%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            className="absolute w-24 h-32 bg-gray-500 rounded-md shadow-lg border border-black"
            initial={false}
            animate={{
              x: hovered ? reversedIndex * 120 : i * 6,
              y: hovered ? 0 : -i * 4,
              rotate: hovered ? 0 : (i - 1) * 6,
              scale: hovered ? 1 : 1 - i * 0.02,
              zIndex: hovered ? 10 + i : i,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        );
      })}
    </div>
  );
}