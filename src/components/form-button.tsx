"use client";

import Loading from "@/app/loading";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  hasOverlay?: boolean;
}

export default function FormButton({
  text,
  hasOverlay = false,
  ...res
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <>
      {hasOverlay && pending && (
        <div
          className="fixed z-30 left-0 top-0 w-full h-screen bg-black bg-opacity-10 flex justify-center items-center "
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {<Loading />}
        </div>
      )}

      <button
        {...res}
        disabled={pending}
        className={`p-2 text-white bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:animate-pulse  ${res.className}`}
      >
        {text}
      </button>
    </>
  );
}
