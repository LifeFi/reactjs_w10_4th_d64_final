import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { HTMLAttributes } from "react";

export default function AvatarCircle({
  avatarUrl,
  size = 10,
  ...res
}: {
  avatarUrl: string | undefined | null;
  size?: number;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      {avatarUrl ? (
        <Image
          src={`${avatarUrl}/avatar`}
          alt={avatarUrl}
          width={size * 4}
          height={size * 4}
          className={`size-${size} rounded-full bg-neutral-300 flex-shrink-0 ${res.className}`}
        ></Image>
      ) : (
        <UserCircleIcon
          className={`size-${size} text-neutral-500 flex-shrink-0 stroke-1 ${res.className}`}
        />
      )}
    </>
  );
}
