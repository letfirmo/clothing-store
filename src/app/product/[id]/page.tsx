import Image from "next/image"
import { notFound } from "next/navigation"
import { supabase } from "@/src/lib/supabase"
import { ProductSchema } from "@/src/lib/schemas"
import { Button } from "@/src/components/atoms/button/button"

interface ProductPageProps {
  params: { id: string }
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { data } = await supabase
    .from("products")
    .select("id,name,price,image_url,product_variants(size,stock_quantity,color)")
    .eq("id", params.id)
    .maybeSingle()

  if (!data) {
    notFound()
  }

  const product = ProductSchema.parse(data)

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <section className="relative aspect-3/4 overflow-hidden rounded-2xl bg-muted">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted via-background to-muted text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Sem imagem
            </div>
          )}
        </section>

        <section className="flex flex-col gap-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Detalhes do produto
            </p>
            <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-primary md:text-3xl">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="grid gap-4 rounded-2xl border border-border bg-background p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Variantes disponíveis
            </h2>
            <div className="flex flex-wrap gap-3">
              {product.product_variants.length > 0 ? (
                product.product_variants.map((variant) => (
                  <div
                    key={`${variant.size}-${variant.color ?? "sem-cor"}`}
                    className="flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-foreground"
                  >
                    <span className="font-medium">{variant.size}</span>
                    <span className="text-muted-foreground">{variant.stock_quantity} em estoque</span>
                    {variant.color && (
                      <span className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: variant.color }} />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Nenhuma variante cadastrada.</p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button size="lg" className="flex-1">
              Adicionar ao Carrinho
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              Voltar para a loja
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}