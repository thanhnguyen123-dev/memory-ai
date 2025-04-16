import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

import { currentUser } from "@clerk/nextjs/server";
import SidebarLayout from "@/layouts/sidebar-layout";

export const metadata: Metadata = {
  title: "T3 with Clerk template",
  description: "T3 with Clerk template",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await currentUser();

  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <ClerkProvider>
          <TRPCReactProvider>
            {user ? (
              <SidebarLayout>{children}</SidebarLayout>
            ) : (
              <>{children}</> 
            )}
          </TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
