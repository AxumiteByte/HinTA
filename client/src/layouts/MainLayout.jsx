import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

function MainLayout() {
  const { i18n } = useTranslation();

  // Determine the font class based on language
  const fontClass =
    i18n.language === "am" ? "font-notoEthiopic" : "font-poppins";

  return (
    <div className={`${fontClass} min-h-screen flex flex-col`}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
