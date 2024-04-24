import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col item-center">
      <div className="flex justify-center">AI in X</div>
      <div className="p-20"></div>
      <div className="flex flex-col items-center w-full">
        <Link href="/create-account">시작하기</Link>
        <Link href="/login">로그인</Link>
      </div>
    </div>
  );
}
