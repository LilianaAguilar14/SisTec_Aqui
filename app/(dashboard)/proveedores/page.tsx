"use client"; // Para que los hooks funcionen en un Client Component

import { useState, useEffect } from "react";
import Link from "next/link";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Truck, Trash2, Edit } from "lucide-react";
import axios from "../../axiosConfig";

export default function ProveedoresPage() {
  const router = useRouter();
  const [proveedores, setProveedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener los proveedores desde el backend al montar el componente
  useEffect(() => {
    async function fetchProveedores() {
      try {
        const response = await axios.get("/proveedor");
        setProveedores(response.data);
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      }
    }
    fetchProveedores();
  }, []);

  // Función para eliminar proveedor
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/proveedor/${id}`);
      if (response.status === 200) {
        // Actualizar el estado eliminando el item eliminado
        setProveedores((prev) =>
          prev.filter((item) => (item.proveedor_id || item.id) !== id)
        );
      }
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
    }
  };

  // Función para editar proveedor: redirige a la página de editar
  const handleEdit = (id) => {
    router.push(`/proveedores/editar/${id}`);
  };

  // Filtrar proveedores en función del término de búsqueda (nombre, contacto o dirección)
  const filteredProveedores = proveedores.filter((proveedor) => {
    const nombre = proveedor.nombre?.toLowerCase() || "";
    const contacto = proveedor.contacto?.toLowerCase() || "";
    const direccion = proveedor.direccion?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return (
      nombre.includes(term) ||
      contacto.includes(term) ||
      direccion.includes(term)
    );
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Proveedores</h2>
        <div className="flex items-center space-x-2">
          <Link href="/proveedores/nuevo">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Proveedor
            </Button>
          </Link>
        </div>
      </div>

      {/* Tarjeta de Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Proveedores
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{proveedores.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Proveedores con búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Proveedores</CardTitle>
          <CardDescription>
            Gestiona los proveedores de componentes para reparaciones
          </CardDescription>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-sm items-center space-x-2 mt-4"
          >
            <Input
              type="search"
              placeholder="Buscar proveedor..."
              className="h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="sm" className="h-9 px-4 py-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </form>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProveedores.map((proveedor, index) => {
                // Obtener el identificador real, ya sea "proveedor_id" o "id"
                const providerId =
                  proveedor.proveedor_id || proveedor.id || index + 1;
                return (
                  <TableRow key={index}>
                    <TableCell>{providerId}</TableCell>
                    <TableCell className="font-medium">
                      {proveedor.nombre}
                    </TableCell>
                    <TableCell>{proveedor.contacto ?? "N/A"}</TableCell>
                    <TableCell>{proveedor.direccion ?? "N/A"}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Link href={`/proveedores/editar/${providerId}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(providerId)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(providerId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
