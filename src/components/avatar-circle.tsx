import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function AvatarCircle({ avatarUrl }: { avatarUrl: string }) {
  return (
    <>
      {avatarUrl ? (
        <div className="size-10 rounded-full bg-neutral-300 flex-shrink-0"></div>
      ) : (
        <UserCircleIcon className="size-10 text-neutral-500 flex-shrink-0 stroke-1" />
      )}
    </>
  );
}
