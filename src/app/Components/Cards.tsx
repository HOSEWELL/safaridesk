import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi"; // Import arrow icon

interface CardProps {
    imageSrc: string;
    title: string;
    text: string;
    link: string;
}

const Card1: React.FC<CardProps> = ({ imageSrc, title, text, link }) => {
    return (
        <div className="flex flex-col items-center text-center p-10">
            {/* Image */}
            <Image
                src={imageSrc}
                alt={title}
                width={350}
                height={80}
                className="mb-3 rounded-md"
            />

            {/* Title */}
            <h2 className="text-lg font-medium ">{title}</h2>

            {/* Description */}
            <p className="mt-2 text-sm font-light">{text}</p>

            {/* Link */}
            <Link
                href={link || "/listings"}
                className="flex items-center  text-[#00C767] mt-3 text-sm font-medium hover:underline"
            >
                {link} <FiChevronRight className="ml-1" />
            </Link>
        </div>
    );
};

const Card2: React.FC<Omit<CardProps, "link">> = ({ imageSrc, title, text }) => {
    return (
        <div className="flex flex-col items-center text-center p-10">
            {/* Image */}
            <Image
                src={imageSrc}
                alt={title}
                width={350}
                height={80}
                className="mb-3 rounded-md"
            />

            {/* Title */}
            <h2 className="text-lg font-medium ">{title}</h2>

            {/* Description */}
            <p className="mt-2 text-sm font-light">{text}</p>
        </div>
    );
};

export { Card1, Card2 };

