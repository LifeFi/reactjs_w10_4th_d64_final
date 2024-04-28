import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function HomeLoading() {
  return (
    <div className="flex flex-col item-center py-4 gap-4">
      <div className="flex justify-center relative">
        <div className="hover:bg-blue-50 rounded-full transition">
          <Image src="/ox-logo.png" alt="ox-logo.png" width={80} height={80} />
        </div>
        <Cog6ToothIcon className=" absolute size-10 right-4 top-4 cursor-pointer bg-neutral-50 hover:bg-neutral-200 rounded-full p-1" />
        <div className=" absolute size-10 left-3 top-6 cursor-pointer bg-neutral-400 hover:bg-neutral-200 rounded-full p-1" />
      </div>
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex animate-pulse gap-3 px-3">
          <div className="size-10 rounded-full bg-neutral-400"></div>
          <div className="flex-1 flex flex-col gap-3 *:rounded-lg">
            <div className="flex gap-3 *:bg-neutral-400 *:rounded-lg">
              <div className="w-40 h-7"></div>
              <div className="w-20 h-7"></div>
            </div>
            <div className="flex flex-col gap-3 *:bg-neutral-400 *:rounded-lg">
              <div className="w-96 h-7"></div>
              <div className="w-40 h-7"></div>
            </div>
            <div className="w-full h-80 bg-neutral-400 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
