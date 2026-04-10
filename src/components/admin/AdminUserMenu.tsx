"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { LogOut, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

function displayNameFromUser(user: User | null): string {
  if (!user) return "";
  const n = user.displayName?.trim();
  if (n) return n;
  const email = user.email;
  if (!email) return "Admin";
  const local = email.split("@")[0] || "";
  return local
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ") || "Admin";
}

function initialsFromUser(user: User | null): string {
  if (!user) return "?";
  const name = displayNameFromUser(user);
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  const e = user.email?.[0];
  return e ? e.toUpperCase() : "?";
}

interface AdminUserMenuProps {
  /** Full-width row in the sidebar footer (default). */
  variant?: "sidebar" | "header";
}

export function AdminUserMenu({ variant = "sidebar" }: AdminUserMenuProps) {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
      router.refresh();
    } catch {
      /* ignore */
    }
  };

  if (!ready) {
    if (variant === "header") {
      return <Skeleton className="h-9 w-9 rounded-full shrink-0" />;
    }
    return (
      <div className="flex items-center gap-2 px-2 py-1.5">
        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
        <div className="grid flex-1 gap-1 group-data-[collapsible=icon]:hidden">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const name = displayNameFromUser(user);
  const email = user.email ?? "";
  const initials = initialsFromUser(user);

  const menuContent = (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            {user.photoURL ? <AvatarImage src={user.photoURL} alt="" /> : null}
            <AvatarFallback className="rounded-lg text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
            <span className="truncate font-semibold">{name}</span>
            <span className="truncate text-xs text-muted-foreground">{email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer gap-2">
        <LogOut className="h-4 w-4" />
        Log out
      </DropdownMenuItem>
    </>
  );

  if (variant === "header") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex items-center gap-2 rounded-lg border border-border bg-background px-2 py-1.5 text-sm",
              "outline-none ring-offset-background hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="Account menu"
          >
            <Avatar className="h-8 w-8">
              {user.photoURL ? <AvatarImage src={user.photoURL} alt="" /> : null}
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="hidden text-left sm:block min-w-0 max-w-[160px] md:max-w-[220px]">
              <p className="truncate text-xs font-medium leading-none">{name}</p>
              <p className="truncate text-[11px] text-muted-foreground mt-0.5">{email}</p>
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground hidden sm:block" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
          {menuContent}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={{ children: `${name} (${email})` }}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user.photoURL ? <AvatarImage src={user.photoURL} alt="" /> : null}
                <AvatarFallback className="rounded-lg text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate text-xs text-sidebar-foreground/70">{email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="bottom"
            align="start"
            sideOffset={4}
          >
            {menuContent}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
