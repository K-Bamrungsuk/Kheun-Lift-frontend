import React from "react";

function Login() {
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

          {/* Login Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-sm text-zinc-500 mt-1">
                Login to continue your journey
              </p>
            </div>

            <form className="space-y-5">
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
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-zinc-300">
                    Password
                  </label>

                  <a
                    href="/forgot-password"
                    className="text-xs text-zinc-500 hover:text-yellow-500 transition"
                  >
                    Forgot password?
                  </a>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
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
                LOGIN
              </button>
            </form>

            {/* Register */}
            <p className="text-center text-sm text-zinc-400 mt-6">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-yellow-500 hover:text-yellow-200 font-semibold"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
