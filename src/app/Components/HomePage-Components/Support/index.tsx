"use client";

import React from "react";
import Image from "next/image";
import { CiMail } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { motion } from "framer-motion";

export default function Support() {
  return (
    <div className="p-10 max-w-5xl mx-auto"id="support">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 text-center"
      >
        <p className="font-medium text-[#03624C]">Support</p>
        <h1 className="text-4xl font-semibold">Get in Touch</h1>
        <p className="text-gray-600">We&apos;re here to help you with any questions.</p>
      </motion.div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {/* Contact Details */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 flex flex-col justify-center"
        >
          {/* Email */}
          <div className="flex items-center space-x-4 cursor-pointer">
            <CiMail size={30} className="text-[#03624C]" />
            <div>
              <p className="text-lg font-medium">Email</p>
              <p className="text-gray-600">Reach us anytime at</p>
              <a
                href="mailto:cribhuntweb@gmail.com"
                className="text-[#03624C] font-semibold hover:underline"
              >
                safaridesk@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-4 cursor-pointer">
            <LuPhone size={30} className="text-[#03624C]" />
            <div>
              <p className="text-lg font-medium">Phone</p>
              <p className="text-gray-600">Reach us anytime at</p>
              <a
                href="tel:+254743823564"
                className="text-[#03624C] font-semibold hover:underline"
              >
                +254 759 582 907
              </a>
            </div>
          </div>
        </motion.section>

        {/* Image Section */}
        <motion.section
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src="/safariguide.jpg"
            width={500}
            height={500}
            alt="Support"
            className="rounded-md shadow-lg"
          />
        </motion.section>
      </div>
    </div>
  );
}
