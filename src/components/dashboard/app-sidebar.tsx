"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  User,
  CreditCard,
  FolderDot,
  FolderGit2
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavSettings } from "@/components/dashboard/nav-settings";
import { NavUser } from "@/components/dashboard/nav-user";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavHome } from "@/components/dashboard/nav-home";
// Sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Workspace",
      url: "/",
      icon: FolderDot,
      isActive: true,
      items: [
        {
          title: "Repository Test",
          url: "/",
          icon: FolderGit2
        }
      ],
    },
  ],
  settings: [
    {
      name: "User Profile",
      url: "/",
      icon: User,
    },
    {
      name: "Billing",
      url: "/",
      icon: CreditCard,
    }
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavHome />
        <NavMain items={data.navMain} />
        <NavSettings settings={data.settings} />
      </SidebarContent>
      <SidebarFooter>
        <TeamSwitcher teams={data.teams} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
