import { motion } from "framer-motion";
import { Lightbulb, Cpu, Rocket, Users } from "lucide-react";

export default function InnovationServicePage() {
  const services = [
    {
      title: "Research & Development",
      description:
        "Driving future-ready solutions through applied research, prototyping, and next-gen product development.",
      icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
    },
    {
      title: "Digital Transformation",
      description:
        "Helping organizations modernize with cloud, AI, and digital tools that maximize efficiency and impact.",
      icon: <Cpu className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "Startup Incubation",
      description:
        "Supporting entrepreneurs with mentorship, funding access, and acceleration programs to scale innovation fast.",
      icon: <Rocket className="w-12 h-12 text-red-500" />,
    },
    {
      title: "Collaboration & Networking",
      description:
        "Building strong innovation ecosystems by connecting academia, industry, and policymakers.",
      icon: <Users className="w-12 h-12 text-green-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-24 px-6 lg:px-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold text-[#255876] mb-4">
          Innovation & Technology Services
        </h1>
        <p className="text-lg text-gray-600">
          Empowering society through research, innovation, and technology-driven
          solutions for a sustainable future.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 flex flex-col items-center text-center">
            {service.icon}
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              {service.title}
            </h3>
            <p className="mt-2 text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Call To Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ready to innovate with us?
        </h2>
        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:opacity-90 transition">
          Get in Touch
        </button>
      </motion.div>
    </div>
  );
}
