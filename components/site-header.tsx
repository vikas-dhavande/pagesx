"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/#features", label: "Features" },
  { href: "/#process", label: "Process" },
  { href: "/drive", label: "Drive" },
  { href: "/chat", label: "Chat" },
];

export function SiteHeader() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  return (
    <header className="relative z-20">
      <div className="flex items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/70 text-sm font-semibold tracking-[0.24em] text-[color:var(--accent)] shadow-[0_12px_30px_rgba(0,0,0,0.04)] backdrop-blur transition group-hover:scale-105">
            PX
          </span>
          <div className="space-y-0.5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--muted)]">
              PagesX
            </p>
            <p className="text-sm text-[color:var(--foreground)]">
              Crafted web experiences
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            {navigation.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle(), 
                      "bg-transparent text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors"
                    )}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 ring-offset-background transition-all hover:ring-2 hover:ring-accent/50">
                      <Avatar className="h-10 w-10 shadow-sm border border-border/50">
                        <AvatarImage src={user.user_metadata.avatar_url} alt={user.email ?? ""} />
                        <AvatarFallback className="bg-accent text-white font-medium">
                          {user.email?.charAt(0).toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.user_metadata.full_name || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/drive" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-destructive focus:bg-destructive/10 cursor-pointer" 
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={() => signInWithGoogle()}
                  variant="default"
                  className="rounded-full bg-[color:var(--accent)] px-8 py-6 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.1)] transition hover:bg-[color:var(--accent-strong)] hover:scale-105 active:scale-95"
                >
                  Log In
                </Button>
              )}
            </>
          )}

          {/* Fallback during loading */}
          {loading && (
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
          )}
        </div>
      </div>
    </header>
  );
}
