"use client";

import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";

export default function Nav() {
  const { mutate } = useSWRConfig();
  // const { data, error } = useSWR("/api/users/me");
  return (
    <div className="flex flex-col  mt-20">
      <Link href="/home">Home</Link>
      <Link href="/tweets/add">tweets/add</Link>
      <div className="flex gap-2">
        <nav className="flex flex-col  bg-cyan-200 items-center p-4">
          <div>== Server Action ==</div>
          <Link href="/">/</Link>
          <Link href="/create-account">Create Account</Link>
          <Link href="/login">Login</Link>
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
        <nav className="flex flex-col  bg-gray-300 items-center p-4">
          <div>== Route Handler ==</div>
          <Link href="/v1">Home</Link>
          <Link href="/v1/create-account">Create Account</Link>
          <Link href="/v1/login">Login</Link>
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
      </div>
      <Link href="/next12-page">Page Router Test</Link>
    </div>
  );
}
