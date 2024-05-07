"use client";

import { useState } from "react";

export default function ParentComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>난 부모. 아래엔 자식</div>
      <div>{count}</div>
      <button onClick={() => setCount((prev) => prev + 1)}>+1 증가 버튼</button>
      {children}
    </>
  );
}
