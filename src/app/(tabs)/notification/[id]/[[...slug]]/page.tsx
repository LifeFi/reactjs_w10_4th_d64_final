import AvatarCircle from "@/components/avatar-circle";
import { TvIcon } from "@heroicons/react/24/solid";
import TestComponents from "./components/test-components";

export default function Page({ params }: any) {
  console.log(params);
  return (
    <>
      테스트입니다.
      <TvIcon />
      <AvatarCircle avatarUrl="" />
      <TestComponents />
    </>
  );
}
