import React from "react";
import SideBar from "./SideBar";

// import Footer from "./Footer";

const UserPanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="py-4 px-6 w-full">
        <main className="min-h-screen bg-gray-100 rounded md:p-8 p-4">
          {children}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default UserPanelLayout;
