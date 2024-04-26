import { revalidatePath, revalidateTag } from "next/cache";
import { date } from "zod";
import { unstable_cache as nextCache } from "next/cache";
import LikeButton from "@/components/like-button";

async function testFn() {
  "use server";
  revalidateTag("test-1");
}

export default async function Notification() {
  // const data = await cachedTextFn();
  const clientTime = new Date().toLocaleTimeString();
  return (
    <div className="flex flex-col item-center py-8 px-6 gap-4">
      <div>Notification</div>
      {/* <h1>{data}</h1> */}
      <h1>{clientTime}</h1>

      {/* <form action={testInvalidate}>
        <button>test 1 버튼</button>
      </form> */}
      <form action={testFn}>
        <button>testFn 버튼</button>
      </form>
    </div>
  );
}
