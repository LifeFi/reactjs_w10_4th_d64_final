import BackButton from "@/components/back-button";

export default function TweetLayout({
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
