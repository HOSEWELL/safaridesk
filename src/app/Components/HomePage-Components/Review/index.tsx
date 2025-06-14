"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Review() {
    return (
        <div className="bg-[#DAFCE4] py-20 px-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Image Section */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <Image
                    src={"/review.jpg"}
                    alt="reviewer"
                    width={500}
                    height={350}
                    className="rounded-md shadow-lg"
                />
            </motion.div>

            {/* Review Content */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-3"
            >
                <section className="text-2xl">⭐⭐⭐⭐⭐</section>
                <section>
                    <p className="text-lg">
                        &quot;Safaridesk transformed my ticket search experience! I found an easy way to book a ticket in no time, thanks to its user-friendly interface and detailed listings.&quot;
                    </p>
                </section>
                <section className="border-l-4 border-black pl-5">
                    <p className="font-semibold text-xl">Kingstone Williams</p>
                    <p className="text-gray-600">SafariDesk Customer</p>
                </section>
            </motion.div>
        </div>
    );
}
