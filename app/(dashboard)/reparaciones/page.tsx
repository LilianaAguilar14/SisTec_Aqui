"use client";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Importamos Link para navegar
import Cookies from "js-cookie";

interface Ticket {
  ticket_id: number;
  titulo: string;
  descripcion: string;
  fecha_solucion?: string | null;
}

export default function TicketsAsignadosPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const user = JSON.parse(Cookies.get("user") || "{}");
  const userId = user.usuario_id;

  // Cargar tickets asignados al técnico
  useEffect(() => {
    axios
      .get(`http://localhost:3000/ticket/tecnico/${userId}`)
      .then((response) => {
        console.log("Tickets asignados:", response.data);
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener tickets asignados:", error);
      });
  }, []);

  // Filtrar tickets que no tienen fecha de solución
  const ticketsPendientes = tickets.filter((ticket) => !ticket.fecha_solucion);

  // Filtrar tickets que sí tienen fecha de solución
  const ticketsResueltos = tickets.filter((ticket) => ticket.fecha_solucion);

  // Función para formatear fechas
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Pendiente";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Encabezado principal */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Reparaciones pendientes
        </h2>
      </div>

      {/* Tabla de Tickets Pendientes */}
      <Card>
        <CardHeader>
          <CardTitle>Reparaciones</CardTitle>
          <CardDescription>
            Lista de tickets asignados que aún no tienen fecha de solución.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Fecha de Solución</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ticketsPendientes.map((ticket) => (
                <TableRow key={ticket.ticket_id}>
                  <TableCell>{ticket.ticket_id}</TableCell>
                  <TableCell>{ticket.titulo}</TableCell>
                  <TableCell>{ticket.descripcion}</TableCell>
                  <TableCell>{formatDate(ticket.fecha_solucion)}</TableCell>
                  <TableCell>
                    <Link href={`/reparaciones/reparar/${ticket.ticket_id}`}>
                      <Button>Registrar Reparación</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabla de Tickets Resueltos */}
      <Card>
        <CardHeader>
          <CardTitle>Reparaciones Resueltas</CardTitle>
          <CardDescription>
            Lista de tickets asignados que ya tienen fecha de solución.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Fecha de Solución</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ticketsResueltos.map((ticket) => (
                <TableRow key={ticket.ticket_id}>
                  <TableCell>{ticket.ticket_id}</TableCell>
                  <TableCell>{ticket.titulo}</TableCell>
                  <TableCell>{ticket.descripcion}</TableCell>
                  <TableCell>{formatDate(ticket.fecha_solucion)}</TableCell>
                  <TableCell>
                    <Link href={`/reparaciones/${ticket.ticket_id}`}>
                      <Button>Ver Reparación</Button>
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
