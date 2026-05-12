import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface GutendexBook {
  id: number;
  title: string;
  authors: { name: string; birth_year?: number; death_year?: number }[];
  subjects: string[];
  summaries: string[];
  formats: { [key: string]: string };
  download_count: number;
}

const getDetails = async (id: string): Promise<GutendexBook | null> => {
  const response = await fetch(`https://gutendex.com/books/${id}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
};

export default async function BookDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const book = await getDetails(id);

  if (!book) {
    return <div className="text-center py-20">Book not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 md:py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
          {/* Cover Image */}
          <div className="md:w-1/3 bg-gray-200 relative min-h-100">
            <Image
              src={
                book.formats["image/jpeg"] ||
                "https://via.placeholder.com/400x600?text=No+Cover"
              }
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Book Info */}
          <div className="p-8 md:w-2/3 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-black mb-4 text-slate-800 leading-tight">
              {book.title}
            </h1>

            <p className="text-xl text-[#435d7d] font-medium mb-6">
              {/* Error ပြင်ဆင်ချက်: a ရဲ့ type က book ရဲ့ author object ဖြစ်ရပါမယ် */}
              {/* By: {book.authors.map((a) => a.name).join(", ") || "Unknown Author"} */}
              By: {book.authors[0].name} {""} , Date of Birth:{" "}
              {book.authors[0]?.birth_year}
            </p>

            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                Subjects
              </h3>
              <div className="flex flex-wrap gap-2">
                {book.subjects
                  .slice(0, 5)
                  .map((subject: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-[#435d7d] text-xs px-3 py-1.5 rounded-md border border-blue-100"
                    >
                      {subject}
                    </span>
                  ))}
              </div>
            </div>

            <div className="mb-4 text-sm text-gray-500">{book.summaries}</div>

            <div className="flex flex-wrap gap-4">
              <a
                href={book.formats["text/html"] || "#"}
                target="_blank"
                className="bg-[#435d7d] text-white px-8 py-3 rounded-lg hover:bg-[#34495e] transition-all font-semibold shadow-lg shadow-blue-900/20"
              >
                Read Online
              </a>
              <button className="border-2 border-gray-200 text-gray-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition-all font-semibold">
                Download
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-400">
              Downloads: {book.download_count.toLocaleString()} times
            </div>
            <Link href={'/'}>
            <Button   className="bg-[#435d7d] text-white w-full mt-4  py-6 rounded-lg hover:bg-[#34495e] transition-all font-semibold shadow-lg shadow-blue-900/20">Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
