import { Navbar } from "./components/Navbar";
import { Input } from "@/components/ui/input";
import { BookIcon, Search } from "lucide-react";
import { BookCard } from "./components/BookCard";
import { PaginationDemo } from "./components/Pagination";
import { Button } from "@/components/ui/button";

interface GutendexBook {
  id: number;
  title: string;
  authors: { name: string; birth_year?: number; death_year?: number }[];
  subjects: string[];
  summaries: string[];
  formats: { [key: string]: string };
  download_count: number;
}

interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutendexBook[];
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const getBooks = async (page: string = "1"): Promise<GutendexResponse> => {
  try {
    const response = await fetch(`https://gutendex.com/books/?page=${page}`, {
      next: { revalidate: 3600 }, // 1 hour revalidation
    });

    if (!response.ok) {
      console.error(`API Fetch Error: ${response.status}`);
      return { count: 0, next: null, previous: null, results: [] };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return { count: 0, next: null, previous: null, results: [] };
  }
};

export default async function Page({ searchParams }: PageProps) {
  // searchParams ကို await လုပ်ပါ
  const params = await searchParams;

  // page number ကို integer ပြောင်းပြီး parse လုပ်ပါ
  const pageParam = params.page;
  const currentPage = parseInt(typeof pageParam === "string" ? pageParam : "1") || 1;

  // API မှ data ယူပါ
  const booksData = await getBooks(currentPage.toString());

  const books = booksData?.results || [];
  const totalCount = booksData?.count || 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="bg-[#435d7d] text-white py-20 px-4 relative overflow-hidden mt-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <BookIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Over 70,000 Free E-books</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Your Gateway to <span className="text-blue-300">Knowledge</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Access the world&apos;s greatest literature and academic resources.
            Completely free, open-source, and always available.
          </p>
          <div className="relative max-w-2xl mx-auto group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-[#435d7d]" />
            <Input
              placeholder="Search by book title, author or category..."
              className="pl-14 h-16 text-black bg-white border-none rounded-2xl shadow-2xl focus-visible:ring-4 focus-visible:ring-blue-400/50 text-lg"
            />
          </div>
        </div>
      </section>

      {/* --- BOOK GRID SECTION --- */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Books</h2>
            <p className="text-muted-foreground text-sm">Showing page {currentPage}</p>
          </div>
          
          {books.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {books.map((book: GutendexBook) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p>No books found.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- PAGINATION SECTION --- */}
      <section className="py-8 px-4 border-t bg-gray-50/50">
        <div className="container mx-auto">
          <PaginationDemo totalCount={totalCount} currentPage={currentPage} />
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="border-t bg-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © 2026 My Book Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}