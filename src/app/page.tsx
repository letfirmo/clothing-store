import { z } from "zod"
import { supabase } from "@/src/lib/supabase"
import { ProductSchema } from "@/src/lib/schemas"
import { ShopPage } from "@/src/components/templates/ShopPage/ShopPage"
import type { Product } from "@/src/components/molecules/ProductCard/ProductCard"

type DatabaseProduct = z.infer<typeof ProductSchema>

function mapDatabaseProduct(product: DatabaseProduct): Product {
  const sizes = Array.from(
    new Set(product.product_variants.map((variant) => variant.size).filter(Boolean))
  )
  const colors = Array.from(
    new Set(product.product_variants.map((variant) => variant.color).filter(Boolean))
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

export default async function HomePage() {
  const { data } = await supabase
    .from("products")
    .select("id,name,price,image_url,product_variants(size,stock_quantity,color)")
    .order("name", { ascending: true })

  const products = (data ?? []).map((product) => ProductSchema.parse(product)).map(mapDatabaseProduct)

  return <ShopPage products={products} />
}