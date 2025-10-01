// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Image from "next/image";
// import React from "react";
// import { IoBagOutline } from "react-icons/io5";
// import ProductQuickView from "./ProductQuickView";
// import Link from "next/link";
// import { apiBaseUrl } from "@/src/config/config";
// import { TProducts } from "@/src/types";
// import { getCurrentUser } from "@/src/utilits/CurrentUser";
// import { createCart } from "@/src/services/cart";
// import { useCartStore } from "@/src/store/cartStore";

// interface cardProps {
//   product: TProducts;
// }

// const ProductCard: React.FC<cardProps> = ({ product }) => {
//   const {
//     title,
//     price,
//     mrpPrice,
//     category,
//     thumbal_image,
//     backview_image,
//     label,
//     discount,
//     slug,
//     _id,
//   } = product;

//   const currentUser = getCurrentUser();
//   const addToCart = useCartStore((state) => state.addToCart);

//   // const handleAddToCart = async () => {
//   //   if (!currentUser || !currentUser._id) {
//   //     alert("Please log in to add to cart.");
//   //     return;
//   //   }

//   //   const cartData = {
//   //     userRef: currentUser._id,
//   //     productRef: _id,
//   //     quantity: 1,
//   //   };

//   //   try {
//   //     // Save to backend
//   //     const result = await createCart(cartData);

//   //     if (result.error) {
//   //       console.error("Error adding to cart:", result.error);
//   //       alert("Failed to add to cart.");
//   //       return;
//   //     }

//   //     // Save to localStorage
//   //     const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

//   //     // Check if product already exists
//   //     const existingIndex = localCart.findIndex(
//   //       (item: any) =>
//   //         item.productRef === _id && item.userRef === currentUser._id
//   //     );

//   //     if (existingIndex !== -1) {
//   //       // Increase quantity if product exists
//   //       localCart[existingIndex].quantity += 1;
//   //     } else {
//   //       // Add new item
//   //       localCart.push(cartData);
//   //     }

//   //     localStorage.setItem("cart", JSON.stringify(localCart));

//   //     console.log("Cart added successfully:", result);
//   //     alert("Product added to cart!");
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //     alert("Something went wrong.");
//   //   }
//   // };

// //   const handleAddToCart = async () => {
// //   const cartData = {
// //     userRef: currentUser?._id || null, // keep null if guest
// //     productRef: _id,
// //     quantity: 1,
// //   };

// //   try {
// //     if (currentUser && currentUser._id) {
// //       // Save to backend if logged in
// //       const result = await createCart(cartData);

// //       if (result.error) {
// //         console.error("Error adding to cart:", result.error);
// //         alert("Failed to add to cart.");
// //         return;
// //       }
// //     }

// //     // Save to localStorage (guest or logged in)
// //     const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

// //     // Check if product already exists
// //     const existingIndex = localCart.findIndex(
// //       (item: any) =>
// //         item.productRef === _id &&
// //         (currentUser ? item.userRef === currentUser._id : item.userRef === null)
// //     );

// //     if (existingIndex !== -1) {
// //       // Increase quantity if product exists
// //       localCart[existingIndex].quantity += 1;
// //     } else {
// //       // Add new item
// //       localCart.push({cartData});
// //     }

// //     localStorage.setItem("cart", JSON.stringify(localCart));

// //     console.log("Cart added successfully:", cartData);
// //     alert("Product added to cart!");
// //   } catch (error) {
// //     console.error("Error:", error);
// //     alert("Something went wrong.");
// //   }
// // };



// const handleAddToCart = async () => {
//   const cartData = {
//     userRef: currentUser?._id || null,
//     productRef: _id,
//     quantity: 1,
//   };

//   try {
//     if (currentUser && currentUser._id) {
//       const result = await createCart(cartData);
//       if (result.error) {
//         alert("Failed to add to cart.");
//         return;
//       }
//     }

//     // ✅ Zustand logic
//     const added = addToCart(cartData);

//     if (!added) {
//       alert("This product is already added to cart.");
//       return;
//     }

//     alert(`${title} added to cart!`);
//   } catch (error) {
//     console.error("Error:", error);
//     alert("Something went wrong.");
//   }
// };



//   return (
//     <div className="group">
//       <div className="relative overflow-hidden">
//         <Link href={`/product/${slug}`}>
//           <Image
//             src={apiBaseUrl + thumbal_image}
//             alt={title}
//             width={300}
//             height={300}
//             className="w-full h-full"
//           />
//         </Link>
//         <Link href={`/product/${slug}`}>
//           <Image
//             className="top-0 absolute opacity-0 group-hover:opacity-100 hover:scale-105 duration-700 w-full h-full"
//             src={apiBaseUrl + backview_image}
//             alt={title}
//             width={300}
//             height={300}
//           />
//         </Link>
//         <div className="group-hover:bottom-3 bottom-0 opacity-0 group-hover:opacity-100 absolute px-4 w-full duration-200 transition-all">
//           <p
//             onClick={handleAddToCart}
//             className="bg-white hover:bg-primary hover:text-white w-full py-3 capitalize font-medium text-center cursor-pointer duration-700 transition-all"
//           >
//             Add to cart
//           </p>
//         </div>

