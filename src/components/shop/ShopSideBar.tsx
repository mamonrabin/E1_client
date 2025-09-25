"use client";

import { Minus, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// interface productProps {
//   products:TProducts[]
// }

const ShopSideBar= ({categories,brands,colors,sizes}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showAll, setShowAll] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  // const [collapsed2, setCollapsed2] = useState(false);
  const [collapsed3, setCollapsed3] = useState(false);
  const [collapsed4, setCollapsed4] = useState(false);
  const [collapsed5, setCollapsed5] = useState(false);

  
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [defaultSubCategory, setDefaultSubCategory] = useState<string>("");

  const visibleCategories = showAll ? categories : categories.slice(0, 5);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
    const cats = searchParams.get("category")?.split(",") || [];
    
    setSelectedCategories(cats);
  }, [searchParams]);

  //  const updateParams = (type: "category", value: string) => {
  //   const newParams = new URLSearchParams(searchParams.toString());
  //   const currentValues = new Set((searchParams.get(type)?.split(",") || []).filter(Boolean));

  //   if (currentValues.has(value)) {
  //     currentValues.delete(value);
  //   } else {
  //     currentValues.add(value);
  //     console.log("Added value:", value);
  //   }

  //   if (currentValues.size > 0) {
  //     newParams.set(type, Array.from(currentValues).join(","));
  //   } else {
  //     newParams.delete(type);
  //   }

  //   router.push(`?${newParams.toString()}`);
  // };

  // Automatically select the first category and its first subcategory on initial render
  // useEffect(() => {
  //   if (categories.length > 0) {
  //     setActiveCategoryId(categories[0]._id);
  //     setDefaultSubCategory(categories[0].subCategory?.[0]?.title || "");
  //   }
  // }, []);

//   const updateParams = (type: "category" | "brand" | "color", value: string) => {
//   const newParams = new URLSearchParams(searchParams.toString());

//   // Replace category param instead of toggling
//   newParams.set(type, value);

//   router.push(`?${newParams.toString()}`);
// };

// const updateParams = (type: "category" | "brand" | "colors", value: string) => {
//   const newParams = new URLSearchParams(searchParams.toString());
//   const currentValues = new Set(
//     (searchParams.get(type)?.split(",") || []).filter(Boolean)
//   );

//   if (currentValues.has(value)) {
//     currentValues.delete(value);
//   } else {
//     currentValues.add(value);
//   }

//   if (currentValues.size > 0) {
//     newParams.set(type, Array.from(currentValues).join(","));
//   } else {
//     newParams.delete(type);
//   }

//   router.push(`?${newParams.toString()}`);
// };

