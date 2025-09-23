
import { cartList } from "@/src/api/cartApi";
import CheckoutProducts from "@/src/components/checkout/CheckoutProducts";
import CheckoutForm from "@/src/form/CheckoutForm";
import PageSection from "@/src/utilits/PageSection";

import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "soza | checkout",
  description: "Best E-commerce platform for your business",
};

const page = () => {
  return (
    <div>
      <PageSection second="check out" />
      <div className="Container grid lg:grid-cols-2 gap-12 mt-12">
        <div>
          <CheckoutForm />
        </div>
        <div className="">
          <CheckoutProducts cartList={cartList} />
        </div>
      </div>
    </div>
  );
};

export default page;
