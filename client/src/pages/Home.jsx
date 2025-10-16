import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/Home/HeroSection";
import AboutSection from "../components/Home/AboutSection";
import ProgramsSection from "../components/Home/ProgramSection";
import EventsSection from "../components/Home/EventsSection";
import SuccessStories from "../components/Home/SuccessStories";
import NewsSection from "../components/Home/NewsSection";
import CallToAction from "../components/Home/CallToAction";
import PartnersSection from "../components/Home/PartnersSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col  w-full">
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <EventsSection />
      <SuccessStories />
      <NewsSection />
      <PartnersSection />
      <CallToAction />
    </div>
  );
}
