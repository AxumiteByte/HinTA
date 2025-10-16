import CallToAction from "./Home/CallToAction";
import Footer from "./Footer";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">{children}</main>

      {/* Wrapper: CTA overlaps footer */}
      <div className="relative">
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}