const updateParams = (type: "category" | "brand" | "colors", value: string) => {
  const newParams = new URLSearchParams(searchParams.toString());

  if (type === "colors") {
    // ✅ always replace previous color with the new one
    newParams.set("colors", value);
  } else {
    // keep category and brand multi-select
    const currentValues = new Set(
      (searchParams.get(type)?.split(",") || []).filter(Boolean)
    );

    if (currentValues.has(value)) {
      currentValues.delete(value);
    } else {
      currentValues.add(value);
    }

    if (currentValues.size > 0) {
      newParams.set(type, Array.from(currentValues).join(","));
    } else {
      newParams.delete(type);
    }
  }

  router.push(`?${newParams.toString()}`);
};

  
  useEffect(() => {
  const catParam = searchParams.get("category");
  if (catParam) {
    // If multiple categories, just take the first for highlight
    setActiveCategoryId(catParam.split(",")[0]);
  }
}, [searchParams]);

  // const handleCategoryClick = (categoryId: number) => {
  //   setActiveCategoryId(categoryId);
  //   const category = categories.find((cat) => cat._id === categoryId);
  //   const firstSub = category?.subCategory?.[0]?.title || "";
  //   setDefaultSubCategory(firstSub);
  // };

  const uniqueColors = colors?.filter(
  (color, index, self) =>
    index === self.findIndex((c) => c.colorCode === color.colorCode)
);
  return (
    <div>
      {/* Categories Section */}
      <div className="border border-primary/20 p-6 rounded-sm">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <h2 className="text-base font-medium text-primary">Categories</h2>
          {collapsed ? <Plus size={18} /> : <Minus size={18} />}
        </div>

        {!collapsed && (
          <div className="flex flex-col gap-2 mt-2">
  {visibleCategories.map((category) => (
    <ul key={category._id}>
      <li
       

        onClick={() => {
          updateParams("category", category._id);
    setActiveCategoryId(category._id);
        }}
        className={`text-sm capitalize cursor-pointer hover:text-primary duration-300 ${
          activeCategoryId === category._id ? "text-primary font-semibold" : ""
        }`}
      >
        {category.title}
      </li>
    </ul>
  ))}

  {categories.length > 5 && (
    <button
      onClick={() => setShowAll(!showAll)}
      className="text-sm text-primary hover:underline w-fit duration-300 cursor-pointer"
    >
      {showAll ? "Show Less" : "Show More"}
    </button>
  )}
</div>

        )}
      </div>

      {/* Subcategories Section */}
      {/* <div className="border border-primary/20 p-6 rounded-sm mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed2(!collapsed2)}
        >
          <h2 className="text-base font-medium text-primary">Sub Category</h2>
          {collapsed2 ? <Plus size={18} /> : <Minus size={18} />}
        </div>

        {!collapsed2 && activeCategoryId !== null && (
          <div className="flex flex-col gap-2 mt-2">
            {categories
              .find((cat) => cat._id === activeCategoryId)
              ?.subCategory.map((subCat) => (
                <div
                  key={subCat._id}
                  className={`text-sm capitalize cursor-pointer hover:text-primary duration-300 ${
                    subCat.title === defaultSubCategory ? "" : ""
                  }`}
                >
                  {subCat.title}
                </div>
              ))}
          </div>
        )}
      </div> */}

      {/* brand Section */}
      <div className="border border-primary/20 p-6 rounded-sm mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed3(!collapsed3)}
        >
          <h2 className="text-base font-medium text-primary">Brand</h2>
          {collapsed3 ? <Plus size={18} /> : <Minus size={18} />}
        </div>

        {!collapsed3 &&  (
          <div className="flex flex-col gap-2 mt-2">
            {brands?.map((brand) => (
              <div
                key={brand._id}
               onClick={() => updateParams("brand", brand._id)}  // ✅ handle brand click
          className={`text-sm capitalize cursor-pointer hover:text-primary duration-300 ${
            searchParams.get("brand") === brand._id ? "text-primary font-semibold" : ""
          }`}
              >
                {brand.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* size Section */}
      <div className="border border-primary/20 p-6 rounded-sm mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed4(!collapsed4)}
        >
          <h2 className="text-base font-medium text-primary">Size</h2>
          {collapsed4 ? <Plus size={18} /> : <Minus size={18} />}
        </div>

        {!collapsed4  && (
          <div className="">
            <div className="flex flex-wrap gap-2 mt-2 capitalize text-sm list-none">
            {sizes?.map((size) => (
              <div
                key={size._id}
               onClick={() => updateParams("size", size._id)} 
          className={`px-2 py-0.5 bg-primary text-white rounded-sm hover:bg-secondary duration-300 cursor-pointer`}
              >
                {size.title}
              </div>
            ))}
          </div>
            
          </div>
        )}
      </div>

      {/* color Section */}
      <div className="border border-primary/20 p-6 rounded-sm mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed5(!collapsed5)}
        >
          <h2 className="text-base font-medium text-primary">Color</h2>
          {collapsed5 ? <Plus size={18} /> : <Minus size={18} />}
        </div>

        {!collapsed5 && (
          <div className="flex flex-wrap gap-2 mt-2 capitalize text-sm list-none">

           {uniqueColors?.map((color) => (
  <div
    key={color._id}
    onClick={() => updateParams("colors", color._id)}
    style={{ backgroundColor: color.colorCode }}
    className={`p-3 rounded-full duration-300 cursor-pointer border border-primary/40 ${
      searchParams.get("colors") === color._id
        ? "ring-2 ring-primary scale-110"
        : ""
    }`}
  />
))}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopSideBar;
