import { HydrateClient } from "@/trpc/server";
import { createClient } from "@/utils/supabase/server";
import TryoutButton from "@/components/ui/tryout-button";
import { redirect } from "next/navigation";
import DashboardPage from "@/components/dashboard/dashboard-page";
export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    return <DashboardPage />;
  }
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col gap-2 items-center justify-center">
        <p>AI Agent landing page</p>
        <TryoutButton />
      </main>
    </HydrateClient>
  );
  
}