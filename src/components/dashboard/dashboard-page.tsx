"use client";

import { api } from "@/trpc/react";
import { useAuth } from "@/contexts/auth-context";
export default function DashboardPage() {
  const { data } = api.hello.hello.useQuery();
  const { user } = useAuth();

  return (
    <>
      <p>hello</p>
      <p>{data}</p>
      <p>{user?.email}</p>
    </>
  );
}
