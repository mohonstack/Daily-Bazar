import { IcategoryProducts } from "@/type";
import CategoryProduct from "./Category-Product";
import { fetchBazardorData } from "@/lib/bazardor-api";

const getPriceDecreasedProducts = async()=>{
    return fetchBazardorData<IcategoryProducts[]>('/api/bazardor/products')
}

const PriceDecreasedProducts = async() => {
    const products = await getPriceDecreasedProducts()
    const priceDecreasedProducts = products.filter(p=> p.change?.dir==="down").sort((a,b)=>a.change?.pct-b.change?.pct).slice(0,6)
    return (
          <div className='mt-10'>
        <div className='max-w-7xl w-full mx-auto p-3 flex gap-1 items-center'>
            <p className='text-green-600 text-xl'>▼</p>
            <h1 className='text-2xl font-bold'>আজ দাম কমেছে</h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto gap-5 px-2'>
            {
               priceDecreasedProducts.map(p=> <CategoryProduct key={p.id} categoryProduct={p} ></CategoryProduct>)
            }
        </div>
        </div>
    );
};

export default PriceDecreasedProducts;