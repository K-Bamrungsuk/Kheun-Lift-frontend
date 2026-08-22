import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";
import { apiRegister } from "../api/mainApi";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const hdlSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    const body = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const confirmPassword = formData.get("confirmPassword");

    if (body.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await apiRegister(body);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      description="Join the Kheun Lift community"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerTo="/login"
    >
      <form onSubmit={hdlSubmit} className="space-y-4 sm:space-y-5">
        <AuthInput
          icon={User}
          label="Username"
          type="text"
          name="username"
          autoComplete="username"
          required
          maxLength="20"
          placeholder="Enter your username"
        />

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
          autoComplete="new-password"
          required
          placeholder="Create a password"
        />

        <AuthInput
          icon={Lock}
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          required
          placeholder="Confirm your password"
        />

        {error && <p className="text-center text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-yellow-500 py-3 font-bold text-zinc-950 shadow-lg shadow-red-950/30 transition hover:bg-yellow-300"
        >
          CREATE ACCOUNT
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
