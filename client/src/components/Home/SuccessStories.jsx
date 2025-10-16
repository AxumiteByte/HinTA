import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/pagination";

export default function SuccessStories() {
  const { t } = useTranslation();

  const stories = [
    {
      text: t("successStories.story1.text"),
      author: t("successStories.story1.author"),
      img: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      text: t("successStories.story2.text"),
      author: t("successStories.story2.author"),
      img: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      text: t("successStories.story3.text"),
      author: t("successStories.story3.author"),
      img: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ];

  return (
    <section className="px-6 md:px-16 py-16 bg-white">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-10 text-[#02587d]">
          {t("successStories.heading")}
          <span className="block mx-auto mt-2 w-16 h-1 bg-[#FFA500] rounded"></span>
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10">
          {stories.map((story, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#f9fafa] border border-[#d5d8d9] p-6 rounded-2xl shadow-sm relative flex flex-col items-center">
                <motion.div
                  className="absolute -top-[-1] left-4 text-[#FFA500]"
                  initial={{ y: -5 }}
                  animate={{ y: 0 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1,
                  }}>
                  <Quote size={32} />
                </motion.div>

                <img
                  src={story.img}
                  alt={story.author}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#FFA500] mb-4"
                />

                <p className="italic text-lg text-[#333] leading-relaxed">
                  "{story.text}"
                </p>

                <footer className="mt-4 font-semibold text-[#02587d]">
                  — {story.author}
                </footer>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
