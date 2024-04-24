import Link from "next/link";
import { useEffect, useState } from "react";

export default function Next12Page() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("/api/page-router-test")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <h1>Page Router Test</h1>
      <h3>API Routes Response: {JSON.stringify(data)} </h3>
      <Link href="/">Go to Home</Link>
    </>
  );
}
