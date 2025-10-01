
import ProfileEdit from "@/src/form/ProfileEdit";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <h2 className="text-xl font-medium">Edit Profile</h2>
        <Link href="/profile">
          <div className="flex items-center gap-2 bg-primary text-white p-2 text-sm font-medium rounded hover:bg-secondary cursor-pointer duration-300">
            <p>
              <Eye size={16} />
            </p>
            <p>View Profile</p>
          </div>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <ProfileEdit />
      </div>
    </div>
  );
};

export default page;
