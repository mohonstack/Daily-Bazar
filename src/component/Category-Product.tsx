import { IcategoryProducts } from '@/type';
import Link from 'next/link';

const CategoryProduct = ({ categoryProduct }: { categoryProduct: IcategoryProducts }) => {
    const changeDirection = categoryProduct.change?.dir;
    const changeStyle = changeDirection === 'up'
        ? 'bg-red-50 text-red-700'
        : changeDirection === 'down'
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-gray-100 text-gray-600';
    const changeIcon = changeDirection === 'up'
        ? '▲'
        : changeDirection === 'down'
            ? '▼'
            : '•';

    return (
        <Link href={`/productDetails/${categoryProduct.id}`}>
        <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
            <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl sm:h-16 sm:w-16 sm:text-4xl">
                    {categoryProduct.image}
                </div>
                <div className="min-w-0">
                    <h2 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
                        {categoryProduct.nameBn}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        প্রতি {categoryProduct.unit}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
                <div>
                    <p className="text-sm text-gray-500">আজকের দাম</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                        {categoryProduct.today.toLocaleString('bn-BD')}
                        <span className="ml-1 text-sm font-medium text-gray-500">টাকা</span>
                    </p>
                </div>
                <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold ${changeStyle}`}>
                    <span aria-hidden="true">{changeIcon}</span>
                    {categoryProduct.change?.pct.toLocaleString('bn-BD')}%
                </span>
            </div>
        </article>
        </Link>
    );
};

export default CategoryProduct;