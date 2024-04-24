"use client";

import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";

export default function Nav() {
  const { mutate } = useSWRConfig();
  // const { data, error } = useSWR("/api/users/me");
  return (
    <nav className="flex flex-col mt-10">
      <Link href="/">Home</Link>
      <Link href="/create-account">Create Account</Link>
      <Link href="/login">Login</Link>
      <Link href="/next12-page">Page Router Test</Link>
      <button
        onClick={async () => {
          const result = await mutate("api/users/me");
          console.log("@nav mutate result", result);
        }}
      >
        mutate(api/users/me)
      </button>
      {/* <div>{data ? data.id : null}</div> */}
    </nav>
  );
}
