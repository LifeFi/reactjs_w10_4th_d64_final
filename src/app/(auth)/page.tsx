"use client";
import useSWR from "swr";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data, error, mutate } = useSWR("/api/users/me");
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  renderCount.current = renderCount.current + 1;
  console.log("Home render start: ", renderCount.current);

  useEffect(() => {
    // renderCount.current = renderCount.current + 1;
    console.log("Home rendered: ", renderCount.current);
    console.log("useSWR me data: ", data);
    if (data && !data.ok) {
      router.replace("/create-account");
    }
  }, [router, error, data]);

  const logOut = async () => {
    // console.log("logout clicked!!");
    const result = await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("logout result", result);
    router.push("/login");
  };
  return (
    <div>
      {!data || !data.ok ? (
        <div className="">Loading...</div>
      ) : (
        <div className="flex flex-col">
          <div>Home Rendering start: {renderCount.current}</div>
          <h1>Welcome: {data.name}</h1>
          <h3>Your email is: {data.email}</h3>
          <button onClick={logOut}>Log-out</button>
          {count}
          <button onClick={() => setCount((prev) => prev + 1)}>+</button>
        </div>
      )}
    </div>
  );
}
