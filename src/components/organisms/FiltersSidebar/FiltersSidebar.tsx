"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/src/components/atoms/button/button"
import { Checkbox } from "@/src/components/atoms/checkbox/checkbox"
import { Label } from "@/src/components/atoms/label/label"
import { Slider } from "@/src/components/atoms/slider/slider"

interface FilterSection {
  title: string
  options: { label: string; value: string; count?: number }[]
}

const filterSections: FilterSection[] = [
  {
    title: "Categoria",
    options: [
      { label: "Camisetas", value: "camisetas", count: 42 },
      { label: "Calças", value: "calcas", count: 28 },
      { label: "Vestidos", value: "vestidos", count: 35 },
      { label: "Blusas", value: "blusas", count: 51 },
      { label: "Jaquetas", value: "jaquetas", count: 19 },
      { label: "Saias", value: "saias", count: 23 },
    ],
  },
  {
    title: "Tamanho",
    options: [
      { label: "PP", value: "pp" },
      { label: "P", value: "p" },
      { label: "M", value: "m" },
      { label: "G", value: "g" },
      { label: "GG", value: "gg" },
      { label: "XG", value: "xg" },
    ],
  },
  {
    title: "Cor",
    options: [
      { label: "Preto", value: "preto" },
      { label: "Branco", value: "branco" },
      { label: "Azul", value: "azul" },
      { label: "Vermelho", value: "vermelho" },
      { label: "Verde", value: "verde" },
      { label: "Bege", value: "bege" },
    ],
  },
  {
    title: "Marca",
    options: [
      { label: "Nike", value: "nike", count: 15 },
      { label: "Adidas", value: "adidas", count: 12 },
      { label: "Zara", value: "zara", count: 28 },
      { label: "H&M", value: "hm", count: 22 },
      { label: "Renner", value: "renner", count: 34 },
    ],
  },
]

interface FiltersSidebarProps {
  className?: string
  onClose?: () => void
  isMobile?: boolean
}

export function FiltersSidebar({ className, onClose, isMobile }: FiltersSidebarProps) {
  const [openSections, setOpenSections] = useState<string[]>(["Categoria", "Tamanho"])
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [priceRange, setPriceRange] = useState([0, 500])

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    )
  }

  const toggleFilter = (section: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[section] || []
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [section]: updated }
    })
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
    setPriceRange([0, 500])
  }

  const hasActiveFilters =
    Object.values(selectedFilters).some((arr) => arr.length > 0) ||
    priceRange[0] > 0 ||
    priceRange[1] < 500

  return (
    <aside className={className}>
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
        </div>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="mt-4 w-full justify-start text-muted-foreground hover:text-foreground"
        >
          Limpar todos os filtros
        </Button>
      )}

      {/* Price Range */}
      <div className="border-b border-border py-4">
        <button
          onClick={() => toggleSection("Preço")}
          className="flex w-full items-center justify-between text-sm font-medium text-foreground"
        >
          Preço
          {openSections.includes("Preço") ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.includes("Preço") && (
          <div className="mt-4 space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>R$ {priceRange[0]}</span>
              <span>R$ {priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Filter Sections */}
      {filterSections.map((section) => (
        <div key={section.title} className="border-b border-border py-4">
          <button
            onClick={() => toggleSection(section.title)}
            className="flex w-full items-center justify-between text-sm font-medium text-foreground"
          >
            {section.title}
            {openSections.includes(section.title) ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {openSections.includes(section.title) && (
            <div className="mt-3 space-y-2">
              {section.options.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <Checkbox
                    id={`${section.title}-${option.value}`}
                    checked={(selectedFilters[section.title] || []).includes(option.value)}
                    onCheckedChange={() => toggleFilter(section.title, option.value)}
                  />
                  <Label
                    htmlFor={`${section.title}-${option.value}`}
                    className="flex flex-1 cursor-pointer items-center justify-between text-sm text-muted-foreground"
                  >
                    {option.label}
                    {option.count && (
                      <span className="text-xs text-muted-foreground/70">({option.count})</span>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  )
}
