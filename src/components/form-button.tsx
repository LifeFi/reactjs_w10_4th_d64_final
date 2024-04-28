"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function FormButton({
  text,
  ...res
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <button
      {...res}
      disabled={pending}
      className={`p-2 text-white bg-neutral-800 disabled:be-neutal-400 disabled:cursor-not-allowed ${res.className}`}
    >
      {text}
    </button>
  );
}
