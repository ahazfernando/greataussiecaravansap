"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Star, FileText, Mail, Calendar, UserCheck, Receipt, BookOpen, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Blogs", href: "/admin/blogs" },
  { icon: Calendar, label: "Events", href: "/admin/events" },
  { icon: UserCheck, label: "Event Registrations", href: "/admin/registrations" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: Mail, label: "Inquiries", href: "/admin/inquiries" },
  { icon: Receipt, label: "Quote Requests", href: "/admin/quote-requests" },
  { icon: BookOpen, label: "Brochure Requests", href: "/admin/brochure-requests" },
  { icon: Shield, label: "Warranty Claims", href: "/admin/warranty-claims" },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin" || pathname === "/admin/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-heading font-bold text-xl">G</span>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-heading font-bold text-sidebar-foreground">Great Aussie</span>
            <span className="text-xs text-sidebar-foreground/70">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

