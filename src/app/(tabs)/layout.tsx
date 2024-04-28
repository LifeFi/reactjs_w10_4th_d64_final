import TabBar from "@/components/tab-bar";
import getSession from "@/lib/session";

export default async function TabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <div>
      {children}
      <TabBar userId={session.id!} />
    </div>
  );
}
