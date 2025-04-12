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
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function NuevoDispositivoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    marca_modelo: "",
    descripcion: "",
    usuarioAsignado: {
      usuario_id: "", // ID del usuario asignado
    },
  });

  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Obtener la lista de usuarios al cargar la página
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/usuarios"); // Cambia la URL según tu backend
        setUsuarios(response.data); // Asume que el backend devuelve un array de usuarios
      } catch (err) {
        console.error("Error al obtener los usuarios:", err);
      }
    };

    fetchUsuarios();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, tipo: value });
  };

  const handleUsuarioChange = (value: string) => {
    setFormData({
      ...formData,
      usuarioAsignado: { usuario_id: value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:3000/tipo-dispositivo",
        formData
      );
      setSuccess(true);
      setFormData({
        nombre: "",
        tipo: "",
        marca_modelo: "",
        descripcion: "",
        usuarioAsignado: {
          usuario_id: "",
        },
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Error al registrar el dispositivo"
      );
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/dispositivos">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">
            Nuevo Dispositivo
          </h2>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Información del Dispositivo</CardTitle>
          <CardDescription>
            Ingresa los detalles del nuevo dispositivo a registrar en el sistema
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Dispositivo</Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Dell XPS 15"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Dispositivo</Label>
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laptop">Laptop</SelectItem>
                    <SelectItem value="Desktop">Desktop</SelectItem>
                    <SelectItem value="Impresora">Impresora</SelectItem>
                    <SelectItem value="Tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="marca_modelo">Marca y Modelo</Label>
                <Input
                  id="marca_modelo"
                  placeholder="Ej: Dell XPS 15 9500"
                  value={formData.marca_modelo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="usuarioAsignado">Usuario Asignado</Label>
                <Select onValueChange={handleUsuarioChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    {usuarios.map((usuario: any) => (
                      <SelectItem
                        key={usuario.usuario_id}
                        value={usuario.usuario_id.toString()}
                      >
                        {usuario.nombre} {usuario.apellido}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Registrar Dispositivo
            </Button>
          </CardFooter>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm mt-2">
            Dispositivo registrado exitosamente.
          </p>
        )}
      </Card>
    </div>
  );
}
