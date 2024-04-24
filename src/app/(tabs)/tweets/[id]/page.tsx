import db from "@/lib/db";
import Image from "next/image";

async function getTweet(id: string) {
  const tweet = await db.tweet.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return tweet;
}

export default async function Tweet({
  params: { id },
}: {
  params: { id: string };
}) {
  const tweet = await getTweet(id);
  return (
    <div className="flex flex-col item-center py-8 px-6 gap-4">
      <div>Tweet Detail: {id}</div>
      <div className="flex overflow-x-scroll gap-1 transition">
        {JSON.parse(tweet?.photos ?? "[]").map((photoUrl: string) => (
          <Image
            key={photoUrl}
            src={`${photoUrl}/public`}
            width={320}
            height={320}
            alt={photoUrl}
            className="size-80 aspect-square border-neutral-300 bg-cover rounded-2xl relative"
          />
          // <div>{photoUrl}</div>
        ))}
      </div>
      <div>{tweet?.content}</div>
      <div>{tweet?.createdAt.toLocaleDateString()}</div>
    </div>
  );
}
