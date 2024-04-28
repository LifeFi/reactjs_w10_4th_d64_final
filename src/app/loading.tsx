import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center pt-40">
      <Spinner size="35px" borderTopColor="#1f9bf0" borderColor="#d6edfc" />
    </div>
  );
}
