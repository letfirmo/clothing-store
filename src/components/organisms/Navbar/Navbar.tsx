"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react"
import { Button } from "@/src/components/atoms/button/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/atoms/dropdown-menu/dropdown-menu"

const categories = [
  { name: "Feminino", href: "#feminino" },
  { name: "Masculino", href: "#masculino" },
  { name: "Acessórios", href: "#acessorios" },
  { name: "Calçados", href: "#calcados" },
  { name: "Promoções", href: "#promocoes" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight text-foreground">MODA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          <Link
            href="/"
            className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
          >
            Início
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground">
                Categorias
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {categories.map((category) => (
                <DropdownMenuItem key={category.name} asChild>
                  <Link href={category.href}>{category.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="#novidades"
            className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
          >
            Novidades
          </Link>
          <Link
            href="#contato"
            className="text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
          >
            Contato
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-4">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favoritos</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground">
            <User className="h-5 w-5" />
            <span className="sr-only">Conta</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative text-foreground">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              3
            </span>
            <span className="sr-only">Carrinho</span>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-x-4 lg:hidden">
          <Button variant="ghost" size="icon" className="relative text-foreground">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              3
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-4 pb-4">
            <Link
              href="/"
              className="block py-2 text-base font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Início
            </Link>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block py-2 text-base font-medium text-muted-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="#novidades"
              className="block py-2 text-base font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Novidades
            </Link>
            <Link
              href="#contato"
              className="block py-2 text-base font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
