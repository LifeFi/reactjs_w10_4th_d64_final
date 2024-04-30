import LoadingTweetSkeleton from "@/components/loading-tweet-skeleton";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logoImg from "/public/ox-logo.png";

export default function HomeLoading() {
  return (
    <div className="flex flex-col item-center py-4 gap-4">
      <div className="flex justify-center relative">
        <div className="hover:bg-blue-50 rounded-full transition">
          <Image src={logoImg} alt="ox-logo.png" width={80} height={80} />
        </div>
        <Cog6ToothIcon className=" absolute size-10 right-4 top-4 cursor-pointer bg-neutral-50 hover:bg-neutral-200 rounded-full p-1" />
        <div className=" absolute size-10 left-2 top-6 cursor-pointer bg-neutral-400 hover:bg-neutral-200 rounded-full p-1" />
      </div>
      <div className="px-2 mt-3">
        {[...Array(10)].map((_, index) => (
          <LoadingTweetSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
