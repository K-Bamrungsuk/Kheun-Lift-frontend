import React, { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiLogin } from "../api/mainApi";
import { useAuthStore } from "../stores/auth.store";

function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState("");

  const hdlLogin = async (e) => {
    e.preventDefault();
    setError(" ");

    //Inshort: const body = Object.fromEntries(new FormData(e.currentTarget));

    const formData = new FormData(e.currentTarget);
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await apiLogin(body);
      const { token, user } = response.data;

      setAuth(token, user);
      navigate("/home", { replace: true });
    } catch (err) {
      setError("Login failed. Please check your email or password.");
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

          {/* Login Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-2xl">
            <div className="mb-6 sm:mb-7">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Welcome Back
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Login to continue your journey
              </p>
            </div>

            <form onSubmit={hdlLogin} className="space-y-4 sm:space-y-5">
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
                    required
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
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-zinc-300">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs text-zinc-500 hover:text-yellow-500 transition"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password"
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                         pl-10 pr-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                onSubmit={hdlLogin}
                className="w-full bg-yellow-500 hover:bg-yellow-300
                       text-gray-900 font-bold py-3 rounded-lg
                       transition duration-200
                       shadow-lg shadow-red-950/30"
              >
                LOGIN
              </button>
            </form>

            {/* Register */}
            <p className="text-center text-sm text-zinc-400 mt-6">
              Don't have an account?
              <Link
                to="/register"
                className="text-yellow-500 hover:text-yellow-200 font-semibold"
              >
                &nbsp; Create new account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
