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
import Cookies from "js-cookie";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const user = JSON.parse(Cookies.get("user") || "{}");

  // Obtenemos el rol_id del usuario
  const roleId = user?.rol?.rol_id;

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.href = "/login";
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 ">
        {/* Encabezado */}
        <div className="px-4 "></div>

        {(roleId === 1 || roleId === 2 || roleId === 3) && (
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Dashboard
            </h2>
            <div className="space-y-1">
              {(roleId === 1 || roleId === 2 || roleId === 3) && (
                <Link href="/estadisticas">
                  <Button
                    variant={
                      pathname === "/estadisticas" ? "secondary" : "ghost"
                    }
                    className="w-full justify-start"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Resumen
                  </Button>
                </Link>
              )}

              {(roleId === 1 || roleId === 2 || roleId === 3) && (
                <Link href="/tickets">
                  <Button
                    variant={pathname === "/tickets" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    Tickets
                  </Button>
                </Link>
              )}

              {/* Reparaciones (solo para rol 1 y 2) */}
              {(roleId === 1 || roleId === 2) && (
                <Link href="/reparaciones">
                  <Button
                    variant={
                      pathname === "/reparaciones" ? "secondary" : "ghost"
                    }
                    className="w-full justify-start"
                  >
                    <ClipboardList className="mr-2 h-4 w-4" />
                    Reparaciones
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Sección Inventario */}
        {/* Ejemplo: disponible solo para rol 1 y 2 */}
        {roleId === 1 && (
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
        )}

        {/* Sección Administración */}
        {/* Ejemplo: solo para rol 1 (administrador) */}
        {roleId === 1 && (
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
            </div>
          </div>
        )}
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
