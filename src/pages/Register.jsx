import React, { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { apiRegister } from "../api/mainApi";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const hdlSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData);

    if (body.password !== body.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { confirmPassword, ...registerBody } = body;

    try {
      await apiRegister(registerBody);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(
        err.response?.status === 409
          ? "This email is already registered."
          : "Registration failed. Please try again.",
      );
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
              <h2 className=" text-xl sm:text-2xl font-bold text-white">
                Create Account
              </h2>
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
                    name="username"
                    required
                    placeholder="Enter your username"
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
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your email"
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
                    name="password"
                    required
                    placeholder="Create a password"
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
                    name="confirmPassword"
                    required
                    placeholder="Confirm your password"
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                         pl-10 pr-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>
              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}

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
