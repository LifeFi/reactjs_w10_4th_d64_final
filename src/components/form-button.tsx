"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function FormButton({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="p-2 text-white bg-neutral-800 disabled:be-neutal-400 disabled:cursor-not-allowed"
    >
      {text}
    </button>
  );
}
