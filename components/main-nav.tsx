"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { BarChart3, ClipboardList, Cpu, Laptop, Settings, Ticket, Truck, Users } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Settings className="h-6 w-6 text-primary" />
        <span className="hidden font-bold sm:inline-block">Sistema de Reparaciones</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-primary",
            pathname === "/dashboard" ? "text-primary font-medium" : "text-muted-foreground",
          )}
        >
          <BarChart3 className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/proveedores"
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-primary",
            pathname === "/proveedores" ? "text-primary font-medium" : "text-muted-foreground",
          )}
        >
          <Truck className="h-4 w-4" />
          Proveedores
        </Link>
        <Link
          href="/componentes"
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-primary",
            pathname === "/componentes" ? "text-primary font-medium" : "text-muted-foreground",
          )}
        >
          <Cpu className="h-4 w-4" />
          Componentes
        </Link>
        <Link
          href="/equipos"
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-primary",
            pathname === "/equipos" ? "text-primary font-medium" : "text-muted-foreground",
          )}
        >
          <Laptop className="h-4 w-4" />
          Equipos
        </Link>
        <Link
          href="/usuarios"
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-primary",
            pathname === "/usuarios" ? "text-primary font-medium" : "text-muted-foreground",
          )}
        >
          <Users className="h-4 w-4" />
          Usuarios
        </Link>
        <Link
          href="/tickets"
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-primary",
            pathname === "/tickets" ? "text-primary font-medium" : "text-muted-foreground",
          )}
        >
          <Ticket className="h-4 w-4" />
          Tickets
        </Link>
        <Link
          href="/reparaciones"
          className={cn(
            "flex items-center gap-2 transition-colors hover:text-primary",
            pathname === "/reparaciones" ? "text-primary font-medium" : "text-muted-foreground",
          )}
        >
          <ClipboardList className="h-4 w-4" />
          Reparaciones
        </Link>
      </nav>
    </div>
  )
}

