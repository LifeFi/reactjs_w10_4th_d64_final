import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Spinner size="35px" />
    </div>
  );
}
