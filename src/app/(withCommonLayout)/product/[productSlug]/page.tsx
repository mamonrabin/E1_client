
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import PageSection from "@/src/utilits/PageSection";
import ImageGallery from "@/src/slider/ImageGallery";
import ProductDetails from "@/src/components/products/ProductDetails";
import ProductInformation from "@/src/components/products/ProductInformation";
import ReletiveProducts from "@/src/components/products/ReletiveProducts";

import { getProductBySlug } from "@/src/services/products";

interface SlugProps {
  params: Promise<{
    productSlug: string;
  }>;
}

export async function generateMetadata({
  params,
}: SlugProps): Promise<Metadata> {
  const { productSlug } = await params;

  const { data: product } = await getProductBySlug(productSlug);

  return {
    title: product?.title
      ? `${product.title} | OQTOS`
      : "Product | OQTOS",
    description:
      product?.description?.slice(0, 160) ||
      "Explore our latest fashion collection.",
  };
}

const Page = async ({ params }: SlugProps) => {
  const { productSlug } = await params;

  const response = await getProductBySlug(productSlug);
  const product = response?.data;

  if (!product) {
    notFound();
  }

  return (
    <div>
      <PageSection second={product.title} />

      <div className="Container py-4">
        <div className="grid lg:grid-cols-2 gap-8 py-4">
          <ImageGallery product={product} />
          <ProductDetails product={product} />
        </div>

        <ProductInformation details={product.description} />

        <ReletiveProducts id={product._id} />
      </div>
    </div>
  );
};

export default Page;
