import { Navbar } from "./components/Navbar";
import { BookIcon } from "lucide-react";
import { BookCard } from "./components/BookCard";
import { PaginationDemo } from "./components/Pagination";
import { SearchInput } from "./components/SearchInput";
import Link from "next/link";

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

const getBooks = async (
  page: string = "1",
  query: string = ""
): Promise<GutendexResponse> => {
  try {
    const response = await fetch(
      `https://gutendex.com/books/?page=${page}${
        query ? `&search=${encodeURIComponent(query)}` : ""
      }`,
      {
        next: { revalidate: 3600 }, // 1 hour revalidation
      }
    );

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
  const currentPage =
    parseInt(typeof pageParam === "string" ? pageParam : "1") || 1;

  const query = typeof params.search === "string" ? params.search : "";
  // API မှ data ယူပါ
  const booksData = await getBooks(currentPage.toString(), query);

  // console.log(booksData);

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
            <span className="text-sm font-medium">
              Over 70,000 Free E-books
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Your Gateway to <span className="text-blue-300">Knowledge</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Access the world&apos;s greatest literature and academic resources.
            Completely free, open-source, and always available.
          </p>

          <SearchInput />
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-[#435d7d]">70k+</h3>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                E-books
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#435d7d]">100%</h3>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                Free Access
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#435d7d]">24/7</h3>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                Available
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#435d7d]">Global</h3>
              <p className="text-gray-500 text-sm uppercase tracking-wider">
                Library
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CATEGORIES SECTION --- */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-6 text-gray-700">
            Explore by Popular Subjects
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Fiction",
              "Science",
              "History",
              "Romance",
              "Mystery",
              "Philosophy",
            ].map((subject) => (
              <Link
                key={subject}
                href={`/?search=${subject}#grid-book`}
                className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-[#435d7d] hover:text-[#435d7d] transition-all shadow-sm"
              >
                {subject}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOOK GRID SECTION --- */}
      <section id="grid-book" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Books</h2>
            <p className="text-muted-foreground text-sm">
              Showing page {currentPage}
            </p>
          </div>

          {books.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
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
          <PaginationDemo
            totalCount={totalCount}
            currentPage={currentPage}
            search={query}
          />
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      {/* --- FEATURES SECTION --- */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 text-slate-800">
              Why MM-Library?
            </h2>
            <p className="text-gray-500 text-lg">
              Discover the best features of our digital library
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Unlimited Reading */}
            <div className="p-8 rounded-2xl bg-blue-50 border border-blue-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#435d7d] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookIcon className="text-white w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-800">
                Unlimited Reading
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Access a vast collection of timeless classics and modern
                academic works without any subscription fees or hidden costs.
              </p>
            </div>

            {/* Feature 2: High Quality Downloads (New) */}
            <div className="p-8 rounded-2xl bg-indigo-50 border border-indigo-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#435d7d] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-800">
                Multiple Formats
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Download your favorite books in EPUB, PDF, or Kindle formats to
                enjoy offline reading on any of your personal devices.
              </p>
            </div>

            {/* Feature 3: Always Available (New) */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#435d7d] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-800">
                Open 24/7
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Our digital doors are never closed. Explore the world of
                literature anytime, anywhere, with our fast and reliable library
                servers.
              </p>
            </div>
          </div>
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
