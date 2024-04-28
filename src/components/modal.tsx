"use client";

import { useState } from "react";

export default function Modal({
  isOpen,
  toggleIsOpen,
  children,
}: {
  isOpen: boolean;
  toggleIsOpen: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) {
    return null;
  }
  const handleInnerClick = (event: React.MouseEvent<HTMLElement>) => {
    // 이벤트 전파를 중지하여 바깥쪽 div의 이벤트 핸들러가 호출되지 않도록 함
    event.stopPropagation();
  };

  return (
    <div
      onClick={toggleIsOpen}
      className="fixed z-10 left-0 top-0 h-screen w-screen bg-opacity-40 bg-black flex flex-justify-center items-center"
    >
      <div onClick={handleInnerClick} className="mx-auto">
        {children}
      </div>
    </div>
  );
}
