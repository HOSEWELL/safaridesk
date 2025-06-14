"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface RegisterForm {
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  password: string;
  confirm_password: string;
}

export default function Register() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RegisterFormComponent />
    </Suspense>
  );
}

function RegisterFormComponent() {
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<RegisterForm>({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "M",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      date_of_birth: Yup.string().required("Required"),
      gender: Yup.string().oneOf(["M", "F"], "Choose M or F").required("Required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${BaseUrl}/register/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
            date_of_birth: values.date_of_birth,
            gender: values.gender,
            password: values.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.detail || "Registration failed.");
        } else {
          router.push("/auth/login");
        }
      } catch (err) {
        console.error("Registration error:", err);
        setError("Registration failed. Try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="border border-[#00C767] rounded-lg px-6 py-5 shadow-lg w-full max-w-sm bg-white space-y-4"
      >
        <div className="flex justify-center">
          <Image src="/logo.png" width={150} height={200} alt="Welcome" />
        </div>

        <h1 className="text-xl font-semibold text-center">Register</h1>

        {["email", "first_name", "last_name", "date_of_birth"].map((field) => (
          <div key={field} className="text-sm">
            <input
              type={field === "date_of_birth" ? "date" : "text"}
              name={field}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={formik.values[field as keyof RegisterForm] as string}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:border-green-400"
              required
            />
            {formik.touched[field as keyof RegisterForm] && formik.errors[field as keyof RegisterForm] && (
              <p className="text-red-500 text-xs">{formik.errors[field as keyof RegisterForm]}</p>
            )}
          </div>
        ))}

        {/* Gender Select */}
        <div className="text-sm">
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            className="w-full border rounded-md py-2 px-3 text-sm focus:outline-none focus:border-green-400"
            required
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        {/* Password and Confirm Password */}
        {[
          { name: "password", show: showPassword, setShow: setShowPassword },
          { name: "confirm_password", show: showConfirmPassword, setShow: setShowConfirmPassword },
        ].map(({ name, show, setShow }) => (
          <div className="relative text-sm" key={name}>
            <input
              type={show ? "text" : "password"}
              name={name}
              placeholder={name.replace("_", " ").toUpperCase()}
              value={formik.values[name as keyof RegisterForm] as string}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-md py-2 px-3 pr-10 text-sm focus:outline-none focus:border-green-400"
              required
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {show ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
            {formik.touched[name as keyof RegisterForm] && formik.errors[name as keyof RegisterForm] && (
              <p className="text-red-500 text-xs">{formik.errors[name as keyof RegisterForm]}</p>
            )}
          </div>
        ))}

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#03624C] text-white py-2 rounded-md hover:bg-[#162a21] transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-xs">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#00C767]">Login</Link>
        </p>
      </form>
    </div>
  );
}

function LoadingFallback() {
  return <div className="text-center text-gray-500">Loading...</div>;
}
