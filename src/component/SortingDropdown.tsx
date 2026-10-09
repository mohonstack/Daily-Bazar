'use client'
import { IcategoryProducts } from "@/type";
import { useState } from "react";
import CategoryProduct from "./Category-Product";

const SortingDropdown = ({categoryProducts}:{categoryProducts:IcategoryProducts[]}) => {
    const [sort , setSort] = useState('default') 
    const handleSort = ()=>{
        const newCategoryProducts = [...categoryProducts]
        if(sort==="default"){
            return newCategoryProducts
        }
        if(sort==="low-to-high"){
           newCategoryProducts.sort((a,b)=> a.today-b.today )
        }
        else{
            if(sort === "high-to-low"){
                newCategoryProducts.sort((a,b)=>b.today-a.today)
            }
        }
        return newCategoryProducts
    }
    return (
        <div>
            <div className="flex justify-between mt-9 mb-2">
                
                 <p className="text-2xl text-gray-500">
                    মোট {new Intl.NumberFormat('bn-bd').format(categoryProducts.length)}টি পণ্য দেখানো হচ্ছে
                </p>
              
            <select value={sort} onChange={(e)=> setSort(e.target.value)} defaultValue="Large" className=" h-[10%] rounded-[5px] py-2 select select-lg w-fit">
                    <option value={"default"}>ডিফল্ট</option>
                    <option value={"low-to-high"}>দাম: কম থেকে বেশি</option>
                    <option value={"high-to-low"}>দাম: বেশি থেকে কম</option>
                </select>
            </div>
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                 {
                    handleSort().map(p=> <CategoryProduct key={p.id} categoryProduct={p}></CategoryProduct>)
                }
               </div>
        </div>
    );
};

export default SortingDropdown;