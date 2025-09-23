import React from "react";

const ProfileEdit = () => {
  return (
    <div className="mt-4">
      <form className="flex flex-col gap-4">
        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Name</label>
            <input
              type="text"
              placeholder="Al Mamon"
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          {/* Phone Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Phone</label>
            <input
              type="text"
              placeholder="01746770324"
              className="border px-4 py-2 rounded w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Marital Status</label>
            <select className="border px-4 py-2 rounded w-full">
              <option value="">Selete</option>
              <option value="">Married</option>
              <option value="">Unmarried</option>
            </select>
          </div>

          {/* Phone Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Gender</label>
            <select className="border px-4 py-2 rounded w-full">
              <option value="">Selete</option>
              <option value="">Male</option>
              <option value="">Female</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Date of Birth</label>
            <input
              type="date"
              placeholder="Al Mamon"
              className="border px-4 py-2 rounded w-full"
            />
          </div>

          {/* Phone Field */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Occupation</label>
            <input
              type="text"
              placeholder="Occupation.."
              className="border px-4 py-2 rounded w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Email</label>
            <input
              type="email"
              placeholder="almamon757@gmail.com"
              className="border px-4 py-2 rounded w-full"
            />
          </div>
        </div>

        <div className="">
          <input
            type="submit"
            value="Update Profile"
            className="border px-4 py-2 rounded inline-flex bg-primary text-white cursor-pointer hover:bg-secondary duration-300"
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
