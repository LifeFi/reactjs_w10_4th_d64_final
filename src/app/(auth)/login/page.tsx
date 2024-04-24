"use client";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { login } from "./actions";
import FormButton from "@/components/form-button";

export default function Login() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="flex flex-col item-center py-8 px-6 gap-4">
      <div className="flex justify-center">
        <h1>로그인</h1>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
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

        <FormButton text="로그인" />
      </form>
    </div>
  );
}
