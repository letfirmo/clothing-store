import { z } from "zod"
import { supabase } from "@/src/lib/supabase"
import { ProductSchema } from "@/src/lib/schemas"
import { ShopPage } from "@/src/components/templates/ShopPage/ShopPage"
import type { Product } from "@/src/components/molecules/ProductCard/ProductCard"

type DatabaseProduct = z.infer<typeof ProductSchema>
type HomePageProps = {
  searchParams: Promise<{
    q?: string | string[]
    sort?: string | string[]
  }>
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

function mapDatabaseProduct(product: DatabaseProduct): Product {
  const sizes = Array.from(
    new Set(product.product_variants.map((variant) => variant.size).filter(Boolean))
  )
  const colors = Array.from(
    new Set(
      product.product_variants
        .map((variant) => variant.color)
        .filter((color): color is string => Boolean(color))
    )
  )

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image_url ?? "",
    sizes: sizes.length > 0 ? sizes : undefined,
    colors: colors.length > 0 ? colors : undefined,
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q, sort } = await searchParams
  const searchQuery = firstValue(q)?.trim() ?? ""
  const sortBy = firstValue(sort) ?? "relevance"

  let query = supabase
    .from("products")
    .select("id,name,price,image_url,product_variants(size,stock_quantity,color)")

  if (searchQuery) {
    query = query.ilike("name", `%${searchQuery}%`)
  }

  if (sortBy === "price-asc") {
    query = query.order("price", { ascending: true })
  } else if (sortBy === "price-desc") {
    query = query.order("price", { ascending: false })
  } else {
    query = query.order("name", { ascending: true })
  }

  const { data } = await query

  const products = (data ?? []).map((product) => ProductSchema.parse(product)).map(mapDatabaseProduct)

  return <ShopPage products={products} />
}