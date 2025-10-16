import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SecondHeroSection({ initialCards }) {
  const [cards, setCards] = useState(initialCards);
  const [activeCard, setActiveCard] = useState(0);

  const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5 },
    }),
  };

  const handleCardClick = (index) => {
    setActiveCard(index);
    setCards((prev) => {
      const newCards = [...prev];
      const [clickedCard] = newCards.splice(index, 1);
      newCards.push(clickedCard);
      return newCards;
    });
  };

  return (
    <section
      className="h-screen w-full relative snap-start flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${cards[activeCard]?.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      {/* Left: Text */}
      <div className="flex-1 text-left p-12 z-10 bg-black/40 rounded-xl max-w-2xl">
        {cards[activeCard] && (
          <>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
            >
              {cards[activeCard].title.split("").map((char, idx) => (
                <motion.span key={idx} custom={idx} variants={letterVariant}>
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-white text-lg leading-relaxed max-w-xl mb-6 break-words"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              dangerouslySetInnerHTML={{ __html: cards[activeCard].desc }}
            />

            <Link
              to={cards[activeCard].link}
              className="inline-block px-6 py-3 bg-[#02587d] text-white font-semibold rounded-xl shadow-md hover:bg-[#1c3f5a] transition text-sm sm:text-base"
            >
              {cards[activeCard].cta}
            </Link>
          </>
        )}
      </div>

      {/* Bottom-Right: Horizontal Cards */}
      <div className="absolute bottom-8 right-8 flex gap-4 pr-4 z-20">
        {cards.slice(0, 2).map((card, idx) => (
          <motion.div
            key={idx}
            className="flex-shrink-0 relative w-64 h-60 rounded-xl shadow-lg cursor-pointer overflow-hidden"
            onClick={() => handleCardClick(idx)}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold">{card.year}</h3>
              <h2 className="text-xl font-extrabold">{card.title}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
