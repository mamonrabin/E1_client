import { ArrowRightLeft, EthernetPort, HandCoins, Truck } from "lucide-react";
import React from "react";

const TopFooter = () => {
  return (
    <div className="Container py-6 bg-primary mt-12 xl:px-30 border-b border-white/10">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-8 gap-4">
        <div className="flex items-center gap-3">
          <p className="border p-1.5 rounded text-white/70">
            <Truck />
          </p>
          <div>
            <h1 className=" text-sm font-medium text-white/80">
              Free Shipping
            </h1>
            <p className="lg:text-[12px] text-[10px] text-white/80">
              Free Shipping for orders
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="border p-1.5 rounded text-white/70">
            <ArrowRightLeft />
          </p>
          <div>
            <h1 className="text-sm font-medium text-white/80">
              Return & Exchanges
            </h1>
            <p className="lg:text-[12px] text-[10px] text-white/80">
              Simply return it within 30 days.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="border p-1.5 rounded text-white/70">
            <EthernetPort />
          </p>
          <div>
            <h1 className=" text-sm font-medium text-white/80">
              Online Support
            </h1>
            <p className="lg:text-[12px] text-[10px] text-white/80">
              24 hours a day, 7 days a week
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="border p-1.5 rounded text-white/70">
            <HandCoins />
          </p>
          <div>
            <h1 className="text-sm font-medium text-white/80">
              Flexible payment
            </h1>
            <p className="lg:text-[12px] text-[10px] text-white/80">
              Pay with Multiple Credit Cards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFooter;
