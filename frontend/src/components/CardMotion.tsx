import { motion } from "framer-motion";
import { useState } from "react";

interface CardData {
  id: string;
  thumbnailUrl: string;
}

interface CardMotionProps {
  cards: CardData[];
}

const MAX_VISIBLE = 3;

export default function CardMotion({ cards }: CardMotionProps) {
  const [hovered, setHovered] = useState(false);

  const baseX = (MAX_VISIBLE - 1) * 6;
  const baseY = -(MAX_VISIBLE - 1) * 4;
  const baseRotate = (MAX_VISIBLE - 2) * 6;
  const baseScale = 1 - (MAX_VISIBLE - 1) * 0.02;

  return (
    <div
      className="relative w-[240px] h-[150px] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {cards.map((card, i) => {
        const reversedIndex = cards.length - 1 - i;
        const visibleStart = cards.length - MAX_VISIBLE;
        const isStacked = !hovered && i < visibleStart;
        const stackIndex = i - visibleStart;

        const x = hovered
          ? reversedIndex * 120
          : isStacked
          ? baseX
          : stackIndex * 6;
        const y = hovered
          ? 0
          : isStacked
          ? baseY
          : -stackIndex * 4;
        const rotate = hovered
          ? 0
          : isStacked
          ? baseRotate
          : (stackIndex - 1) * 6;
        const scale = hovered
          ? 1
          : isStacked
          ? baseScale
          : 1 - stackIndex * 0.02;
        const zIndex = hovered ? 10 + i : i;

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
            animate={{ x, y, rotate, scale, zIndex }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        );
      })}
    </div>
  );
}
