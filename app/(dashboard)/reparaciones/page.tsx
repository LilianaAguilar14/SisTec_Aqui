"use client";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Cookies from "js-cookie";

export default function ReparacionesPage() {
  const [todasReparaciones, setTodasReparaciones] = useState<Reparacion[]>([]);
  const [reparacionesPendientes, setReparacionesPendientes] = useState<Reparacion[]>([]);
  const [costoTotal, setCostoTotal] = useState(0);
  const [costoPromedio, setCostoPromedio] = useState(0);

  interface Reparacion {
    reparacion_id: number;
    fecha: string;
    ticket: string | { titulo: string; fecha_solucion?: string | null };
    costo: number;
    tecnico: { usuario_id: number };
  }

  useEffect(() => {
    const usuarioId = Cookies.get("user"); // Cambiado a "usuario_id"
    console.log("ID del técnico logueado desde las cookies:", usuarioId);

    // Obtener todas las reparaciones
    axios.get("http://localhost:3000/reparacion")
      .then((response) => {
        const reparaciones = response.data;
        console.log("Reparaciones obtenidas:", reparaciones);

        setTodasReparaciones(reparaciones); // Guardar todas las reparaciones

        // Obtener reparaciones pendientes por técnico
        if (usuarioId) {
          axios.get(`http://localhost:3000/reparacion/tecnico/${usuarioId}`)
            .then((response) => {
              console.log("Respuesta del backend para reparaciones pendientes:", response.data);
              setReparacionesPendientes(response.data);
            })
            .catch((error) => console.error("Error fetching reparaciones pendientes:", error));
        } else {
          console.error("El ID del técnico no está disponible en las cookies.");
        }

        // Calcular costo total y promedio
        const total: number = reparaciones.reduce((sum: number, rep: Reparacion) => sum + (rep.costo || 0), 0);
        setCostoTotal(total);
        setCostoPromedio(reparaciones.length > 0 ? total / reparaciones.length : 0);
      })
      .catch((error) => console.error("Error fetching reparaciones:", error));
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total de Reparaciones */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Reparaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todasReparaciones.length}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>

        {/* Reparaciones Pendientes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reparaciones Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reparacionesPendientes.length}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>

        {/* Costo Total */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${costoTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>

        {/* Costo Promedio */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${costoPromedio.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Todas las Reparaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las Reparaciones</CardTitle>
          <CardDescription>Lista completa de todas las reparaciones</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Ticket</TableHead>
                <TableHead>Costo Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todasReparaciones.map((reparacion) => (
                <TableRow key={reparacion.reparacion_id}>
                  <TableCell>{reparacion.reparacion_id}</TableCell>
                  <TableCell>{new Date(reparacion.fecha).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">
                    {typeof reparacion.ticket === "object" && reparacion.ticket?.titulo
                      ? reparacion.ticket.titulo
                      : String(reparacion.ticket)}
                  </TableCell>
                  <TableCell>${reparacion.costo ? reparacion.costo.toFixed(2) : "0.00"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabla de Reparaciones Pendientes */}
      <Card>
        <CardHeader>
          <CardTitle>Reparaciones Pendientes</CardTitle>
          <CardDescription>Reparaciones asignadas al técnico logueado</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Ticket</TableHead>
                <TableHead>Costo Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reparacionesPendientes.map((reparacion) => (
                <TableRow key={reparacion.reparacion_id}>
                  <TableCell>{reparacion.reparacion_id}</TableCell>
                  <TableCell>{new Date(reparacion.fecha).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">
                    {typeof reparacion.ticket === "object" && reparacion.ticket?.titulo
                      ? reparacion.ticket.titulo
                      : String(reparacion.ticket)}
                  </TableCell>
                  <TableCell>${reparacion.costo ? reparacion.costo.toFixed(2) : "0.00"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

