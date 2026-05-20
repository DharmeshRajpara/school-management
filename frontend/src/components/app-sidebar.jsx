"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon, LayoutDashboard, GraduationCap, SquareUser } from "lucide-react"

// This is sample data.

export function AppSidebar({user,...props}) {
// console.log(user,7)
  const data = {
  user: {
      name: user?.name,
      email: user?.email,
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Admin",
      logo: (
        <GalleryVerticalEndIcon />
      ),
     
    },
   
  ],
  navMain: [
    {
      title: "Dashborad",
      url: "/admin",
      icon: (
        <LayoutDashboard />
      ),
      isActive: true,
    },
    {
      title: "Students",
      url: "/admin-student",
      icon: (
      <GraduationCap />
      ),
      isActive: true,
    },
    {
      title: "Faculty",
      url: "/admin-faculty",
      icon: (
       <SquareUser />
      ),
      isActive: true,
    },
  ],
  
 
}

  return (
    
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
       
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
