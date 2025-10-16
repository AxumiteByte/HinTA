import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-48 bg-[#255876] text-[#f9fafa] flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-[#1b2a45]">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { name: "Programs", path: "/admin/programs" },
            { name: "Events", path: "/admin/events" },
            { name: "News", path: "/admin/news" },
            { name: "Directorate", path: "/admin/directorate" },
            { name: "Jobs", path: "/admin/jobs" },
            { name: "Applicants", path: "/admin/applications" },
            { name: "Home", path: "/" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-[#f2b143] text-[#253864]"
                    : "hover:bg-[#1f2f50] text-white"
                }`
              }>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#f8fafc] text-[#253864] p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
