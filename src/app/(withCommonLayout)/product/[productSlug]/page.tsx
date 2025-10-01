import React from "react";




import { Metadata } from "next";


// import ShippingInfo from "@/utilits/ShippingInfo";

import PageSection from "@/src/utilits/PageSection";
import ImageGallery from "@/src/slider/ImageGallery";

import ProductInformation from "@/src/components/products/ProductInformation";
import ReletiveProducts from "@/src/components/products/ReletiveProducts";


// import ProductInformation from "@/components/products/ProductInformation";
// import ReletiveProducts from "@/components/products/ReletiveProducts";

export const metadata: Metadata = {
  title: "soza | product",
  description: "Best E-commerce platform for your business",
};

import { getProductBySlug } from '@/src/services/products';
import ProductDetails from "@/src/components/products/ProductDetails";


interface slugProps {
  params: Promise<{
    productSlug: string;
  }>;
}

const page = async ({ params }: slugProps) => {
     const resolvedParams = await params;
      const { data: product } = await getProductBySlug(resolvedParams.productSlug);
    return (
        <div>
      <PageSection second={"Steve Madden Womens Dolly Sandal"} />
      <div className="Container py-4">
        <div className="grid lg:grid-cols-2 gap-8 py-4">
          <div className="">
            <ImageGallery product={product} />
          </div>
          <ProductDetails product={product}/>
        </div>

        <div>
          <ProductInformation details={product.description} />
        </div>

        <div>
          <ReletiveProducts id={product._id} />
        </div>
      </div>
    </div>
    );
};

export default page;