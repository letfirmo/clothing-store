import { z } from 'zod'

export const ProductVariantSchema = z.object({
  size: z.string(),
  stock_quantity: z.coerce.number(),
  color: z.string().optional(),
})

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  price: z.coerce.number(),
  image_url: z.string().url().nullable(),
  product_variants: z.array(ProductVariantSchema)
})

export type Product = z.infer<typeof ProductSchema>