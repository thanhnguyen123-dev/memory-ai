"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import { 
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup
} from "@/components/ui/sidebar";
import { api } from "@/trpc/react";

export function NavHome() {
  return (
    <SidebarGroup className="-mb-2">
      <SidebarMenuItem className="list-none">
        <SidebarMenuButton asChild tooltip="Home">
          <Link href="/">
            <Home />
            <span>Home</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
