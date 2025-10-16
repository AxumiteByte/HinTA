import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-[#f9fafa] rounded-2xl overflow-hidden
                 shadow-[0_10px_25px_-5px_rgba(242,177,67,0.4)]
                 hover:shadow-[0_15px_30px_-10px_rgba(242,177,67,0.5)]
                 transition-shadow duration-300">
      <div className="p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#255876]">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end mb-4">
            <Link
              to="/forgot-password"
              className="text-[#f2b143] text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-500 font-semibold">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-[#f2b143] text-[#255876] font-bold rounded-lg shadow-md hover:bg-[#d5d8d9] hover:text-[#255876] focus:outline-none focus:ring-2 focus:ring-[#f2b143] transition duration-200"
            type="submit"
            disabled={isLoading}>
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>

      <div className="px-8 py-4 bg-[#255876] flex justify-center rounded-b-2xl">
        <p className="text-sm text-[#f9fafa]">
          Don't have an account?{" "}
          <Link to="/signup" className="underline hover:text-[#f2b143]">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default LoginPage;
