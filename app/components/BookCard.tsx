import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, User, BookOpen } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface GutendexBook {
  id: number;
  title: string;
  authors: { name: string; birth_year?: number; death_year?: number }[];
  subjects: string[];
  summaries: string[];
  formats: { [key: string]: string };
  download_count: number;
}

interface BookCardProps {
  book: GutendexBook;
}

export function BookCard({ book }: BookCardProps) {
  const authorName = book.authors?.[0]?.name || "Unknown Author";
  const coverImg =
    book.formats?.["image/jpeg"] ||
    "https://placehold.co/400x600/435d7d/white?text=No+Cover";
  const downloadLink =
    book.formats?.["text/html"] ||
    book.formats?.["application/epub+zip"] ||
    "#";
  const category = book.subjects?.[0]?.split(',')[0] || "General";

  return (
    <Card className="group relative flex flex-col h-full max-w-[240px]: overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white">
      {/* Image Container - Aspect Ratio ကို 2/3 သုံးခြင်းဖြင့် ပုံအရွယ်အစားကို ထိန်းထားပါသည် */}
      <div className="relative w-full aspect-2/3 overflow-hidden">
        <Image
          src={coverImg}
          alt={book.title}
          fill
         sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             {/* <BookOpen className="text-white w-10 h-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" /> */}
        </div>
        {/* Badge */}
        <Badge className="absolute top-2 right-2 bg-[#435d7d] hover:bg-[#435d7d] text-white border-none shadow-sm">
          {category}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-md font-bold line-clamp-1 group-hover:text-[#435d7d] transition-colors">
          {book.title}
        </CardTitle>
        <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium">
          <User className="w-3.5 h-3.5" />
          <span className="truncate">{authorName}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 grow">
        <CardDescription className="text-xs line-clamp-2 leading-relaxed">
          {book.summaries?.[0] || "Explore this classic literary work from the Project Gutenberg collection."}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full gap-2 bg-[#435d7d] hover:bg-[#34495e] transition-colors">
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            <BookOpen className="w-4 h-4" /> View Details
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}