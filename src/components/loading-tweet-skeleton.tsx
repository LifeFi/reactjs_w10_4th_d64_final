export default function LoadingTweetSkeleton() {
  return (
    <div className="flex animate-pulse gap-3 px-3">
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
  );
}
