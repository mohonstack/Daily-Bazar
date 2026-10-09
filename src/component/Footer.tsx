import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import footerLogo from '../assets/logo-icon.png';

const Footer = () => {
    return (
        <footer className="border-t border-[#e1e9e2] bg-[#f8faf9]">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3 ">
                <div>
                    <Link href="/" className="inline-flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[#008a45]">
                            <Image src={footerLogo} alt="" width={28} height={28} className="object-contain" />
                        </span>
                        <span className="text-xl font-bold text-gray-900">বাজার দর</span>
                    </Link>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600">
                        নিত্যপ্রয়োজনীয় পণ্যের বাজারদর ও দামের পরিবর্তন জানুন সহজে, এক জায়গায়।
                    </p>
                </div>

                <nav aria-label="ফুটার নেভিগেশন">
                    <h2 className="mb-4 text-base font-bold text-gray-900">দ্রুত লিংক</h2>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li><Link href="/" className="transition-colors hover:text-[#008a45]">হোম</Link></li>
                        <li><Link href="/#all-products" className="transition-colors hover:text-[#008a45]">সব পণ্য</Link></li>
                    </ul>
                </nav>

                <nav aria-label="অ্যাকাউন্ট লিংক">
                    <h2 className="mb-4 text-base font-bold text-gray-900">অ্যাকাউন্ট</h2>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li><Link href="/sign-in" className="transition-colors hover:text-[#008a45]">সাইন ইন</Link></li>
                        <li><Link href="/sign-up" className="transition-colors hover:text-[#008a45]">সাইন আপ</Link></li>
                    </ul>
                </nav>
            </div>

            <div className="border-t border-[#e1e9e2]">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-gray-500 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।</p>
                    <p>বাজারের দর, আপনার হাতের নাগালে।</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;