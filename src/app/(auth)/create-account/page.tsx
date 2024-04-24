"use client";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import FormButton from "@/components/form-button";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col item-center py-8 px-6 gap-4">
      <div className="flex justify-center">
        <h1>안녕하세요</h1>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          placeholder="아이디"
          type="text"
          required
          minLength={3}
          maxLength={10}
          errors={state?.fieldErrors.username}
        />
        <Input
          name="email"
          placeholder="이메일"
          type="email"
          required
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
          errors={state?.fieldErrors.confirm_password}
        />
        <FormButton text="가입하기" />
      </form>
    </div>
  );
}
