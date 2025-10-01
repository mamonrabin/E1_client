import React from "react";
import profile from "@/src/assets/images/profile.jpg";
import Image from "next/image";
import { SquarePen } from "lucide-react";
import Link from "next/link";
const page = () => {
  return (
    <div className="">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex md:flex-row flex-col items-start gap-3">
          <div className="w-[80px] h-[80px]">
            <Image
              src={profile}
              alt="image"
              width={100}
              height={100}
              className="w-full h-full rounded"
            />
          </div>

          <div>
            <h2 className="md:text-2xl text-xl font-medium">Al Mamon</h2>
            <p className="text-gray-500">almamon757@gmail.com</p>
          </div>
        </div>
        <Link href="/edit-profile">
          <div className="flex items-center gap-2 bg-primary text-white p-2 text-sm font-medium rounded hover:bg-secondary cursor-pointer duration-300">
            <p>
              <SquarePen size={16} />
            </p>
            <p>Edit Profile</p>
          </div>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Personal Information</h2>

        <div className="flex md:flex-row flex-col md:items-center md:gap-30 gap-4 mt-4">
          <ul className="flex flex-col gap-2 text-gray-500">
            <li>Your Name</li>
            <li>Occupation</li>
            <li>Phone</li>
            <li>Gender</li>
            <li>Email</li>
            <li>Country</li>
            <li>Nationality</li>
          </ul>
          <ul className="flex flex-col gap-2 font-medium">
            <li>Al Mamon</li>
            <li>N/A</li>
            <li>01746770324</li>
            <li>Male</li>
            <li>almamon757@gmail.com</li>
            <li>Bangladeshi</li>
            <li>Bangladeshi</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
