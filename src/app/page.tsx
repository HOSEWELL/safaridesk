"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Loading from "./Components/Loading";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
        router.push("/home");
      
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Image src="/logo.jpg" width={200} height={200} alt="logo" className="w-3/4 md:w-1/2" />
      <p className="text-xl text-center">
        Book your Tickets, Hassle Free
      </p>
      <Loading />
    </motion.div>
  );
}
