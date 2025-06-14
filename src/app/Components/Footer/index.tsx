import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
    const [isLoading, setIsLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const pathname = usePathname();

    const handleSubscribe = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setSubscribed(true);
        }, 3000);
    };

    if (pathname === '/' || pathname.startsWith('/auth')) return null;


    return (
        <div className='bg-[#DAFCE4] p-10 text-sm mt-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 pb-5'>
                {/* Left Section */}
                <section className='space-y-3'>
                    <Image src='/logo.png' width={250} height={80} alt='logo' />
                    <p>Join our newsletter for the latest updates and features.</p>
                    <div className='flex space-x-3'>
                        <input
                            type="email"
                            placeholder='Your Email Here'
                            className='border px-3 py-2 rounded-md flex-1 outline-none'
                        />
                        <button
                            onClick={handleSubscribe}
                            className='bg-[#03624C] rounded-md text-white py-2 px-5 flex items-center justify-center min-w-[120px]'
                        >
                            {isLoading ? (
                                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                            ) : subscribed ? 'Subscribed' : 'Subscribe'}
                        </button>
                    </div>
                    <p className='text-[10px]'>By subscribing, you agree to our Privacy Policy and consent to updates.</p>
                </section>

                {/* Right Section */}
                <section className='grid md:grid-cols-2 grid-cols-1 gap-10'>
                    <div>
                        <h1 className="font-semibold">Quick Links</h1>
                        <ul className="space-y-1">
                            <li><Link href="/about">About us</Link></li>
                            <li><Link href="#support">Contact us</Link></li>
                            <li><Link href="#">Privacy Policy</Link></li>
                            <li><Link href="#">Terms of Service</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h1 className="font-semibold">Connect with us</h1>
                        <div className='flex flex-col gap-3 mt-2'>
                            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                                <FaFacebookF className="text-[#03624C] cursor-pointer hover:scale-110 transition" size={20} />
                                <span className="text-[12px]">Facebook</span>
                            </Link>
                            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                                <FaInstagram className="text-[#03624C] cursor-pointer hover:scale-110 transition" size={20} />
                                <span className="text-[12px]">Instagram</span>
                            </Link>
                            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                                <FaXTwitter className="text-[#03624C] cursor-pointer hover:scale-110 transition" size={20} />
                                <span className="text-[12px]">Twitter</span>
                            </Link>
                            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                                <FaLinkedinIn className="text-[#03624C] cursor-pointer hover:scale-110 transition" size={20} />
                                <span className="text-[12px]">LinkedIn</span>
                            </Link>
                            <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                                <FaYoutube className="text-[#03624C] cursor-pointer hover:scale-110 transition" size={20} />
                                <span className="text-[12px]">YouTube</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <hr />

            <div className='flex flex-col md:flex-row justify-between text-sm py-3 text-center md:text-left'>
                <p>© 2025 safaridesk. All rights reserved.</p>
                <div className='flex space-x-5 mt-2 md:mt-0 justify-center md:justify-end'>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </div>
            </div>
        </div>
    );
}
