"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setForm((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${BaseUrl}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data.email?.[0] ||
          data.password?.[0] ||
          data.detail ||
          "Login failed. Please check your credentials.";
        setError(errorMessage);
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("access_token", data.token);
        router.push("/home");
      } else {
        setError("Login successful, but no token received.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="md:border border-[#00C767] md:rounded-xl px-8 py-12 md:shadow-lg w-full max-w-md bg-[#F8F9FF] space-y-6"
      >
        <div className="flex justify-center">
          <Image src="/logo.png" width={200} height={300} alt="Welcome" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Login here</h1>
          <p className="text-sm text-gray-600">✋ Welcome back, you&apos;ve been missed!</p>
        </div>
        <input
          type="email"
          name="email"
          value={form.email}
          required
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-green-400"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            required
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full border rounded-md py-2 px-3 pr-10 focus:outline-none focus:border-green-400"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => {
              setRememberMe(!rememberMe);
              if (!rememberMe) localStorage.setItem("rememberedEmail", form.email);
              else localStorage.removeItem("rememberedEmail");
            }}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-sm text-gray-600">
            Remember me
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#03624C] text-white py-2 rounded-md hover:bg-[#162a21] transition flex justify-center items-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            "Login"
          )}
        </button>
        <div className="text-center space-y-2 flex flex-col items-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account? <Link href="/auth/register" className="text-[#00C767]">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
