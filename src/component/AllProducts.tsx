import { IcategoryProducts } from '@/type';
import React from 'react';
import CategoryProduct from './Category-Product';
import { fetchBazardorData } from '@/lib/bazardor-api';
const getAllProducts = async()=>{
    return fetchBazardorData<IcategoryProducts[]>('/api/bazardor/products')
}

const AllProducts = async() => {
    const allProducts = await getAllProducts()
    return (
         <div id="all-products" className='mt-10'>
        <div className='max-w-7xl w-full mx-auto p-3 '>
            <h1 className='text-2xl font-bold'>সব পণ্য</h1>
            <p className='text-gray-500 '>মোট {new Intl.NumberFormat('bn-bd').format(allProducts.length)}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto gap-5 px-2'>
            {
               allProducts.map(p=> <CategoryProduct key={p.id} categoryProduct={p} ></CategoryProduct>)
            }
        </div>
        </div>
    );
};

export default AllProducts;