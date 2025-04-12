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
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

export default function NuevoTicketPage() {
  const ESTADO_ESPERA = 3; // Estado "En espera"

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    estado_ticket_id: ESTADO_ESPERA,
    usuario_cliente_id: 0, // Vendrá del objeto cookie "user"
    nombre_cliente: "",
    apellido_cliente: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const rawUserCookie = Cookies.get("user");
    if (rawUserCookie) {
      try {
        const decoded = decodeURIComponent(rawUserCookie);
        const userObj = JSON.parse(decoded);
        if (userObj.usuario_id) {
          setFormData((prev) => ({
            ...prev,
            usuario_cliente_id: Number(userObj.usuario_id),
            nombre_cliente: userObj.nombre || "",
            apellido_cliente: userObj.apellido || "",
          }));
        }
      } catch (error) {
        console.error("Error al parsear la cookie 'user':", error);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await axios.post("http://localhost:3000/ticket", {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        estado: {
          estado_ticket_id: formData.estado_ticket_id,
        },
        cliente: {
          usuario_id: formData.usuario_cliente_id, // Aquí está la corrección
        },
      });

      setSuccess(true);
      setFormData((prev) => ({
        ...prev,
        titulo: "",
        descripcion: "",
      }));
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar el ticket");
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/tickets">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Nuevo Ticket</h2>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Ticket</CardTitle>
          <CardDescription>
            Ingresa Título y Descripción. El estado será "En espera" (ID {ESTADO_ESPERA}). Cliente obtenido desde cookie "user".
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título del Ticket</Label>
              <Input
                id="titulo"
                placeholder="Ej: Problema con la impresora"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                placeholder="Describe brevemente la falla o problema..."
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Estado</Label>
              <Input
                value={String(ESTADO_ESPERA)}
                readOnly
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label>Cliente</Label>
              <Input
                value={
                  formData.nombre_cliente || formData.apellido_cliente
                    ? `${formData.nombre_cliente} ${formData.apellido_cliente}`
                    : ""
                }
                readOnly
                className="bg-gray-100"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Registrar Ticket
            </Button>
          </CardFooter>
        </form>

        {error && <p className="text-red-500 text-sm mt-2 px-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm mt-2 px-4">
            Ticket registrado exitosamente.
          </p>
        )}
      </Card>
    </div>
  );
}
