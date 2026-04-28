// src/app/layout.tsx

import { Navbar } from '@/src/components/organisms/Navbar/Navbar' 
import { Footer } from '@/src/components/organisms/Footer/Footer' 
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[#F8F8F8]">
        <Navbar /> 
        
        <main className="min-h-screen">
          {children} 
        </main>

        <Footer /> 
      </body>
    </html>
  )
}