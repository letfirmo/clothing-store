"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag, Eye } from "lucide-react"
import { Button } from "@/src/components/atoms/button/button"
import { Badge } from "@/src/components/atoms/badge/badge"
import { cn } from "@/src/lib/utils"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  category?: string
  isNew?: boolean
  isSale?: boolean
  colors?: string[]
  sizes?: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const productHref = `/product/${product.id}`

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-muted">
        <Link href={productHref} aria-label={`Ver detalhes de ${product.name}`}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-all duration-500",
                isHovered && product.hoverImage ? "opacity-0" : "opacity-100"
              )}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted via-background to-muted text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Sem imagem
            </div>
          )}
          {product.hoverImage && product.image && (
            <Image
              src={product.hoverImage}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-all duration-500",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">Novo</Badge>
          )}
          {product.isSale && discount > 0 && (
            <Badge className="bg-accent text-accent-foreground">-{discount}%</Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-3 top-3 z-20 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background",
            isFavorite && "text-red-500"
          )}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </Button>

        {/* Quick Actions */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-2 bg-background/90 p-3 backdrop-blur-sm transition-all duration-300",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          )}
        >
          <Button size="sm" className="flex-1 gap-2">
            <ShoppingBag className="h-4 w-4" />
            Adicionar
          </Button>
          <Button asChild variant="outline" size="icon" className="h-9 w-9">
            <Link href={productHref} aria-label={`Abrir detalhes de ${product.name}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1">
        {product.category && (
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.category}
          </p>
        )}
        <h3 className="text-sm font-medium text-foreground line-clamp-2 text-balance">
          {product.name}
        </h3>
        
        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 pt-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-base font-semibold text-foreground">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1 pt-1">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="px-2 py-0.5 text-xs border border-border rounded text-muted-foreground"
              >
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
