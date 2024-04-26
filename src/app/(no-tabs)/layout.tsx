import BackButton from "@/components/back-button";

export default function NoTabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <BackButton />
      {children}
    </div>
  );
}
