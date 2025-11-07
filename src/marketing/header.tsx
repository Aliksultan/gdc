"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Briefcase, Moon, Sun } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NavLink } from "./navlink";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/explore", label: "Explore Careers" },
  { href: "/resume", label: "Resume Builder" },
  { href: "/interview", label: "Mock Interview" },
  // { href: "/profile", label: "Profile" },
];

export const Header = () => {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.user);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const initials = getInitials(user.name, user.email);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-border bg-background/80 px-4 sm:px-8 md:px-10 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <Link href="/">
          <div className="flex items-center gap-3 text-foreground">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-bold leading-tight tracking-tight">
              Career Assistant
            </h2>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-3 sm:gap-4 items-center">
        <Button variant="secondary" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>

        <Button
          variant="secondary"
          onClick={toggleTheme}
          size="icon"
          aria-label="Toggle theme"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>

        <div className="flex items-center gap-2">
          {!user ? (
            <Button asChild>
              <Link href="/signin">Sign in</Link>
            </Button>
          ) : (
            <Button variant="ghost" asChild className="px-2">
              <Link href="/account" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">
                  {user.email}
                </span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
