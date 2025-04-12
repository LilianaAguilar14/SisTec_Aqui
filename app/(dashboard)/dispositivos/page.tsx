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
  const [categorias, setCategorias] = useState<any[]>([]); // Lista de categorías

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

  // Obtener datos de dispositivos por categoría
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/tipo-dispositivo/por-categoria"
        );
        setCategorias(response.data); // Asume que el backend devuelve un array de categorías
      } catch (err) {
        setError("Error al obtener las categorías");
        console.error("Error al obtener las categorías:", err);
      }
    };

    fetchCategorias();
  }, []);

  // Iconos para las categorías
  const iconosCategoria = {
    Laptop: <Laptop className="h-4 w-4 text-muted-foreground" />,
    Computadora: <Server className="h-4 w-4 text-muted-foreground" />,
    Impresora: <Printer className="h-4 w-4 text-muted-foreground" />,
    Tablet: <Monitor className="h-4 w-4 text-muted-foreground" />,
  };

  // Calcular totales por categoría
  const totalDispositivos = categorias.reduce((acc, cat) => acc + cat.total, 0);
  const laptops =
    categorias.find((cat) => cat.categoria === "Laptop")?.total || 0;
  const desktops =
    categorias.find((cat) => cat.categoria === "Computadora")?.total || 0;
  const impresoras =
    categorias.find((cat) => cat.categoria === "Impresora")?.total || 0;
  const enReparacion =
    categorias.find((cat) => cat.categoria === "Tablet")?.total || 0;

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
            <hr className="my-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laptops</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{laptops}</div>
            <hr className="my-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desktops</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{desktops}</div>
            <hr className="my-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impresoras</CardTitle>
            <Printer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impresoras}</div>
            <hr className="my-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tablet</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enReparacion}</div>
            <hr className="my-2" />
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
