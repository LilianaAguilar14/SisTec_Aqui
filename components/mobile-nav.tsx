"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { BarChart3, ClipboardList, Cpu, Laptop, Menu, Settings, Ticket, Truck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Settings className="h-6 w-6 text-primary" />
          <span className="font-bold">Sistema de Reparaciones</span>
        </Link>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
              )}
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/proveedores"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === "/proveedores" ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Truck className="h-4 w-4" />
              Proveedores
            </Link>
            <Link
              href="/componentes"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === "/componentes" ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Cpu className="h-4 w-4" />
              Componentes
            </Link>
            <Link
              href="/equipos"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === "/equipos" ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Laptop className="h-4 w-4" />
              Equipos
            </Link>
            <Link
              href="/usuarios"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === "/usuarios" ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Users className="h-4 w-4" />
              Usuarios
            </Link>
            <Link
              href="/tickets"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === "/tickets" ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Ticket className="h-4 w-4" />
              Tickets
            </Link>
            <Link
              href="/reparaciones"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                pathname === "/reparaciones" ? "text-primary" : "text-muted-foreground",
              )}
            >
              <ClipboardList className="h-4 w-4" />
              Reparaciones
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

