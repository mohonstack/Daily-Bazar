
import CategoryProduct from "@/component/Category-Product";
import { Icategories, IcategoryProducts } from "@/type";
import { connection } from "next/server";
import { Suspense } from "react";
import { fetchBazardorData } from "@/lib/bazardor-api";
import SortingDropdown from "@/component/SortingDropdown";

const getProductByCategory = async (slug: string) => {
    return fetchBazardorData<IcategoryProducts[]>(`/api/bazardor/products?category=${encodeURIComponent(slug)}`)

}

const getIndividualCategory = async (slug: string) => {
    return fetchBazardorData<Icategories>(`/api/bazardor/categories/${encodeURIComponent(slug)}`)
}

const CategoryPageContent = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params
    await connection()

    const categoryProducts = await getProductByCategory(slug)
    const individualCategory: Icategories = await getIndividualCategory(slug)

   

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
            <section className="flex items-center gap-4 rounded-2xl  p-5 shadow-sm bg-white sm:gap-6 sm:p-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm ring-1 ring-green-100 sm:h-20 sm:w-20 sm:text-5xl">
                    {individualCategory.icon}
                </div>
                <div className="min-w-0">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        {individualCategory.nameBn}
                    </h1>
                    <p className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        {new Intl.NumberFormat('bn-bd').format(categoryProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </section>
               
            <div >
                <SortingDropdown categoryProducts={categoryProducts}></SortingDropdown>
            </div>

            
        </main>
    );
};

const page = ({ params }: { params: Promise<{ slug: string }> }) => (
    <Suspense fallback={<main className="mx-auto min-h-96 w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10" aria-hidden="true" />}>
        <CategoryPageContent params={params} />
    </Suspense>
);

export default page;