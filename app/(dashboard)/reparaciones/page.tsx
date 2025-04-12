"use client";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

export default function ReparacionesPage() {
  const [todasReparaciones, setTodasReparaciones] = useState<Reparacion[]>([]);
  const [reparacionesPendientes, setReparacionesPendientes] = useState<Reparacion[]>([]);
  const [costoTotal, setCostoTotal] = useState(0);
  const [costoPromedio, setCostoPromedio] = useState(0);
  const [searchTodas, setSearchTodas] = useState("");
  const [searchPendientes, setSearchPendientes] = useState("");
  const searchParams = useSearchParams();
  const reloadParam = searchParams.get("reload");

  interface Reparacion {
    reparacion_id: number;
    fecha_reparacion?: string;
    ticket: string | { titulo: string; fecha_solucion?: string | null; ticket_id?: number };
    costo?: number;
    tecnico: { usuario_id: number };
  }

  useEffect(() => {
    axios.get("http://localhost:3000/reparacion")
      .then((response) => {
        const reparaciones = response.data;
        // Procesar reparaciones...
        setTodasReparaciones(reparaciones);
      })
      .catch((error) => console.error("Error fetching reparaciones:", error));
  }, [reloadParam]); // Recargar si cambia el parámetro

  useEffect(() => {
    const rawUserCookie = Cookies.get("user");
    if (rawUserCookie) {
      try {
        const decoded = decodeURIComponent(rawUserCookie);
        const userObj = JSON.parse(decoded);
        if (userObj.usuario_id) {
          console.log("ID del técnico logueado desde las cookies:", userObj.usuario_id);

          // Obtener todas las reparaciones
          axios.get("http://localhost:3000/reparacion")
            .then((response) => {
              const reparaciones = response.data;

              // Obtener los costos de las reparaciones
              axios.get("http://localhost:3000/reparacion/costos")
                .then((costosResponse) => {
                  const costos = costosResponse.data;

                  // Combinar costos con reparaciones
                  const reparacionesConCostos = reparaciones.map((reparacion: Reparacion) => {
                    const costo: number = costos.find((c: { reparacionId: number; costo: number }) => c.reparacionId === reparacion.reparacion_id)?.costo || 0;
                    return { ...reparacion, costo };
                  });

                  console.log("Reparaciones con costos:", reparacionesConCostos);

                  setTodasReparaciones(reparacionesConCostos);

                  // Filtrar reparaciones pendientes por técnico
                  const pendientes: Reparacion[] = reparacionesConCostos.filter(
                    (reparacion: Reparacion) =>
                      reparacion.tecnico.usuario_id === userObj.usuario_id &&
                      typeof reparacion.ticket === "object" &&
                      reparacion.ticket.fecha_solucion === null
                  );
                  setReparacionesPendientes(pendientes);

                  // Calcular costo total y promedio
                    const total: number = reparacionesConCostos.reduce((sum: number, rep: Reparacion) => sum + (rep.costo || 0), 0);
                  setCostoTotal(total);
                  setCostoPromedio(reparacionesConCostos.length > 0 ? total / reparacionesConCostos.length : 0);
                })
                .catch((error) => console.error("Error fetching costos:", error));
            })
            .catch((error) => console.error("Error fetching reparaciones:", error));
        }
      } catch (error) {
        console.error("Error al parsear la cookie 'user':", error);
      }
    } else {
      console.error("La cookie 'user' no está disponible.");
    }
  }, []);

  const handleReload = () => {
    setReload((prev) => !prev); // Cambiar el estado para forzar la recarga
  };

  // Filtrar reparaciones para la tabla de todas las reparaciones
  const filteredTodasReparaciones = todasReparaciones.filter((reparacion) =>
    reparacion.ticket &&
    typeof reparacion.ticket === "object" &&
    reparacion.ticket.titulo.toLowerCase().includes(searchTodas.toLowerCase())
  );

  // Filtrar reparaciones para la tabla de reparaciones pendientes
  const filteredReparacionesPendientes = reparacionesPendientes.filter((reparacion) =>
    reparacion.ticket &&
    typeof reparacion.ticket === "object" &&
    reparacion.ticket.titulo.toLowerCase().includes(searchPendientes.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reparaciones</h2>
        <div className="flex items-center space-x-2">
          <Link href="/reparaciones/reparar/page">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Reparación
            </Button>
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total de Reparaciones */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Reparaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todasReparaciones.length}</div>
          </CardContent>
        </Card>

        {/* Reparaciones Pendientes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reparaciones Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reparacionesPendientes.length}</div>
          </CardContent>
        </Card>

        {/* Costo Total */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${costoTotal.toFixed(2)}</div>
          </CardContent>
        </Card>

        {/* Costo Promedio */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${costoPromedio.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>


      {/* Tabla de Reparaciones Pendientes */}
      <Card>
        <CardHeader>
          <CardTitle>Reparaciones Pendientes</CardTitle>
          <CardDescription>Reparaciones asignadas al técnico logueado</CardDescription>
          <Input
            type="text"
            placeholder="Buscar por título..."
            value={searchPendientes}
            onChange={(e) => setSearchPendientes(e.target.value)}
            className="mt-2"
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Ticket</TableHead>
                <TableHead>Costo Total</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReparacionesPendientes.map((reparacion) => (
                <TableRow key={reparacion.reparacion_id}>
                  <TableCell>{reparacion.reparacion_id}</TableCell>
                  <TableCell>
                    {reparacion.fecha_reparacion
                      ? new Date(reparacion.fecha_reparacion).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Fecha no disponible"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {typeof reparacion.ticket === "object" && reparacion.ticket?.titulo
                      ? reparacion.ticket.titulo
                      : String(reparacion.ticket)}
                  </TableCell>
                  <TableCell>${reparacion.costo ? reparacion.costo.toFixed(2) : "0.00"}</TableCell>
                  <TableCell>
                    <Link
                      href={`/reparaciones/reparar/${reparacion.reparacion_id}?ticket_id=${
                        typeof reparacion.ticket === "object" ? reparacion.ticket.ticket_id : ""
                      }`}
                    >
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Componentes
                      </Button>
                    </Link>
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
// Removed duplicate implementation of setReload
function setReload(arg0: (prev: any) => boolean) {
  throw new Error("Function not implemented.");
}

