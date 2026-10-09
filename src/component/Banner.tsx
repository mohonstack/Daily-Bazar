import React from 'react';
import bannerImg from '../assets/bazar-hero.png'
import Image from 'next/image';
import Link from 'next/link';


const Banner = () => {
    const date =  new Date().toLocaleDateString("bn-BD",{
        dateStyle:"full"
    })
    return (
        <section className="mx-auto my-4 w-full max-w-7xl px-4 sm:my-6 sm:px-6">
      <div className="flex flex-col items-center gap-5 rounded-3xl border border-[#e5ebe5] bg-base-100 p-5 sm:gap-8 sm:p-8 md:flex-row md:justify-between md:p-10 lg:p-12">
        
        {/* Left Content */}
        <div className="w-full space-y-4 text-center md:flex-1 md:text-left">
          {/* Date Badge */}
          <div className="inline-block rounded-full bg-[#e1eee3] px-3.5 py-1 text-xs font-medium text-[#127a3c] sm:text-sm">
            {date}
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Call to Action Button */}
          <div className="pt-1 sm:pt-2">
            <Link
              href="#all-products"
              className="inline-block rounded-lg bg-[#008a45] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#007339] active:scale-95 sm:px-6"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex h-36 w-36 shrink-0 items-center justify-center sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64">
          <Image
            src={bannerImg}
            alt="বাজার ঝুড়ি"
            width={256}
            height={256}
            className="h-full w-full object-contain"
            priority
          />
        </div>

      </div>
    </section>
    );
};

export default Banner;