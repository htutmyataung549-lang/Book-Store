import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PaginationProps {
  totalCount: number;
  currentPage: number;
}

export function PaginationDemo({ totalCount, currentPage }: PaginationProps) {
  // Gutendex API က တစ်ခါပို့ရင် ၃၂ အုပ် ပို့တဲ့အတွက် ၃၂ နဲ့ စားပြီး စာမျက်နှာအရေအတွက် တွက်ပါတယ်
  const totalPages = Math.ceil(totalCount / 32);

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-t border-gray-100">
      {/* --- Rows per page section --- */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
        <Select defaultValue="10">
          <SelectTrigger className="w-16 h-9" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="32">32</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* --- Numbers Pagination --- */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href={`?page=${Math.max(1, currentPage - 1)}`}
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* ပထမဆုံး စာမျက်နှာ (Page 1) */}
          <PaginationItem>
            <PaginationLink href="?page=1" isActive={currentPage === 1}>
              1
            </PaginationLink>
          </PaginationItem>

          {currentPage > 3 && <PaginationEllipsis />}

          {/* လက်ရှိရောက်နေတဲ့ စာမျက်နှာ (စာမျက်နှာ ၁ နဲ့ နောက်ဆုံးစာမျက်နှာ မဟုတ်မှသာ ပြမယ်) */}
          {currentPage > 1 && currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink href={`?page=${currentPage}`} isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage < totalPages - 2 && <PaginationEllipsis />}

          {/* နောက်ဆုံး စာမျက်နှာ (နံပါတ် ၂၀၀၀ ကျော် ဖြစ်နေမယ့် အပိုင်း) */}
          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink href={`?page=${totalPages}`} isActive={currentPage === totalPages}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext 
              href={`?page=${Math.min(totalPages, currentPage + 1)}`}
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}