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
  // Ajusta o agrega campos que necesites
}

export default function TicketsAsignadosPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const user = JSON.parse(Cookies.get("user") || "{}");
  const userId = user.usuario_id; // ID del usuario logueado
  console.log(user.id);

  // Cargar tickets asignados al técnico con ID=3 (harcodeado como ejemplo).
  useEffect(() => {
    axios
      .get(`/ticket/tecnico/${userId}`)
      .then((response) => {
        console.log("Tickets asignados:", response.data);
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener tickets asignados:", error);
      });
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Encabezado principal */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Reparaciones pendientes
        </h2>
      </div>

      {/* Tabla de Tickets Asignados */}
      <Card>
        <CardHeader></CardHeader>
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
              {tickets.map((ticket) => (
                <TableRow key={ticket.ticket_id}>
                  <TableCell>{ticket.ticket_id}</TableCell>
                  <TableCell>{ticket.titulo}</TableCell>
                  <TableCell>{ticket.descripcion}</TableCell>
                  <TableCell>
                    {ticket.fecha_solucion
                      ? new Date(ticket.fecha_solucion).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "Pendiente"}
                  </TableCell>
                  {/* Aquí añadimos la columna de "Acciones" */}
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
    </div>
  );
}
