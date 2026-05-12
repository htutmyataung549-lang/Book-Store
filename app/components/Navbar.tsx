"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur px-4 md:px-8 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* --- LOGO --- */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-2xl text-[#435d7d] hover:opacity-90 transition-opacity"
        >
          <BookOpen className="w-8 h-8" />
          <span>MM-Library</span>
        </Link>

        {/* --- DESKTOP NAVIGATION (Links) --- */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-[#435d7d] transition-colors">
            Home
          </Link>
          <Link
            href="/#grid-book"
            className="hover:text-[#435d7d] transition-colors"
          >
            Browse Books
          </Link>
          <Link href="/contact" className="hover:text-[#435d7d]">
            Contact Us
          </Link>
          <Link
            href="/about"
            className="hover:text-[#435d7d] transition-colors"
          >
            About
          </Link>
        </div>

        {/* --- DESKTOP AUTH BUTTONS --- */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-[#435d7d]"
          >
            Sign Up
          </Button>
          <Button className="bg-[#435d7d] hover:bg-[#34495e] shadow-md px-6">
            Login
          </Button>
        </div>

        {/* --- MOBILE MENU (Hamburger) --- */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Menu className="w-6 h-6 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-70">
              <SheetTitle className="flex items-center gap-2 text-[#435d7d] border-b pb-4 mb-6">
                <BookOpen className="w-6 h-6" /> MM-Library
              </SheetTitle>

              <div className="flex flex-col gap-6">
                {/* Mobile Links */}
                <nav className="flex flex-col gap-4 text-lg font-medium text-gray-600">
                  <Link
                    href="/"
                    className="hover:text-[#435d7d] active:text-[#435d7d]"
                  >
                    Home
                  </Link>

                  <Link href="/#grid-book" className="hover:text-[#435d7d]">
                    Browse Books
                  </Link>

                  <Link href="/contact" className="hover:text-[#435d7d]">
                    Contact
                  </Link>

                  <Link href="/about" className="hover:text-[#435d7d]">
                    About Us
                  </Link>
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-3 pt-6 border-t">
                  <Button variant="outline" className="w-full py-6">
                    Sign Up
                  </Button>
                  <Button className="w-full py-6 bg-[#435d7d]">Login</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
