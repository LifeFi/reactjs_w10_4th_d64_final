"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const onBackCLick = () => {
    console.log("back!!!!!");

    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/home");
    }
  };
  return (
    <div
      onClick={onBackCLick}
      className="z-10 fixed top-2 ml-2 cursor-pointer rounded-full p-2 bg-white bg-opacity-70 hover:bg-slate-200 transition"
    >
      <ArrowLeftIcon className="size-6" />
    </div>
  );
}
