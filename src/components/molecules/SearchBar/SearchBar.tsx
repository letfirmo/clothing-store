"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/src/components/atoms/input/input"
import { Button } from "@/src/components/atoms/button/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/atoms/select/select"

const sortOptions = [
  { value: "relevance", label: "Mais relevantes" },
  { value: "newest", label: "Mais recentes" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "best-selling", label: "Mais vendidos" },
]

interface SearchBarProps {
  totalProducts?: number
  onFilterToggle?: () => void
  showFilterButton?: boolean
}

export function SearchBar({ totalProducts = 198, onFilterToggle, showFilterButton }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevance")

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar produtos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Mobile Filter Button */}
        {showFilterButton && (
          <Button
            variant="outline"
            onClick={onFilterToggle}
            className="lg:hidden"
          >
            Filtros
          </Button>
        )}

        {/* Results Count */}
        <p className="hidden text-sm text-muted-foreground sm:block">
          {totalProducts} produtos encontrados
        </p>

        {/* Sort Select */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
