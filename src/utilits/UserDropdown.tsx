"use client";

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaRegUser } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { TUser } from '../types';
import Link from 'next/link';

interface UserProps {
    user:TUser
}

const UserDropdown:React.FC<UserProps> = ({user}) => {

    const router = useRouter();

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("accessToken"); // if you store jwt
    localStorage.removeItem("user");  // if you store user object

    // Redirect
    router.push("/");
    window.location.reload();
  };
    return (
       <DropdownMenu>
  <DropdownMenuTrigger className='outline-none'>
    <p className="lg:flex hidden items-center gap-2 cursor-pointer">
              <span>
                <FaRegUser size={16} />
              </span>
              <span>{user.name}</span>
            </p>
  </DropdownMenuTrigger>
  <DropdownMenuContent className='mt-4 rounded-[1px]'>
    <DropdownMenuItem className='cursor-pointer'>
      <Link href="/profile">My Account</Link>
    </DropdownMenuItem>
    <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    );
};

export default UserDropdown;