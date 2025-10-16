import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#253864] text-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8 items-end">
        {/* Logo & Mission */}
        <div>
          <h2 className="text-2xl font-bold">HinT</h2>
          <p className="mt-4 text-sm text-white/80">{t("footer.mission")}</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-purple-300">{t("Home")}</Link></li>
            <li><Link to="/programs" className="hover:text-purple-300">{t("Programs")}</Link></li>
            <li><Link to="/events" className="hover:text-purple-300">{t("Events")}</Link></li>
            <li><Link to="/news" className="hover:text-purple-300">{t("News")}</Link></li>
            <li><Link to="/directorate" className="hover:text-purple-300">{t("Directorate")}</Link></li>
            <li><Link to="/about" className="hover:text-purple-300">{t("About")}</Link></li>
            <li><Link to="/contact" className="hover:text-purple-300">{t("Countact Us")}</Link></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">{t("footer.contact")}</h3>
          <p className="text-sm text-white/80">
            {t("footer.email")}: harariinovetiontechnologyagec@gmail.com
          </p>
          <p className="text-sm text-white/80 mt-1">
            {t("footer.phone")}: +251 93 434 6603
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="https://web.facebook.com/profile.php?id=100075949910571" className="hover:text-purple-300 text-sm">Facebook</a>
            <a href="#" className="hover:text-purple-300 text-sm">Twitter</a>
            <a href="#" className="hover:text-purple-300 text-sm">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="border-t border-purple-800 text-center text-sm py-6 text-white/80">
        © {year} HinT. {t("footer.rights")}
      </div>
    </footer>
  );
}

export default Footer;
