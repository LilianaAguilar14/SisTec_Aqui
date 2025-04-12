"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  BarChart3,
  ClipboardList,
  Cpu,
  Home,
  Laptop,
  LogOut,
  Settings,
  Ticket,
  Truck,
  Users,
} from "lucide-react";
import Cookies from "js-cookie"; // Importa js-cookie

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();

  const handleLogout = () => {
    // Elimina las cookies
    Cookies.remove("token");
    Cookies.remove("user");

    // Redirige al usuario a la página de inicio de sesión
    window.location.href = "/login";
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Link href="/estadisticas" className="flex items-center gap-2">
            <div className="p-4 border-b flex items-center gap-2">
              <div className="w-8 h-8">
                <Image
                  src="/logo.png"
                  alt="TechFix Logo"
                  width={32}
                  height={32}
                />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
                SisTec
              </span>
            </div>
          </Link>
          <div className="mt-3">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Volver al sitio
              </Button>
            </Link>
          </div>
        </div>

        {/* Sección Dashboard */}
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <Link href="/estadisticas">
              <Button
                variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Resumen
              </Button>
            </Link>
            <Link href="/tickets">
              <Button
                variant={pathname === "/tickets" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Ticket className="mr-2 h-4 w-4" />
                Tickets
              </Button>
            </Link>
            <Link href="/reparaciones">
              <Button
                variant={pathname === "/reparaciones" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Reparaciones
              </Button>
            </Link>
          </div>
        </div>

        {/* Sección Inventario */}
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Inventario
          </h2>
          <div className="space-y-1">
            <Link href="/componentes">
              <Button
                variant={pathname === "/componentes" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Cpu className="mr-2 h-4 w-4" />
                Componentes
              </Button>
            </Link>
            <Link href="/dispositivos">
              <Button
                variant={pathname === "/dispositivos" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Laptop className="mr-2 h-4 w-4" />
                Dispositivos
              </Button>
            </Link>
            <Link href="/proveedores">
              <Button
                variant={pathname === "/proveedores" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Truck className="mr-2 h-4 w-4" />
                Proveedores
              </Button>
            </Link>
          </div>
        </div>

        {/* Sección Administración */}
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Administración
          </h2>
          <div className="space-y-1">
            <Link href="/usuarios">
              <Button
                variant={pathname === "/usuarios" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Usuarios
              </Button>
            </Link>
            <Link href="/configuracion">
              <Button
                variant={pathname === "configuracion" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Botón de Cerrar sesión */}
      <div className="mt-auto px-4 py-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
