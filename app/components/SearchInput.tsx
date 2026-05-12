"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
      params.set("page", "1"); // Search အသစ်လုပ်ရင် page 1 က ပြန်စမယ်
    } else {
      params.delete("search");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="relative max-w-2xl mx-auto group">
      <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors ${isPending ? "text-blue-500 animate-pulse" : "text-gray-400"}`} />
      <Input
        placeholder="Search by book title, author or category..."
        className="pl-14 h-16 text-black bg-white border-none rounded-2xl shadow-2xl focus-visible:ring-4 focus-visible:ring-blue-400/50 text-lg"
        defaultValue={searchParams.get("search")?.toString()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
}