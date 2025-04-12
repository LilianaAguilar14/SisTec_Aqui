"use client"; // Para poder usar Hooks en Next.js 13 (App Router)

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NuevoProveedorPage() {
  const router = useRouter();
  // Estado del formulario con los tres campos
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    direccion: "",
  });

  // Manejo de los cambios en los campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Función para enviar la información (POST)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/proveedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.error(`Error al crear proveedor. Código: ${response.status}`);
        return;
      }
      // Redirige a /proveedores después de guardar
      router.push("/proveedores");
    } catch (error) {
      console.error("Error al crear proveedor:", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nuevo Proveedor</CardTitle>
          <CardDescription>
            Ingresa los datos del nuevo proveedor y regístralo en el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Primera fila: Nombre y Contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre del Proveedor</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  placeholder="Ej: Distribuidor ACME"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="contacto">Contacto</Label>
                <Input
                  id="contacto"
                  name="contacto"
                  placeholder="Ej: contacto@acme.com"
                  value={formData.contacto}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Segunda fila: Dirección */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  placeholder="Ej: Calle Principal #123"
                  value={formData.direccion}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Botón para enviar */}
            <div className="flex justify-end">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Registrar Proveedor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
