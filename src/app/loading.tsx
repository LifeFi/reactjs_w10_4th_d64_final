import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center pt-40">
      <Spinner size="35px" />
    </div>
  );
}
