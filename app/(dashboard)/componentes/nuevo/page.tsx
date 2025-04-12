"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "../../../axiosConfig";

export default function NuevoComponentePage() {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    cantidad: "",
    proveedor: {
      proveedor_id: "", // ID del proveedor
    },
  });

  const [proveedores, setProveedores] = useState([]); // Lista de proveedores
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Obtener la lista de proveedores al cargar la página
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get("/proveedor"); // Cambia la URL según tu backend
        setProveedores(response.data); // Asume que el backend devuelve un array de proveedores
      } catch (err) {
        console.error("Error al obtener los proveedores:", err);
      }
    };

    fetchProveedores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleProveedorChange = (value: string) => {
    setFormData({
      ...formData,
      proveedor: { proveedor_id: value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "/componente", // URL del endpoint
        {
          ...formData,
          precio: parseFloat(formData.precio), // Asegurarse de enviar el precio como número
          cantidad: parseInt(formData.cantidad, 10), // Asegurarse de enviar la cantidad como número
        }
      );
      setSuccess(true);
      setFormData({
        nombre: "",
        precio: "",
        cantidad: "",
        proveedor: {
          proveedor_id: "",
        },
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Error al registrar el componente"
      );
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/componentes">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">
            Nuevo Componente
          </h2>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Información del Componente</CardTitle>
          <CardDescription>
            Ingresa los detalles del nuevo componente a registrar en el sistema
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Componente</Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Memoria RAM"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="precio">Precio</Label>
                <Input
                  id="precio"
                  type="number"
                  step="0.01"
                  placeholder="Ej: 150.50"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input
                  id="cantidad"
                  type="number"
                  placeholder="Ej: 10"
                  value={formData.cantidad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proveedor">Proveedor</Label>
                <Select onValueChange={handleProveedorChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {proveedores.map((proveedor: any) => (
                      <SelectItem
                        key={proveedor.proveedor_id}
                        value={proveedor.proveedor_id.toString()}
                      >
                        {proveedor.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Registrar Componente
            </Button>
          </CardFooter>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm mt-2">
            Componente registrado exitosamente.
          </p>
        )}
      </Card>
    </div>
  );
}
