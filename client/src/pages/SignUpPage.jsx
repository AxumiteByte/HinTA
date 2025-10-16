import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-[#f9fafa] rounded-2xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(242,177,67,0.4)] hover:shadow-[0_15px_30px_-10px_rgba(242,177,67,0.5)] transition-shadow duration-300"
    >
      <div className="p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#255876]">
          Create Account
        </h2>

        <form onSubmit={handleSignUp} className="space-y-4">
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <PasswordStrengthMeter password={password} />
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-[#f2b143] text-[#255876] font-bold rounded-lg 
                        shadow-md hover:bg-[#d5d8d9] hover:text-[#255876] focus:outline-none 
                        focus:ring-2 focus:ring-[#f2b143] transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-[#255876] flex justify-center rounded-b-2xl">
        <p className="text-sm text-[#f9fafa]">
          Already have an account?{" "}
          <Link to={"/login"} className="underline hover:text-[#f2b143]">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default SignUpPage;
