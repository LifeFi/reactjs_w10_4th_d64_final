"use client";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { login } from "./actions";
import FormButton from "@/components/form-button";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logoImg from "/public/ox-logo.png";

export default function Login() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="flex flex-col py-8 px-10 gap-4 relative">
      <Image
        src={logoImg}
        alt="ox-logo.png"
        width={80}
        height={80}
        className="mx-auto"
      />
      <Link href="/" className="size-6 absolute left-6 top-16 ">
        <XMarkIcon />
      </Link>
      <div className="text-3xl font-bold">
        <h1>이메일로 로그인하기</h1>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          placeholder="이메일"
          type="email"
          required
          className="border rounded-md"
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          placeholder="비밀번호"
          type="password"
          minLength={4}
          required
          className="border rounded-md"
          errors={state?.fieldErrors.password}
        />

        <FormButton
          text="로그인"
          hasOverlay={true}
          className="text-lg border rounded-full py-3 mt-5 active:scale-95 hover:scale-105 transition"
        />
      </form>
    </div>
  );
}
