import { motion } from "framer-motion";
import { Zap, Users, Award, Globe, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "../assets/buda bar 2.jpg";

export default function AboutPage() {
  const { t } = useTranslation();

  const whatWeDoItems = [
    {
      icon: <Zap />,
      text: t(
        "aboutPage.whatWeDo.startups",
        "Incubate and accelerate early-stage startups with funding, mentorship, and workspaces."
      ),
    },
    {
      icon: <Users />,
      text: t(
        "aboutPage.whatWeDo.bootcamps",
        "Host nationwide tech bootcamps, hackathons, and innovation challenges."
      ),
    },
    {
      icon: <Award />,
      text: t(
        "aboutPage.whatWeDo.partnerships",
        "Facilitate partnerships between government, universities, and the private sector."
      ),
    },
    {
      icon: <Globe />,
      text: t(
        "aboutPage.whatWeDo.stem",
        "Promote STEM education and digital skills training in schools and communities."
      ),
    },
    {
      icon: <Heart />,
      text: t(
        "aboutPage.whatWeDo.policy",
        "Drive policy and advocacy to support Ethiopia’s digital economy."
      ),
    },
  ];

  const coreValues = [
    {
      title: t("aboutPage.coreValues.inclusivity", "Inclusivity"),
      text: t(
        "aboutPage.coreValues.inclusivityDesc",
        "We ensure equal access to innovation support regardless of gender, age, background, or geography."
      ),
    },
    {
      title: t("aboutPage.coreValues.integrity", "Integrity"),
      text: t(
        "aboutPage.coreValues.integrityDesc",
        "We operate with full transparency, accountability, and ethical responsibility in all engagements."
      ),
    },
    {
      title: t("aboutPage.coreValues.collaboration", "Collaboration"),
      text: t(
        "aboutPage.coreValues.collaborationDesc",
        "We build bridges between government, academia, industry, and communities to scale innovation impact."
      ),
    },
  ];

  const nationalImpact = [
    {
      number: "5,000+",
      label: t("aboutPage.nationalImpact.innovators", "Innovators Reached"),
    },
    {
      number: "200+",
      label: t("aboutPage.nationalImpact.startups", "Startups Supported"),
    },
    {
      number: "50+",
      label: t("aboutPage.nationalImpact.programs", "National Programs Run"),
    },
  ];

  return (
    <main className="relative bg-[#f9fafa] text-[#253864] overflow-hidden">
      {/* Abstract shapes */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#255876]/20 rounded-full filter blur-3xl -z-10"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#f2b143]/15 rounded-full filter blur-2xl -z-10"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 140, ease: "linear" }}
      />

      <section className="relative z-10 h-screen flex items-center justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImage})`,
            }}
          />
          {/* Gradient Overlay (dark on right side for readability) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Hero Text Container fully on the right */}
        <div className="relative z-10 max-w-3xl px-6 md:px-16 text-left text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            {t("aboutPage.hero.title", "About Harar Innovation & Science")}
          </h1>
          <p className="text-xl max-w-2xl leading-relaxed">
            {t(
              "aboutPage.hero.description",
              "Harar Innovation & Technology Agency is a government-led platform dedicated to accelerating digital transformation, empowering local talent, and creating sustainable economic opportunities through technology and entrepreneurship."
            )}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-screen-xl mx-auto space-y-24 py-20 px-6 md:px-16">
        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}>
            <h2 className="text-3xl font-semibold text-[#255876] mb-4">
              {t("aboutPage.mission.title", "Our Mission")}
            </h2>
            <p className="text-[#253864] text-lg leading-relaxed">
              {t(
                "aboutPage.mission.description",
                "To unlock Ethiopia's innovation potential by nurturing tech-driven startups, fostering creative ecosystems, and enabling inclusive access to digital resources and opportunities across all regions."
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}>
            <h2 className="text-3xl font-semibold text-[#255876] mb-4">
              {t("aboutPage.vision.title", "Our Vision")}
            </h2>
            <p className="text-[#253864] text-lg leading-relaxed">
              {t(
                "aboutPage.vision.description",
                "We envision an Ethiopia where innovation is inclusive, technology is accessible, and every citizen — from urban entrepreneurs to rural youth — can contribute to and benefit from a digital future."
              )}
            </p>
          </motion.div>
        </section>

        {/* What We Do */}
        <section className="relative z-10">
          <h2 className="text-3xl font-semibold text-[#255876] mb-10 text-center">
            {t("aboutPage.whatWeDo.heading", "What We Do")}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {whatWeDoItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl flex items-start space-x-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-tr from-[#255876]/40 to-[#f2b143]/30 filter blur-3xl -z-10" />
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-tr from-[#255876] to-[#f2b143] text-white flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="text-[#253864] font-medium">{item.text}</p>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Core Values */}
        <section className="relative z-10">
          <h2 className="text-3xl font-semibold text-[#255876] mb-10 text-center">
            {t("aboutPage.coreValues.heading", "Our Core Values")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {coreValues.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold text-[#255876] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#253864]">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* National Impact */}
        <section className="text-center relative z-10">
          <h2 className="text-3xl font-semibold text-[#255876] mb-6">
            {t("aboutPage.nationalImpact.heading", "Our National Impact")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-[#255876] font-bold text-2xl">
            {nationalImpact.map((item, index) => (
              <div key={index}>
                <p>{item.number}</p>
                <span className="block text-sm text-[#253864] font-normal mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-tr from-[#255876] to-[#f2b143] py-16 rounded-3xl shadow-2xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("aboutPage.cta.heading", "Join Ethiopia’s Innovation Movement")}
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto mb-6">
            {t(
              "aboutPage.cta.description",
              "Whether you are an innovator, partner, educator, or policymaker — Harar Innovation & Science invites you to be part of our mission to empower the future of technology in Ethiopia."
            )}
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-[#FFA500] text-[#255876] font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:bg-[#f2b143] transition transform duration-300">
            {t("aboutPage.cta.button", "Contact Us")}
          </a>
        </section>
      </div>
    </main>
  );
}
