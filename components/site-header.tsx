import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo de SisTec"
            width={40}
            height={40}
          />
          <Link href="/" className="font-bold text-xl">
            SisTec
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link href="/login">
            <Button variant="outline">Iniciar Sesión</Button>
          </Link>
          <Link href="/registro">
            <Button className="bg-primary hover:bg-primary/90">Registrarse</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

