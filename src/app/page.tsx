import Image from "next/image";
import Loading from "./loading";
import Spinner from "@/components/spinner";

export default function Home() {
  return (
    <div>
      <Spinner />
      <h1>Home</h1>
    </div>
  );
}
