import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";
import { apiLogin } from "../api/mainApi";
import { useAuthStore } from "../stores/auth.store";

function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [error, setError] = useState("");

  const hdlLogin = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

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
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email or password.",
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      description="Login to continue your journey"
      footerText="Don't have an account?"
      footerLinkText="Create new account"
      footerTo="/register"
    >
      <form onSubmit={hdlLogin} className="space-y-4 sm:space-y-5">
        <AuthInput
          icon={Mail}
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="Enter your email"
        />

        <AuthInput
          icon={Lock}
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          // rightContent={
          //   <Link
          //     to="/forgot-password"
          //     className="text-xs text-zinc-500 transition hover:text-yellow-500"
          //   >
          //     Forgot password?
          //   </Link>
          // }
        />

        {error && <p className="text-center text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-yellow-500 py-3 font-bold text-zinc-950 shadow-lg shadow-red-950/30 transition hover:bg-yellow-300"
        >
          LOGIN
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
