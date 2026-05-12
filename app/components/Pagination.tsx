import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  search?: string;
}

export function PaginationDemo({
  totalCount,
  currentPage,
  search,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / 32);

  const searchQuery = search ? `&search=${encodeURIComponent(search)}` : "";

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showMax = 5; // လက်ရှိ page ရဲ့ ဘေးတစ်ဖက်စီမှာ ပြမယ့် အရေအတွက်

    for (let i = 1; i <= totalPages; i++) {
      // အမြဲတမ်းပြမယ့် နံပါတ်များ (ပထမဆုံးစာမျက်နှာ၊ နောက်ဆုံးစာမျက်နှာ၊ လက်ရှိစာမျက်နှာနဲ့ သူ့ဘေးကနံပါတ်များ)
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - showMax && i <= currentPage + showMax)
      ) {
        pages.push(i);
      } else if (
        i === currentPage - showMax - 1 ||
        i === currentPage + showMax + 1
      ) {
        // Ellipsis ထည့်ရမယ့်နေရာ
        pages.push("...");
      }
    }
    // duplicate ဖြစ်နေတဲ့ '...' တွေကို ဖယ်ထုတ်ခြင်း
    return pages.filter((item, index) => pages.indexOf(item) === index);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              // href={`?page=${Math.max(1, currentPage - 1)}#grid-book`}
              href={`?page=${currentPage + 1}${
                searchQuery ? `&search=${searchQuery}` : ""
              }#grid-book`}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {/* Dynamic Page Numbers */}
          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={`?page=${page}${
                    search ? `&search=${encodeURIComponent(search)}` : ""
                  }#grid-book`}
                  isActive={currentPage === page}
                  className={
                    currentPage === page
                      ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600"
                      : "dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                  }
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              // href={`?page=${Math.min(totalPages, currentPage + 1)}#grid-book`}
              href={`?page=${Math.min(totalPages, currentPage + 1)}${search ? `&search=${encodeURIComponent(search)}` : ""}#grid-book`}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* User အတွက် အချက်အလက်ပြပေးခြင်း */}
      <p className="text-sm text-muted-foreground">
        Total {totalCount.toLocaleString()} books found (Page {currentPage} of{" "}
        {totalPages})
      </p>
    </div>
  );
}
