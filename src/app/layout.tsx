import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { createClient } from "@/utils/supabase/server";
import { AuthProvider } from "@/contexts/auth-context";
import SidebarLayout from "@/components/layouts/SidebarLayout";

export const metadata: Metadata = {
  title: "AI agent",
  description: "AI agent",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <AuthProvider user={user}>
            { user ? (
              <SidebarLayout>
                {children}
              </SidebarLayout>
            ) : (
              <>{children}</>
            )}
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
