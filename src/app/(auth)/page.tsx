import Image from "next/image";
import Link from "next/link";
import logoImg from "/public/ox-logo.png";
export default function Home() {
  return (
    <>
      <Image src={logoImg} alt="ox-logo.png" width={80} height={80} />
      <div className="flex flex-col px-6 gap-2">
        <div className="mt-12 text-6xl font-bold">지금 일어나고 있는 OX</div>
        <div className="mt-12 text-6xl font-bold text-twitter-blue">
          진실 or 거짓
        </div>
        <div className="mt-10 mb-5 text-3xl font-semibold">
          지금 가입하세요.
        </div>

        <Link
          href="/create-account"
          className="rounded-full border border-neutral-300 w-80 p-2 text-lg flex justify-center bg-twitter-blue text-white font-bold"
        >
          계정 만들기
        </Link>
        <div className="mt-10 mb-5 font-semibold text-lg">
          이미 OX에 가입하셨나요?
        </div>
        <Link
          href="/login"
          className="rounded-full border border-neutral-300 w-80 p-2 text-lg flex justify-center"
        >
          로그인
        </Link>
      </div>
    </>
  );
}
