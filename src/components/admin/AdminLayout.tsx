"use client";

import { ReactNode } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { RequireApprovedAdmin } from "@/components/admin/RequireApprovedAdmin";
import { Separator } from "@/components/ui/separator";
import { AdminUserMenu } from "@/components/admin/AdminUserMenu";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <RequireApprovedAdmin>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-full flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex flex-1 items-center justify-between gap-4 min-w-0">
                <h1 className="text-lg font-semibold truncate">Admin Dashboard</h1>
                <AdminUserMenu variant="header" />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </RequireApprovedAdmin>
  );
}
