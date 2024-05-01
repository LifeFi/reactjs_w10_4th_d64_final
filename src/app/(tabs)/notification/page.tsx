"use client";

import { getLikeStatus } from "./optimistic-actions";
import OptimisticButton from "./optimistic-button";
import { useEffect, useState } from "react";

export default function Notification() {
  // const session = await getSession();
  console.log("Notification called!!!!");

  const [likeStatus, setLikeStatus] = useState<{
    isLiked: boolean;
    likeCount: number;
  }>({ isLiked: false, likeCount: 0 });
  useEffect(() => {
    console.log("Notification useEffect called!!!!");
    getLikeStatus().then((status) => {
      console.log(status);
      setLikeStatus(status);
    });
  }, [likeStatus.isLiked]);

  return (
    <div className="flex flex-col item-center py-8 px-6 gap-4">
      <h1 className="text-2xl">Notification</h1>
      {/* <div>{Date.now()}</div> */}
      <OptimisticButton
        isLiked={likeStatus.isLiked}
        likeCount={likeStatus.likeCount}
        setLikeStatus={setLikeStatus}
      />
    </div>
  );
}