//         <div className="top-5 group-hover:right-5 right-0 opacity-0 group-hover:opacity-100 duration-200 transition-all absolute flex flex-col gap-2">
//           <p
//             onClick={handleAddToCart}
//             className="p-2 bg-white hover:bg-primary hover:text-white duration-300 cursor-pointer"
//           >
//             <IoBagOutline size={18} />
//           </p>

//           <ProductQuickView product={product} />
//         </div>

//         <div className="top-3 left-3 absolute flex gap-2">
//           {label && (
//             <p className="px-2 py-1 bg-primary duration-300 uppercase font-medium text-white md:inline-flex hidden sm:text-[12px] text-[10px]">
//               {label}
//             </p>
//           )}
//           {discount && (
//             <p className="px-2 py-1 bg-primary uppercase font-medium text-white inline-flex text-[12px]">
//               {discount}% off
//             </p>
//           )}
//         </div>
//       </div>
//       <div className="flex flex-col gap-0.5 mt-3">
//         <p className="text-[12px] uppercase font-medium tracking-wider text-gray-400">
//           {category.title}
//         </p>
//         <Link href={`/product/${slug}`}>
//           <h2 className="text-base capitalize line-clamp-1">{title}</h2>
//         </Link>
//         <div className="flex items-center gap-2">
//           {mrpPrice && <p className="text-gray-500 line-through">৳{mrpPrice}</p>}
//           {price && <p className="">৳{price}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



"use client";

import Image from "next/image";
import React from "react";
import { IoBagOutline } from "react-icons/io5";
import ProductQuickView from "./ProductQuickView";
import Link from "next/link";
import { apiBaseUrl } from "@/src/config/config";
import { TProducts } from "@/src/types";
import { useCartStore } from "@/src/store/cartStore";

interface cardProps {
  product: TProducts;
}

const ProductCard: React.FC<cardProps> = ({ product }) => {
  const {
    title,
    price,
    mrpPrice,
    category,
    thumbal_image,
    backview_image,
    label,
    discount,
    slug,
  } = product;

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    const cartData = {
      product: product,
      quantity: 1,
    };

    // ✅ Add to Zustand (with localStorage sync)
    const added = addToCart(cartData);

    if (!added) {
      alert("This product is already in your cart.");
      return;
    }

    alert(`${title} added to cart!`);
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden">
        {/* Product Thumbnail */}
        <Link href={`/product/${slug}`}>
          <Image
            src={apiBaseUrl + thumbal_image}
            alt={title}
            width={300}
            height={300}
            className="w-full h-full"
          />
        </Link>

        {/* Hover Image */}
        <Link href={`/product/${slug}`}>
          <Image
            className="top-0 absolute opacity-0 group-hover:opacity-100 hover:scale-105 duration-700 w-full h-full"
            src={apiBaseUrl + backview_image}
            alt={title}
            width={300}
            height={300}
          />
        </Link>

        {/* Add to Cart (hover button) */}
        <div className="group-hover:bottom-3 bottom-0 opacity-0 group-hover:opacity-100 absolute px-4 w-full duration-200 transition-all">
          <p
            onClick={handleAddToCart}
            className="bg-white hover:bg-primary hover:text-white w-full py-3 capitalize font-medium text-center cursor-pointer duration-700 transition-all"
          >
            Add to cart
          </p>
        </div>

        {/* Floating Icons */}
        <div className="top-5 group-hover:right-5 right-0 opacity-0 group-hover:opacity-100 duration-200 transition-all absolute flex flex-col gap-2">
          <p
            onClick={handleAddToCart}
            className="p-2 bg-white hover:bg-primary hover:text-white duration-300 cursor-pointer"
          >
            <IoBagOutline size={18} />
          </p>

          <ProductQuickView product={product} />
        </div>

        {/* Labels */}
        <div className="top-3 left-3 absolute flex gap-2">
          {label && (
            <p className="px-2 py-1 bg-primary uppercase font-medium text-white md:inline-flex hidden sm:text-[12px] text-[10px]">
              {label}
            </p>
          )}
          {discount && (
            <p className="px-2 py-1 bg-primary uppercase font-medium text-white inline-flex text-[12px]">
              {discount}% off
            </p>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-0.5 mt-3">
        <p className="text-[12px] uppercase font-medium tracking-wider text-gray-400">
          {category.title}
        </p>
        <Link href={`/product/${slug}`}>
          <h2 className="text-base capitalize line-clamp-1">{title}</h2>
        </Link>
        <div className="flex items-center gap-2">
          {mrpPrice && <p className="text-gray-500 line-through">৳{mrpPrice}</p>}
          {price && <p className="">৳{price}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
 
