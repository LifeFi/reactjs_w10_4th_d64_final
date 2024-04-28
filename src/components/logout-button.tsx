"use client";

import { logOut } from "@/app/(tabs)/profile/[id]/[[...slug]]/actions";

export default function LogoutButton() {
  return (
    <button onClick={async () => await logOut()} className="hover:underline">
      로그아웃
    </button>
  );
}
