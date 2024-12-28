"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  PackageSearch,
  ScrollText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Majesty</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard" ? "bg-muted text-primary" : "text-muted-foreground"}`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-not-allowed ${pathname === "/stocks" ? "bg-muted text-primary" : "text-muted-foreground"}`}
              >
                <PackageSearch className="h-4 w-4" />
                Stocks
              </Link>
              <Link
                href=""
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-not-allowed ${pathname === "/orders" ? "bg-muted text-primary" : "text-muted-foreground"}`}
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
              </Link>
              <Link
                href=""
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-not-allowed ${pathname === "/products" ? "bg-muted text-primary" : "text-muted-foreground"}`}
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
              <Link
                href="/recaps"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/recaps" ? "bg-muted text-primary" : "text-muted-foreground"}`}
              >
                <ScrollText className="h-4 w-4" />
                Recaps
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 brder-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Majesty</span>
                </Link>
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href=""
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-not-allowed ${pathname === "/stocks" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                >
                  <PackageSearch className="h-5 w-5" />
                  Stocks
                </Link>
                <Link
                  href=""
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-not-allowed ${pathname === "/orders" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href=""
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-not-allowed ${pathname === "/products" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="/recaps"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/recaps" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                >
                  <Package className="h-5 w-5" />
                  Recaps
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </div>
  );
}
