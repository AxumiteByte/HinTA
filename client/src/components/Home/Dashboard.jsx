import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import { formatDate } from "../../utils/date";
import { LogOut, User, Mail, Calendar } from "lucide-react";

function Dashboard() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-72 sm:w-80 bg-[#f9fafa] rounded-xl overflow-hidden 
                 shadow-md border border-gray-200 mx-auto sm:mx-0 sm:mt-2">
      <div className="p-4 sm:p-5">
        {/* Profile */}
        <motion.div
          className="p-3 bg-white rounded-lg border border-gray-200 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-sm font-semibold text-[#255876] mb-1 flex items-center gap-2">
            <User size={16} className="text-[#f2b143]" /> Profile
          </h3>
          <p className="text-xs text-gray-700">
            <span className="font-medium">Name:</span> {user?.name || "User"}
          </p>
          <p className="text-xs text-gray-700 flex items-center gap-1">
            <Mail size={14} className="text-[#f2b143]" /> {user?.email}
          </p>
        </motion.div>

        {/* Account */}
        <motion.div
          className="p-3 bg-white rounded-lg border border-gray-200 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-sm font-semibold text-[#255876] mb-1 flex items-center gap-2">
            <Calendar size={16} className="text-[#f2b143]" /> Account
          </h3>
          <p className="text-xs text-gray-700">
            <span className="font-medium">Joined:</span>{" "}
            {new Date(user?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-xs text-gray-700">
            <span className="font-medium">Last Login:</span>{" "}
            {formatDate(user?.lastLogin)}
          </p>
        </motion.div>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 
                     bg-[#f2b143] text-[#255876] font-bold rounded-lg shadow 
                     hover:bg-[#d5d8d9] focus:outline-none focus:ring-2 focus:ring-[#f2b143] transition">
          <LogOut size={16} /> Logout
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Dashboard;
