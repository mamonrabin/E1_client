import Link from "next/link";
import React from "react";

const Breadcrumb = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center flex-wrap gap-2 md:text-base text-sm font-medium text-primary">
      <Link href="/">
        <p className="hover:text-secondary duration-300 cursor-pointer">Home</p>
      </Link>
      <p>/</p>
      <p>{title}</p>
    </div>
  );
};

export default Breadcrumb;
