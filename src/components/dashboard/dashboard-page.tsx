"use client";
import { api } from "@/trpc/react";

export default function DashboardPage() {
  const { data: threads = [], isLoading, error } = api.gmail.getThreads.useQuery();

  if (isLoading) return <div>Loading…</div>;
  if (error)     return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {threads.map((t) => (
        <div key={t.id} className="border rounded p-3 hover:shadow">
          <h4 className="font-medium">Thread ID: {t.id}</h4>
          <p className="text-gray-700 mt-1">{t.snippet}</p>
          <p className="text-gray-700 mt-1">{t.snippet}</p>
        </div>
      ))}
    </div>
  );
}
