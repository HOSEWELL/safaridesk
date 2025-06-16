"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FiLogIn, FiUserPlus, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const pathname = usePathname();
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authPopupRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // ✅ Check Authentication Every Render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        authPopupRef.current &&
        !authPopupRef.current.contains(target) &&
        event.target !== document.getElementById("auth-icon")
      ) {
        setIsAuthPopupOpen(false);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        event.target !== document.getElementById("menu-icon")
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeClass = (path: string) =>
    pathname === path ? "text-[#03624C] border-b-2 border-[#03624C]" : "text-green-500 hover:text-[#03624C]";

  return (
    <nav className="flex justify-between items-center mx-1 md:mx-5 py-3 text-sm relative px-4 md:px-10">
      {/* Logo */}
      <div>
        <Link href="/home">
          <Image src="/logo.png" width={100} height={25} alt="logo" />
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link href="/home" className={`px-2 py-1 ${activeClass("/home")}`}>Home</Link>
        <Link href="/tickets" className={`px-2 py-1 ${activeClass("/tickets")}`}>Tickets</Link>
        <Link href="/my-tickets" className={`px-2 py-1 ${activeClass("/my-tickets")}`}>My_Tickets</Link>

      </div>

      {/* Authentication Icon - Desktop */}
      <div className="hidden md:flex items-center relative">
        {isAuthenticated ? (
          <Link href="/auth/login">
            <Image 
              src={"/profile.png"}
              width={40} height={32} 
              alt="Profile" 
              className="rounded-full cursor-pointer" 
            />
          </Link>
        ) : (
          <>
            <FiUser
              id="auth-icon"
              size={24}
              className="cursor-pointer hover:text-green-500"
              onClick={() => setIsAuthPopupOpen(!isAuthPopupOpen)}
            />

            {/* Auth Popup */}
            <AnimatePresence>
              {isAuthPopupOpen && (
                <motion.div
                  ref={authPopupRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="fixed top-16 right-5 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-48 z-[100]"
                >
                  <Link href="/auth/login" className="flex items-center space-x-2 bg-[#03624C] text-white px-4 py-2 rounded-md w-full mb-2">
                    <FiLogIn /> <span>Login</span>
                  </Link>
                  <Link href="/auth/register" className="flex items-center space-x-2 border px-4 py-2 rounded-md hover:bg-gray-700 w-full">
                    <FiUserPlus /> <span>Register</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center relative">
        {isAuthenticated ? (
          <Link href="#">
            <Image 
              src={"/profile.png"}
              width={32} height={32} 
              alt="Profile" 
              className="rounded-full cursor-pointer mr-3" 
            />
          </Link>
        ) : (
          <FiUser
            id="auth-icon"
            size={24}
            className="cursor-pointer hover:text-green-500 mr-3"
            onClick={() => setIsAuthPopupOpen(!isAuthPopupOpen)}
          />
        )}

        <HiOutlineMenuAlt3
          id="menu-icon"
          size={30}
          className="cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />

        {/* Mobile Popup Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 right-5 bg-gray-900 text-white p-4 rounded-lg shadow-lg w-52 z-[100] flex flex-col space-y-3"
            >
              <Link href="/home" className="px-2 py-1 text-white hover:text-green-400" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/tickets" className="px-2 py-1 text-white hover:text-green-400" onClick={() => setIsMenuOpen(false)}>Tickets</Link>
              <Link href="/mytickets" className="px-2 py-1 text-white hover:text-green-400" onClick={() => setIsMenuOpen(false)}>My_Tickets</Link>

              <hr className="border-gray-600" />
              {!isAuthenticated && (
                <>
                  <Link href="/auth/login" className="flex items-center space-x-2 bg-[#03624C] text-white px-4 py-2 rounded-md w-full mb-2">
                    <FiLogIn /> <span>Login</span>
                  </Link>
                  <Link href="/auth/register" className="flex items-center space-x-2 border px-4 py-2 rounded-md hover:bg-gray-700 w-full">
                    <FiUserPlus /> <span>Register</span>
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
