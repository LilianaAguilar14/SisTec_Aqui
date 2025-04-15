"use client";

import { useEffect, useState } from "react";
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
import { Plus, Search, Users } from "lucide-react";
import Link from "next/link";
import axios from "../../axiosConfig";

export default function UsuariosPage() {
  interface Usuario {
    usuario_id: number;
    nombre: string;
    apellido: string;
    email: string;
    rol: {
      rol_id: number;
      rol: string;
    };
  }

  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Estado inicial vacío
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado de error
  const [filtroRol, setFiltroRol] = useState<string | null>(null); // Estado para el filtro de rol
  const [conteoAdministradores, setConteoAdministradores] = useState(0);
  const [conteoTecnicos, setConteoTecnicos] = useState(0);
  const [conteoClientes, setConteoClientes] = useState(0);

  useEffect(() => {
    // Lógica para obtener los datos de usuarios
    async function fetchUsuarios() {
      try {
        const response = await axios.get("/usuarios");
        setUsuarios(response.data); // Actualiza el estado con los datos obtenidos
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    }

    // Lógica para obtener los conteos por rol
    async function fetchConteos() {
      try {
        const [adminRes, tecnicoRes, clienteRes] = await Promise.all([
          axios.get("/usuarios/conteo/administradores"),
          axios.get("/usuarios/conteo/tecnicos"),
          axios.get("/usuarios/conteo/clientes"),
        ]);

        setConteoAdministradores(adminRes.data.total || 0);
        setConteoTecnicos(tecnicoRes.data.total || 0);
        setConteoClientes(clienteRes.data.total || 0);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los conteos de usuarios.");
      }
    }

    fetchUsuarios();
    fetchConteos();
  }, []); // Ejecuta solo una vez al montar el componente

  const handleFiltrarPorRol = async (rol: string) => {
    setLoading(true);
    setError("");
    setFiltroRol(rol);

    try {
      const url =
        rol === "administradores"
          ? "/usuarios/administradores"
          : rol === "tecnicos"
          ? "/usuarios/tecnicos"
          : "/usuarios/clientes";

      const response = await axios.get(url);
      setUsuarios(response.data); // Actualiza la tabla con los usuarios filtrados
    } catch (err) {
      console.error(err);
      setError(`No se pudieron cargar los usuarios con rol de ${rol}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleMostrarTodos = async () => {
    setLoading(true);
    setError("");
    setFiltroRol(null);

    try {
      const response = await axios.get("/usuarios");
      setUsuarios(response.data); // Muestra todos los usuarios
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar todos los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Cargando usuarios...</p>; // Muestra un mensaje de carga
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>; // Muestra un mensaje de error
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
        <div className="flex items-center space-x-2">
          <Link href="/usuarios/nuevo">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Administradores
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conteoAdministradores}</div>
            <p className="text-xs text-muted-foreground">
              Usuarios con rol de administrador
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Técnicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conteoTecnicos}</div>
            <p className="text-xs text-muted-foreground">
              Usuarios con rol de técnico
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conteoClientes}</div>
            <p className="text-xs text-muted-foreground">
              Usuarios con rol de cliente
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex space-x-4">
        <Button
          variant={filtroRol === null ? "default" : "outline"}
          onClick={handleMostrarTodos}
        >
          Todos
        </Button>
        <Button
          variant={filtroRol === "administradores" ? "default" : "outline"}
          onClick={() => handleFiltrarPorRol("administradores")}
        >
          Administradores
        </Button>
        <Button
          variant={filtroRol === "tecnicos" ? "default" : "outline"}
          onClick={() => handleFiltrarPorRol("tecnicos")}
        >
          Técnicos
        </Button>
        <Button
          variant={filtroRol === "clientes" ? "default" : "outline"}
          onClick={() => handleFiltrarPorRol("clientes")}
        >
          Clientes
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            {filtroRol
              ? `Mostrando usuarios con rol de ${filtroRol}`
              : "Mostrando todos los usuarios"}
          </CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Buscar usuario..."
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
                <TableHead>Apellido</TableHead>
                <TableHead>Correo</TableHead>
                <TableHead>Rol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.usuario_id}>
                  <TableCell>{usuario.usuario_id}</TableCell>
                  <TableCell className="font-medium">
                    {usuario.nombre}
                  </TableCell>
                  <TableCell>{usuario.apellido}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.rol.rol}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
