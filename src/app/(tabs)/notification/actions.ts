"use server";
import { unstable_cache as nextCache } from "next/cache";

async function testInvalidate() {
  "use server";

  // await new Promise((r) => setTimeout(r, 2000));
  console.log("testInvalidate ======================");

  return new Date().toLocaleTimeString();
}
export const cachedTextFn = nextCache(testInvalidate, ["test"], {
  tags: ["test-1"],
});
