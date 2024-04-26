import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function AvatarCircle({
  avatarUrl,
  size = 10,
}: {
  avatarUrl: string | undefined | null;
  size?: number;
}) {
  return (
    <>
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={avatarUrl}
          width={size * 4}
          height={size * 4}
          className={`size-${size} rounded-full bg-neutral-300 flex-shrink-0`}
        ></Image>
      ) : (
        <UserCircleIcon
          className={`size-${size} text-neutral-500 flex-shrink-0 stroke-1`}
        />
      )}
    </>
  );
}
