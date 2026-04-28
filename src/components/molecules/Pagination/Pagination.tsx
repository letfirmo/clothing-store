import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/src/components/atoms/button/button"

export function Pagination() {
  return (
    <nav 
      role="navigation" 
      aria-label="paginação" 
      className="mt-12 flex items-center justify-center gap-2 border-t border-gray-100 pt-8"
    >
      {/* Botão Anterior */}
      <Button variant="outline" size="sm" className="gap-1 px-3" disabled>
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Anterior</span>
      </Button>

      {/* Números das Páginas */}
      <div className="flex items-center gap-1">
        <Button variant="default" size="sm" className="h-9 w-9 bg-black text-white">
          1
        </Button>
        <Button variant="ghost" size="sm" className="h-9 w-9">
          2
        </Button>
        <Button variant="ghost" size="sm" className="h-9 w-9">
          3
        </Button>
        
        <div className="flex h-9 w-9 items-center justify-center">
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </div>

        <Button variant="ghost" size="sm" className="h-9 w-9">
          12
        </Button>
      </div>

      {/* Botão Próximo */}
      <Button variant="outline" size="sm" className="gap-1 px-3">
        <span className="hidden sm:inline">Próximo</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}