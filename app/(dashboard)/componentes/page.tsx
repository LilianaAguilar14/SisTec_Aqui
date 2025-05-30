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
import { Cpu, Plus, Search, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import axios from "../../axiosConfig";

interface Proveedor {
  proveedor_id: number;
  nombre: string;
  contacto: string;
  direccion: string;
}

interface Componente {
  componente_id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  proveedor: Proveedor;
}

export default function ComponentesPage() {
  const [componentes, setComponentes] = useState<Componente[]>([]);
  const [totalComponentes, setTotalComponentes] = useState(0); // Estado para el total de componentes
  const [error, setError] = useState("");

  // Obtener la lista de componentes al cargar la página
  useEffect(() => {
    const fetchComponentes = async () => {
      try {
        const response = await axios.get("/componente");
        setComponentes(response.data);
      } catch (err) {
        setError("Error al obtener los componentes");
        console.error("Error al obtener los componentes:", err);
      }
    };

    fetchComponentes();
  }, []);

  // Obtener el total de componentes
  useEffect(() => {
    const fetchTotalComponentes = async () => {
      try {
        const response = await axios.get("/componente/total-componentes");
        setTotalComponentes(response.data.total); // Asume que el backend devuelve un objeto { total: number }
      } catch (err) {
        setError("Error al obtener el total de componentes");
        console.error("Error al obtener el total de componentes:", err);
      }
    };

    fetchTotalComponentes();
  }, []);

  // Función para eliminar un componente
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`/componente/${id}`);
      if (response.status === 200) {
        setComponentes((prev) =>
          prev.filter((componente) => componente.componente_id !== id)
        );
      }
    } catch (err) {
      console.error("Error al eliminar el componente:", err);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Componentes</h2>
        <div className="flex items-center space-x-2">
          <Link href="/componentes/nuevo">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Componente
            </Button>
          </Link>
        </div>
      </div>
      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Componentes
            </CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComponentes}</div>
            <p className="text-xs text-muted-foreground">
              Total registrado en el sistema
            </p>
          </CardContent>
        </Card>
        {/* Otras cards */}
      </div>
      {/* Tabla */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Componentes</CardTitle>
          <CardDescription>
            Gestiona los componentes registrados en el sistema
          </CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Buscar componente..."
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
                <TableHead>Precio</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {componentes.map((componente) => (
                <TableRow key={componente.componente_id}>
                  <TableCell>{componente.componente_id}</TableCell>
                  <TableCell className="font-medium">
                    {componente.nombre}
                  </TableCell>
                  <TableCell>${componente.precio.toFixed(2)}</TableCell>
                  <TableCell>{componente.cantidad}</TableCell>
                  <TableCell>{componente.proveedor.nombre}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Link
                      href={`/componentes/editar/${componente.componente_id}`}
                    >
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(componente.componente_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
