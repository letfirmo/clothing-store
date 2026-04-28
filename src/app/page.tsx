"use client"

import { useState } from "react"
import { FiltersSidebar } from "@/src/components/organisms/FiltersSidebar/FiltersSidebar"
import { ProductGrid } from "@/src/components/organisms/ProductGrid/ProductGrid"
import { SearchBar } from "@/src/components/molecules/SearchBar/SearchBar"
import { HeroSection } from "@/src/components/organisms/HeroSection/HeroSection"
import { Pagination } from "@/src/components/molecules/Pagination/Pagination"
import { X } from "lucide-react"
import { Button } from "@/src/components/atoms/button/button"

export default function ShopPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section (Organism) */}
      <HeroSection />

      {/* 2. Breadcrumb (Pode ser uma Molecule ou simples assim) */}
      <div className="border-b border-border bg-background px-4 py-3 lg:px-8">
        <nav className="mx-auto max-w-7xl flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">Início</a>
          <span>/</span>
          <span className="text-foreground">Todos os Produtos</span>
        </nav>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* 3. Search Bar (Molecule) */}
        <SearchBar 
          totalProducts={198} 
          onFilterToggle={() => setMobileFiltersOpen(true)}
        />

        <div className="mt-8 flex gap-8">
          {/* 4. Filters (Organism) */}
          <FiltersSidebar className="hidden w-64 shrink-0 lg:block" />

          {/* 5. Mobile Overlay (Lógica de Template) */}
          {mobileFiltersOpen && (
             <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
                <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-background p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold uppercase tracking-widest">Filtros</h2>
                    <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <FiltersSidebar isMobile onClose={() => setMobileFiltersOpen(false)} />
                </div>
             </div>
          )}

          {/* 6. Product Area */}
          <div className="flex-1">
            <ProductGrid />
            <Pagination />
          </div>
        </div>
      </main>
    </div>
  )
}