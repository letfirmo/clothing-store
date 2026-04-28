import Link from "next/link"
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"
import { Input } from "@/src/components/atoms/input/input"
import { Button } from "@/src/components/atoms/button/button"

const footerLinks = {
  shop: {
    title: "Comprar",
    links: [
      { label: "Novidades", href: "#" },
      { label: "Feminino", href: "#" },
      { label: "Masculino", href: "#" },
      { label: "Acessórios", href: "#" },
      { label: "Promoções", href: "#" },
    ],
  },
  help: {
    title: "Ajuda",
    links: [
      { label: "Perguntas Frequentes", href: "#" },
      { label: "Envio e Entrega", href: "#" },
      { label: "Trocas e Devoluções", href: "#" },
      { label: "Rastrear Pedido", href: "#" },
      { label: "Guia de Tamanhos", href: "#" },
    ],
  },
  about: {
    title: "Sobre",
    links: [
      { label: "Nossa História", href: "#" },
      { label: "Sustentabilidade", href: "#" },
      { label: "Carreiras", href: "#" },
      { label: "Imprensa", href: "#" },
      { label: "Contato", href: "#" },
    ],
  },
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-foreground">MODA</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Vista-se com estilo e confiança. Descubra as últimas tendências e peças exclusivas 
              que combinam qualidade, conforto e elegância.
            </p>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground">
                Receba novidades e ofertas exclusivas
              </h3>
              <div className="mt-3 flex gap-2">
                <Input
                  type="email"
                  placeholder="Seu e-mail"
                  className="max-w-xs"
                />
                <Button>Inscrever</Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaFacebookF className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 MODA. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-foreground">
              Termos de Uso
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacidade
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
