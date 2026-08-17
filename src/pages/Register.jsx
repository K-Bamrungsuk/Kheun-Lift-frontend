import React from "react";

function Register() {
  return (
    <>
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black tracking-widest text-white">
              KHEUN <span className="text-yellow-500">LIFT</span>
            </h1>
            <p className="text-zinc-500 mt-2">
              Build your strength. Prove your rank.
            </p>
          </div>

          {/* Register Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-white">Create Account</h2>
              <p className="text-sm text-zinc-500 mt-1">
                Join the Kheun Lift community
              </p>
            </div>

            <form className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                         px-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                         px-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                         px-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-700
                         px-4 py-3 text-white placeholder-zinc-600
                         outline-none transition
                         focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                />
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
              Already have an account?{" "}
              <a
                href="/login"
                className="text-yellow-500 hover:text-yellow-200 font-semibold"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
