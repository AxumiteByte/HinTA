import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-[#f9fafa] rounded-2xl overflow-hidden
                 shadow-[0_10px_25px_-5px_rgba(242,177,67,0.4)]
                 hover:shadow-[0_15px_30px_-10px_rgba(242,177,67,0.5)]
                 transition-shadow duration-300"
    >
      <div className="p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-[#255876]">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-[#255876] mb-6 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-[#f2b143] text-[#255876] font-bold rounded-lg 
                         shadow-md hover:bg-[#d5d8d9] hover:text-[#255876] focus:outline-none 
                         focus:ring-2 focus:ring-[#f2b143] transition duration-200"
              type="submit"
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-[#f2b143] rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-8 w-8 text-[#255876]" />
            </motion.div>
            <p className="text-[#255876] mb-6">
              If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-[#255876] flex justify-center rounded-b-2xl">
        <Link
          to={"/login"}
          className="text-sm text-[#f9fafa] hover:text-[#f2b143] flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>
    </motion.div>
  );
}

export default ForgotPasswordPage;
