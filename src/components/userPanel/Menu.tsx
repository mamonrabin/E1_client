"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";


import { getUsermenuList } from "@/src/utilits/userMenuList";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


interface Submenu {
  href: string;
  label: string;
  active: boolean;
}

// interface MenuItem {
//   href: string;
//   label: string;
//   icon: React.ComponentType<{ size?: number }>;
//   active: boolean;
//   submenus: Submenu[];
// }


interface MenuItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  active: boolean;
  submenus: Submenu[];
}

// interface MenuGroup {
//   groupLabel?: string;
//   groupIcon?: React.ComponentType<{ size?: number; className?: string }>;
//   menus: MenuItem[];
// }

interface MenuGroup {
  groupLabel?: string;
  groupIcon?: React.ComponentType<{ size?: number; className?: string }>;
  menus: MenuItem[];
}

interface MenuProps {
  isCollapsed: boolean | undefined;
}

const Menu = ({ isCollapsed }: MenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const menuList: MenuGroup[] = getUsermenuList(pathname);

  // Initial open states
  const initialOpenStates = menuList.flatMap(({ menus }) =>
    menus.map(
      ({ active, submenus }) => active || submenus.some((s) => s.active)
    )
  );
  const [openStates, setOpenStates] = useState<boolean[]>(initialOpenStates);

  let menuIndex = 0;


  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    // Redirect
    router.push("/");
    // window.location.reload();
  };

  return (
    <nav className={`fixed  w-full ${isCollapsed ? "top-20" : "top-30"}`}>
      <ul className="px-2">
        {menuList.map(({ groupLabel, groupIcon: GroupIcon, menus }, index) => (
          <li className="w-full" key={index}>
            {groupLabel &&
              (isCollapsed ? (
                GroupIcon && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="ml-3 mt-4 mb-2">
                          <GroupIcon
                            size={18}
                            className="text-white/60 cursor-pointer"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        className="ml-7 rounded bg-primary "
                        side="left"
                      >
                        {/* {groupLabel} */}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              ) : (
                <p className="text-sm font-medium text-[#fff]/60 px-4 pb-2 mt-4 cursor-pointer">
                  {groupLabel}
                </p>
              ))}

            {menus.map(({ href, label, icon: Icon, active, submenus }, i) => {
              const isParentActive = active || submenus.some((s) => s.active);
              const open = openStates[menuIndex];
              const currentIndex = menuIndex;
              menuIndex++;

              return (
                <div className="w-full mb-1" key={i}>
                  <div
                    className={`inline-flex items-center h-10 ${
                      isCollapsed ? "px-2 py-2 mx-auto" : "w-50 px-2"
                    } rounded text-sm  tracking-wide transition-colors ${
                      isParentActive
                        ? "bg-gray-200 text-black"
                        : "text-white hover:bg-gray-100 hover:text-black"
                    }`}
                  >
                    {/* Main link */}
                    {isCollapsed ? (
                      submenus.length > 0 ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="flex justify-center items-center h-10 cursor-pointer">
                              <Icon size={16} />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            side="right"
                            align="start"
                            className="w-48 rounded ml-10"
                          ></DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link
                                href={href}
                                className="flex justify-center items-center h-10 w-6 cursor-pointer"
                              >
                                <Icon size={16} />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent
                              className="ml-8 rounded"
                              side="right"
                            >
                              {label}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )
                    ) : (
                      <Link
                        href={href}
                        className="flex items-center flex-1 truncate"
                      >
                        <span className="mr-2">
                          <Icon size={18} />
                        </span>
                        <span>{label}</span>
                      </Link>
                    )}

                    {submenus.length > 0 && !isCollapsed && (
                      <button
                        onClick={() =>
                          setOpenStates((prev) =>
                            prev.map((val, idx) =>
                              idx === currentIndex ? !val : val
                            )
                          )
                        }
                        className="ml-0 text-xs"
                        aria-label="Toggle submenu"
                      >
                        {open ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Submenu list */}
                  {submenus.length > 0 && open && (
                    <ul className="pl-4 text-sm mt-1 space-y-1">
                      {submenus.map((sub, j) => (
                        <li key={j}>
                          <Link
                            href={sub.href}
                            className={`block px-2 py-1 rounded transition-colors ${
                              sub.active
                                ? "bg-gray-200 text-black"
                                : "text-white hover:bg-gray-100 hover:text-black"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </li>
        ))}

        {/* Sign out */}
        <li className="w-full grow inline-flex items-end mt-5">
          
            <button
            onClick={handleLogout}
              className={`flex  text-white hover:text-primary cursor-pointer justify-center items-center h-10 border border-gray-300 rounded hover:bg-gray-100 duration-300 ${
                isCollapsed ? "px-2 h-[35px]" : "w-50"
              }`}
            >
              {isCollapsed ? <LogOut size={16} /> : "Sign out"}
            </button>
          
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
