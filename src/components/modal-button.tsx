"use client";

import { useState } from "react";
import Modal from "./modal";

interface ModalButtonProps {
  icon: React.ReactNode;
  isDefaultOpen?: boolean;
  children: React.ReactNode;
}

export default function ModalButton({
  icon,
  isDefaultOpen = false,
  children,
  ...res
}: ModalButtonProps) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const toggleIsOpen = () => setIsOpen((prev) => !prev);
  return (
    <>
      <div onClick={() => setIsOpen((prev) => !prev)}>{icon}</div>
      {isOpen && (
        <Modal isOpen={isOpen} toggleIsOpen={toggleIsOpen}>
          {children}
        </Modal>
      )}
    </>
  );
}
