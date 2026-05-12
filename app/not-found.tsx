import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Icon ပိုင်း */}
      <div className="relative mb-8">
        <Ghost className="w-24 h-24 text-gray-200 animate-bounce" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="text-8xl font-black text-[#435d7d]/10">404</span>
        </div>
      </div>

      {/* စာသားပိုင်း */}
      <h1 className="text-4xl font-bold text-slate-800 mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-500 max-w-md mb-10 leading-relaxed">
        Oops! It looks like the book you are looking for has been misplaced or 
        the page has moved to another shelf in our digital library.
      </p>

      {/* ခလုတ်များ */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-[#435d7d] hover:bg-[#34495e] px-8 h-12 rounded-full shadow-lg transition-all">
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="border-[#435d7d] text-[#435d7d] hover:bg-blue-50 px-8 h-12 rounded-full">
          <Link href="/#grid-book" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search Books
          </Link>
        </Button>
      </div>

      {/* အောက်ခြေ အလှဆင်စာသား */}
      <div className="mt-16 pt-8 border-t border-gray-100 w-full max-w-xs text-gray-400 text-sm">
       &ldquo;Not all those who wander are lost, but this page definitely is.&rdquo;
      </div>
    </div>
  );
}