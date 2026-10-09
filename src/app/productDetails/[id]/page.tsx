import { IcategoryProducts } from '@/type';
import Link from 'next/link';
import { connection } from 'next/server';
import React from 'react';
import { Suspense } from 'react';
import { fetchBazardorData } from '@/lib/bazardor-api';

const getProductDetails = async(id:number)=>{
    return fetchBazardorData<IcategoryProducts>(`/api/bazardor/products/${id}`)
}

const ProductDetailsContent = async({params}:{ params: Promise<{ id: number }> } ) => {
const {id} = await params
await connection()

const productDetails = await getProductDetails(id)


 const changeDirection = productDetails.change?.dir;
    const changeStyle = changeDirection === 'up'
        ? ' text-red-700'
        : changeDirection === 'down'
            ? 'text-emerald-700'
            : 'bg-gray-100 text-gray-600';
    const changeIcon = changeDirection === 'up'
        ? '▲'
        : changeDirection === 'down'
            ? '▼'
            : '';


const InBangla = new Intl.NumberFormat('bn-bd').format

    const highestPriceArray = productDetails.markets?.map(p=>p.max)
    const highestPrice = Math.max(...highestPriceArray)
    const lowestPriceArray = productDetails.markets?.map(p=>p.min)
    const lowestPrice = Math.min(...lowestPriceArray)

    return (
        <div className='w-full max-w-7xl mx-auto'>
           <div className='py-10'>
             <p className='text-gray-600'>
               <Link href={'/'}>হোম</Link>  {'>'}  <Link href={`/category/${productDetails.category}`}>{productDetails.categoryNameBn}</Link> {'>'} {productDetails.nameBn}
            </p>
           </div>

           <div>
            <div className="w-full bg-white border border-[#e6ebe6] rounded-2xl p-5 md:p-6 space-y-2 sm:flex items-center justify-between shadow-sm">
      
      {/* Left Section: Icon, Title, Subtitle, & Trend Message */}
      <div className="flex items-center gap-4 md:gap-5">
        {/* Product Emoji / Icon Box */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#edf2ed] rounded-2xl flex items-center justify-center text-3xl md:text-4xl flex-shrink-0">
          {productDetails.image}
        </div>

        {/* Text Information */}
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {productDetails.nameBn}
          </h2>
          
          <span className="text-sm md:text-base text-gray-500 font-medium mt-0.5">
            প্রতি {productDetails.unit} · {productDetails.categoryNameBn}
          </span>

          <span className="text-xs md:text-sm text-gray-500 font-normal mt-1.5">
            গতকালের তুলনায় আজ দাম <span className='font-bold'>বেড়েছে {productDetails.change?.pct}%</span>
          </span>
        </div>
      </div>

      {/* Right Card: Today's Price Info */}
      <div className="bg-[#edf2ed] rounded-2xl px-6 py-4 flex flex-col items-center justify-center min-w-[130px] md:min-w-[150px]">
        <span className="text-xs md:text-sm font-medium text-gray-600">
          আজকের দাম
        </span>
        
        <span className="text-3xl md:text-4xl font-extrabold text-gray-900 my-1">
          {productDetails.today}
        </span>
        
        <span className="text-xs md:text-sm text-gray-500 font-medium">
          টাকা / {productDetails.unit}
        </span>

        {/* Dynamic Percentage Indicator */}
        <div className={`flex items-center gap-1 text-xs md:text-sm font-bold mt-1 ${changeStyle}`}>
          <span>{changeIcon}</span>
          {productDetails.change?.pct}%
        </div>
      </div>

    </div>
           </div>

          {/* মার্কেট প্রাইস টেবিল */}
          <section className="mt-8 space-y-5 rounded-3xl border border-green-100 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <div>
            
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                দামের সারসংক্ষেপ
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                বিভিন্ন বাজারে প্রতি {productDetails.unit}-এর দামের তুলনা
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:p-5">
                <p className="text-sm font-medium text-emerald-800">সর্বনিম্ন দাম</p>
                <p className="mt-2 text-2xl font-bold text-emerald-700">
                  {InBangla(lowestPrice)} <span className="text-base font-semibold">টাকা</span>
                </p>
                <p className="mt-1 text-xs text-emerald-800/70">সবচেয়ে কম দামের বাজার</p>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4 sm:p-5">
                <p className="text-sm font-medium text-rose-800">সর্বাধিক দাম</p>
                <p className="mt-2 text-2xl font-bold text-rose-700">
                  {InBangla(highestPrice)} <span className="text-base font-semibold">টাকা</span>
                </p>
                <p className="mt-1 text-xs text-rose-800/70">সবচেয়ে বেশি দামের বাজার</p>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4 sm:p-5">
                <p className="text-sm font-medium text-amber-800">গড় দাম</p>
                <p className="mt-2 text-2xl font-bold text-amber-700">
                  {InBangla((lowestPrice + highestPrice) / 2)} <span className="text-base font-semibold">টাকা</span>
                </p>
                <p className="mt-1 text-xs text-amber-800/70">প্রতি কেজি-এর হিসাবে</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <div className="flex flex-col gap-1 border-b border-gray-200 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <h3 className="font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h3>
                <p className="text-xs text-gray-500">দাম বাংলাদেশি টাকায়</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-white text-xs font-semibold uppercase tracking-wide text-gray-500">
                    <tr>
                      <th scope="col" className="px-5 py-4">বাজার</th>
                      <th scope="col" className="px-5 py-4">বিভাগ</th>
                      <th scope="col" className="px-5 py-4 text-right">সর্বনিম্ন</th>
                      <th scope="col" className="px-5 py-4 text-right">সর্বাধিক</th>
                      <th scope="col" className="px-5 py-4 text-right">গড়</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {productDetails.markets.map((m, index) => (
                      <tr key={index} className="transition-colors hover:bg-green-50/60">
                        <th scope="row" className="whitespace-nowrap px-5 py-4 font-semibold text-gray-900">
                          {m.market}
                        </th>
                        <td className="whitespace-nowrap px-5 py-4 text-gray-600">{m.division}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-emerald-700">
                          {InBangla(m.min)} টাকা
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-rose-700">
                          {InBangla(m.max)} টাকা
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right font-semibold text-gray-900">
                          {InBangla((m.max + m.min) / 2)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
    );
};

const ProductDetailsPage = ({ params }: { params: Promise<{ id: number }> }) => (
    <Suspense fallback={<main className="mx-auto min-h-96 w-full max-w-7xl px-4" aria-hidden="true" />}>
        <ProductDetailsContent params={params} />
    </Suspense>
);

export default ProductDetailsPage;