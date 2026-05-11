// components/Navbar.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, BookOpen } from "lucide-react"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div className="flex items-center gap-2 font-bold text-2xl text-primary">
        <BookOpen className="w-8 h-8" />
        <span>MM-Library</span>
      </div>
      
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="find books..."
          className="pl-8 w-full rounded-full"
        />
      </div>

      <div className="flex gap-4">
        <Button variant="ghost">Sign Up</Button>
        <Button>Login</Button>
      </div>
    </nav>
  )
}