"use client";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import FormButton from "@/components/form-button";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import logoImg from "/public/ox-logo.png";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
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
        <h1>계정을 생성하세요</h1>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          placeholder="아이디"
          type="text"
          required
          minLength={3}
          maxLength={10}
          className="border rounded-md"
          errors={state?.fieldErrors.username}
        />
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
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          placeholder="비밀번호 확인"
          type="password"
          required
          className="border rounded-md"
          errors={state?.fieldErrors.confirm_password}
        />
        <FormButton
          text="가입하기"
          className="text-lg border rounded-full py-3 mt-5"
        />
      </form>
    </div>
  );
}
