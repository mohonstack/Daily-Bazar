import AllProducts from "@/component/AllProducts";
import Banner from "@/component/Banner";
import PriceDecreasedProducts from "@/component/PriceDecreasedProducts";
import PriceIncreaseProducts from "@/component/PriceIncreaseProducts";
import { connection } from "next/server";
import { Suspense } from "react";


async function HomeContent() {
  await connection()

  return (
    <div>

      <Banner></Banner>
      <PriceIncreaseProducts></PriceIncreaseProducts>
      <PriceDecreasedProducts></PriceDecreasedProducts>
      <AllProducts></AllProducts>

    </div>
    
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-96" aria-hidden="true" />}>
      <HomeContent />
    </Suspense>
  )
}
