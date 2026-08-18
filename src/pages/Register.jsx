import React, { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { registerUser } from "../api/auth.api";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const hdlSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Password not match");
      return;
    }

    try {
      const data = await registerUser(username, email, password);

      const previousPath = location.state?.form;
      navigate(previousPath || "/login", { replace: true });

      console.log("data", data);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-black tracking-widest text-white">
              KHEUN <span className="text-yellow-500">LIFT</span>
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 mt-2">
              Build your strength. Prove your rank.
            </p>
          </div>

          {/* Register Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-2xl">
            <div className=" mb-6 sm:mb-7">
              <h2 className=" text-xl sm:text-2xl font-bold text-white">Create Account</h2>
              <p className="text-sm text-zinc-500 mt-1">
                Join the Kheun Lift community
              </p>
            </div>

            <form onSubmit={hdlSubmit} className="space-y-4 sm:space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Username
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                         pl-10 pr-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                          pl-10 pr-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                         pl-10 pr-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                         pl-10 pr-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-300
                       text-gray-900 font-bold py-3 rounded-lg
                       transition duration-200
                       shadow-lg shadow-red-950/30"
              >
                CREATE ACCOUNT
              </button>
            </form>

            {/* Login */}
            <p className="text-center text-sm text-zinc-400 mt-6">
              Already have an account?
              <Link
                to="/login"
                className="text-yellow-500 hover:text-yellow-200 font-semibold"
              >
                &nbsp; Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
