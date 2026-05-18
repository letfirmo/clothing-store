"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/src/components/atoms/button/button"
import { HeroSection } from "@/src/components/organisms/HeroSection/HeroSection"
import { SearchBar } from "@/src/components/molecules/SearchBar/SearchBar"
import { FiltersSidebar } from "@/src/components/organisms/FiltersSidebar/FiltersSidebar"
import { ProductGrid } from "@/src/components/organisms/ProductGrid/ProductGrid"
import { Pagination } from "@/src/components/molecules/Pagination/Pagination"
import type { Product } from "@/src/components/molecules/ProductCard/ProductCard"

interface ShopPageProps {
  products: Product[]
}

export function ShopPage({ products }: ShopPageProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="border-b border-border bg-background px-4 py-3 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Início
          </Link>
          <span>/</span>
          <span className="text-foreground">Todos os Produtos</span>
        </nav>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <SearchBar
          totalProducts={products.length}
          onFilterToggle={() => setMobileFiltersOpen(true)}
          showFilterButton
        />

        <div className="mt-8 flex gap-8">
          <FiltersSidebar className="hidden w-64 shrink-0 lg:block" />

          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="absolute inset-y-0 left-0 w-full max-w-xs bg-background p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold uppercase tracking-widest">Filtros</h2>
                  <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <FiltersSidebar isMobile onClose={() => setMobileFiltersOpen(false)} />
              </div>
            </div>
          )}

          <div className="flex-1">
            <ProductGrid products={products} />
            <Pagination />
          </div>
        </div>
      </main>
    </div>
  )
}