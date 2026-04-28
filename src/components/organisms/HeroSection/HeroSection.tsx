import { Button } from "@/src/components/atoms/button/button"

export function HeroSection() {
  return (
    <section className="relative bg-black px-4 py-20 text-center">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl uppercase">
          Nova Coleção <br/> Outono/Inverno
        </h1>
        <p className="mt-6 text-lg text-gray-400">
          Descubra as últimas tendências da temporada com até 40% de desconto.
        </p>
        <Button size="lg" className="mt-10 px-8 py-6 text-lg">
          Ver Coleção
        </Button>
      </div>
    </section>
  )
}