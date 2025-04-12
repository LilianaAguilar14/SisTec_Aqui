"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Laptop, Monitor, Plus, Printer, Search, Server } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface Dispositivo {
  dispositivo_id: number;
  nombre: string;
  tipo: string;
  marca_modelo: string;
  serie: string;
  usuarioAsignado?: {
    // Información del usuario asignado (opcional si puede ser null)
    usuario_id: number; // ID del usuario
    nombre: string; // Nombre del usuario
    apellido: string; // Apellido del usuario
    email: string; // Email del usuario
  };
  estado: string;
  garantia: string;
}

export default function DispositivosPage() {
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([]); // Lista de dispositivos
  const [error, setError] = useState("");

  // Obtener la lista de dispositivos al cargar la página
  useEffect(() => {
    const fetchDispositivos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/tipo-dispositivo"
        ); // Cambia la URL según tu backend
        setDispositivos(response.data); // Asume que el backend devuelve un array de dispositivos
      } catch (err) {
        setError("Error al obtener los dispositivos");
        console.error("Error al obtener los dispositivos:", err);
      }
    };

    fetchDispositivos();
  }, []);

  // Datos estáticos para las cards
  const totalDispositivos = 50;
  const laptops = 20;
  const desktops = 15;
  const impresoras = 10;
  const enReparacion = 5;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dispositivos</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dispositivos/nuevo">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Dispositivo
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Dispositivos
            </CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDispositivos}</div>
            <p className="text-xs text-muted-foreground">
              +5 desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laptops</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{laptops}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desktops</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{desktops}</div>
            <p className="text-xs text-muted-foreground">
              +1 desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impresoras</CardTitle>
            <Printer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impresoras}</div>
            <p className="text-xs text-muted-foreground">
              +0 desde el mes pasado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Reparación</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enReparacion}</div>
            <p className="text-xs text-muted-foreground">
              +1 desde el mes pasado
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Dispositivos</CardTitle>
          <CardDescription>
            Gestiona los dispositivos registrados en el sistema
          </CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Buscar dispositivo..."
              className="h-9"
            />
            <Button type="submit" size="sm" className="h-9 px-4 py-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Marca/Modelo</TableHead>
                <TableHead>Usuario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dispositivos.map((dispositivo) => (
                <TableRow key={dispositivo.dispositivo_id}>
                  <TableCell>{dispositivo.dispositivo_id}</TableCell>
                  <TableCell className="font-medium">
                    {dispositivo.nombre}
                  </TableCell>
                  <TableCell>{dispositivo.tipo}</TableCell>
                  <TableCell>{dispositivo.marca_modelo}</TableCell>
                  <TableCell>{dispositivo.usuarioAsignado?.nombre}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
