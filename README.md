# Clothing Store

Loja virtual de moda construída com Next.js e Tailwind CSS, com foco em uma vitrine de produtos, navegação por categorias, filtros e componentes reutilizáveis.

## Visão Geral

O projeto organiza a interface em uma arquitetura de componentes por camadas:

- atoms: componentes base, como botão, input, select e checkbox
- molecules: blocos compostos, como barra de busca, card de produto e paginação
- organisms: seções completas da página, como navbar, hero, filtros, grid e footer

A página inicial exibe uma home de catálogo com header fixo, banner principal, busca, filtros laterais e grade de produtos.

## Stack

- Next.js 16 com App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI para componentes acessíveis
- Lucide React e React Icons para ícones
- class-variance-authority, clsx e tailwind-merge para composição de classes
- Supabase preparado para integração futura com dados reais

## Funcionalidades

- Navbar responsiva com menu mobile
- Hero section com chamada principal
- Busca por produtos e ordenação
- Filtros laterais com checkbox e slider de preço
- Grid responsivo de produtos com estados de destaque
- Footer com newsletter e links institucionais
- Base de componentes reutilizáveis para acelerar novas telas

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

Abra http://localhost:3000 no navegador.

## Build de produção

```bash
npm run build
```

## Iniciar em produção

```bash
npm run start
```

## Lint

```bash
npm run lint
```

## Estrutura do Projeto

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    atoms/
    molecules/
    organisms/
  lib/
    utils.ts
    supabase.ts
    schemas.ts
```

## Configuração de Estilo

O projeto usa Tailwind CSS 4 com tokens de tema definidos em [src/app/globals.css](src/app/globals.css) e mapeados no [tailwind.config.ts](tailwind.config.ts).

Algumas classes como `bg-primary`, `text-foreground`, `border-border` e `bg-background` dependem desses tokens para serem renderizadas corretamente.

## Imagens Remotas

O arquivo [next.config.ts](next.config.ts) já permite imagens externas vindas de `images.unsplash.com`, usadas nos cards de produto.

## Componentes Principais

- [src/app/layout.tsx](src/app/layout.tsx): aplica o layout global, navbar e footer
- [src/app/page.tsx](src/app/page.tsx): monta a homepage da loja
- [src/components/organisms/Navbar/Navbar.tsx](src/components/organisms/Navbar/Navbar.tsx): navegação principal
- [src/components/organisms/HeroSection/HeroSection.tsx](src/components/organisms/HeroSection/HeroSection.tsx): banner inicial
- [src/components/organisms/FiltersSidebar/FiltersSidebar.tsx](src/components/organisms/FiltersSidebar/FiltersSidebar.tsx): filtros de catálogo
- [src/components/organisms/ProductGrid/ProductGrid.tsx](src/components/organisms/ProductGrid/ProductGrid.tsx): vitrine de produtos
- [src/components/molecules/ProductCard/ProductCard.tsx](src/components/molecules/ProductCard/ProductCard.tsx): card de produto
- [src/components/molecules/SearchBar/SearchBar.tsx](src/components/molecules/SearchBar/SearchBar.tsx): busca e ordenação
- [src/components/molecules/Pagination/Pagination.tsx](src/components/molecules/Pagination/Pagination.tsx): navegação entre páginas

## Observações

- O projeto já está configurado para compilar com Tailwind e TypeScript.
- Há uma camada de componentes pronta para evoluir para backend real, CMS ou integração com banco.
- Se você adicionar novas pastas dentro de src, elas já entram no scan do Tailwind pela configuração atual.

## Próximos Passos

1. Ligar os filtros e a busca a dados reais.
2. Integrar produtos com Supabase ou outra API.
3. Adicionar testes para componentes críticos.
4. Refinar acessibilidade e estados de carregamento.