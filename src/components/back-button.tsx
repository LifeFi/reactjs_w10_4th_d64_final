"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const onBackCLick = () => {
    router.back();
  };
  return (
    <div
      onClick={onBackCLick}
      className="fixed top-2 ml-2 cursor-pointer rounded-full p-2 hover:bg-slate-200 transition"
    >
      <ArrowLeftIcon className="size-6" />
    </div>
  );
}
