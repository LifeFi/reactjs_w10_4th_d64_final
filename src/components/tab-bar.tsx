"use client";

import {
  HomeIcon as SolidHomeIcon,
  MagnifyingGlassIcon as SolidMagnifyingGlassIcon,
  UsersIcon as SolidUsersIcon,
  BellIcon as SolidBellIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";

import {
  HomeIcon as OutlineHomeIcon,
  MagnifyingGlassIcon as OutlineMagnifyingGlassIcon,
  UsersIcon as OutlineUersIcon,
  BellIcon as OutlineBellIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar({ userId }: { userId: number }) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="fixed bottom-0 w-full max-w-screen-sm grid grid-cols-5 px-5 py-3 bg-white border-t box-border *:flex *:justify-center *:*:rounded-full *:*:p-1 hover:*:*:scale-125 hover:*:*:bg-neutral-100  *:transition ">
      <Link href="/home">
        {pathname === "/home" ? (
          <SolidHomeIcon className="size-9" />
        ) : (
          <OutlineHomeIcon className="size-9" />
        )}
      </Link>
      <Link href="/search">
        {pathname === "/search" ? (
          <SolidMagnifyingGlassIcon className="size-9 stroke-black stroke-[1.5]" />
        ) : (
          <OutlineMagnifyingGlassIcon className="size-9" />
        )}
      </Link>
      <Link href="/community">
        {pathname === "/community" ? (
          <SolidUsersIcon className="size-9" />
        ) : (
          <OutlineUersIcon className="size-9" />
        )}
      </Link>
      <Link href="/notification">
        {pathname === "/notification" ? (
          <SolidBellIcon className="size-9" />
        ) : (
          <OutlineBellIcon className="size-9" />
        )}
      </Link>
      <Link href={`/profile/${userId}`}>
        {pathname === `/profile/${userId}` ? (
          <SolidUserIcon className="size-9" />
        ) : (
          <OutlineUserIcon className="size-9" />
        )}
      </Link>
    </div>
  );
}
