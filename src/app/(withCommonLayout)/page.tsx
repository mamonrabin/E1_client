import Banner from '@/src/components/home/Banner';
import BestSellProducts from '@/src/components/home/BestSellProducts';
import Blogs from '@/src/components/home/Blogs';
import Brands from '@/src/components/home/Brands';
import Categories from '@/src/components/home/Categories';
import DiscountProducts from '@/src/components/home/DiscountProducts';
import NewArrivals from '@/src/components/home/NewArrivals';
import Offerbanner from '@/src/components/home/Offerbanner';
import TrendingProducts from '@/src/components/home/TrendingProducts';
import { getAllBanners } from '@/src/services/banner';
import { getAllBlogs } from '@/src/services/blogs';
import { getAllBrands } from '@/src/services/brand';
import { getAllCategories } from '@/src/services/category';
import { getAllBestSellProducts, getAllDiscountProducts, getAllNewProducts, getAllTrendingProducts } from '@/src/services/products';
import React from 'react';

const page = async () => {
    const {data:banners} = await getAllBanners()
    const {data:categories} = await getAllCategories()
    const {data:bestSellProducts} = await getAllBestSellProducts()
    const {data:newProducts} = await getAllNewProducts()
    const {data:brands} = await getAllBrands()
    const {data:discountProducts} = await getAllDiscountProducts()
    const {data:blogs} = await getAllBlogs()
    const {data:trending} = await getAllTrendingProducts()

    console.log("-------------trending products------",trending)
    return (
        <div>
           <Banner banners={banners} />
           <Categories categories={categories}/>
           <NewArrivals products={newProducts}/>
            <BestSellProducts products={bestSellProducts}/>
           <Offerbanner banners={banners}/>
           <TrendingProducts products={trending}/>
           <Brands brands={brands}/>
           <DiscountProducts products={discountProducts}/>
           <Blogs blogs={blogs}/>
        </div>
    );
};

export default page;