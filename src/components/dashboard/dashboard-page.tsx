/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { api } from "@/trpc/react";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";  

export default function DashboardPage() {
  const { data: threadsData } = api.gmail.getThreads.useQuery();
  const [threads, setThreads] = useState<any[]>([]);

  useEffect(() => {
    if (threadsData) {
      setThreads(threadsData);
    }
  }, [threadsData]);

  return (
    <>
      <p>hello</p>
      {threads.map((thread) => (
        <p key={thread.id}>{thread.snippet}</p>
      ))}
    </>
  );
}
