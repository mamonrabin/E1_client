import Banner from '@/src/components/home/Banner';
import BestSellProducts from '@/src/components/home/BestSellProducts';
import Blogs from '@/src/components/home/Blogs';
import Brands from '@/src/components/home/Brands';
import Categories from '@/src/components/home/Categories';
import DiscountProducts from '@/src/components/home/DiscountProducts';
import Offerbanner from '@/src/components/home/Offerbanner';
import TrendingProducts from '@/src/components/home/TrendingProducts';
import { getAllBanners } from '@/src/services/banner';
import { getAllBlogs } from '@/src/services/blogs';
import { getAllBrands } from '@/src/services/brand';
import { getAllCategories } from '@/src/services/category';
import { getAllDiscountProducts, getAllNewProducts, getAllTrendingProducts } from '@/src/services/products';
import React from 'react';

const page = async () => {
    const {data:banners} = await getAllBanners()
    const {data:categories} = await getAllCategories()
    const {data:trandingProducts} = await getAllTrendingProducts()
    const {data:newProducts} = await getAllNewProducts()
    const {data:brands} = await getAllBrands()
    const {data:discountProducts} = await getAllDiscountProducts()
    const {data:blogs} = await getAllBlogs()
    console.log("trandingProducts",trandingProducts)
    return (
        <div>
           <Banner banners={banners} />
           <Categories categories={categories}/>
           <TrendingProducts products={trandingProducts}/>
           <Offerbanner banners={banners}/>
           <BestSellProducts products={newProducts}/>
           <Brands brands={brands}/>
           <DiscountProducts products={discountProducts}/>
           <Blogs blogs={blogs}/>
        </div>
    );
};

export default page;