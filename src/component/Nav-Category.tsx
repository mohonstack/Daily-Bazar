import { Icategories } from '@/type';
import Link from 'next/link';
import React from 'react';

const NavCategory = ({category}:{category:Icategories}) => {
    return (
        <Link href={`/category/${category.slug}`}>
        <div>
            <p><span>{category.icon}</span>{category.nameBn}</p>
        </div>
        </Link>
    );
};

export default NavCategory;