"use client";

import { useState } from "react";

export default function Modal({
  isOpen,
  // onClose,
  children,
}: {
  isOpen: boolean;
  // onClose: () => void;
  children: React.ReactNode;
}) {
  const [selfKill, setSelfKill] = useState(false);
  if (!isOpen || selfKill) {
    return null;
  }

  return (
    <div
      onClick={() => setSelfKill(true)}
      className="fixed z-10 left-0 top-0  h-screen w-screen bg-opacity-60 bg-black"
    >
      <div className="flex justify-center items-center h-full">{children}</div>
    </div>
  );
}
