import LoadingTweetSkeleton from "@/components/loading-tweet-skeleton";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function ProfileLoading() {
  return (
    <div className="flex flex-col item-center py-4 gap-4 animate-pulse">
      <div className="h-40 w-full bg-neutral-400 relative">
        <Cog6ToothIcon className=" absolute size-10 right-4 top-4 cursor-pointer bg-neutral-400 hover:bg-neutral-200 rounded-full p-1" />
        <div className="absolute top-28 left-4 rounded-full size-32 p-1 bg-neutral-400 border-[4px] border-white"></div>
      </div>
      <div className="flex flex-col  mt-20 px-5 gap-3 *:bg-neutral-400 *:rounded-lg">
        <div className="w-40 h-7"></div>
        <div className="w-80 h-7"></div>
      </div>
      <div className="grid grid-cols-3 *:flex *:justify-center hover:*:bg-neutral-200 *:py-2 border-b *:transition cursor-pointer">
        <div>게시물</div>
        <div>답글</div>
        <div>마음에 들어요</div>
      </div>
      {[...Array(5)].map((_, index) => (
        <LoadingTweetSkeleton key={index} />
      ))}
    </div>
  );
}
