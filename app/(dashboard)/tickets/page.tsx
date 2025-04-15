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
import {
  CheckCircle,
  Clock,
  Plus,
  Search,
  Ticket,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import ComentariosModal from "@/components/dashboard/Comentarios"; // Importa el modal

function getEstadoClassName(estadoStr: string) {
  switch (estadoStr) {
    case "Abierto":
      return "bg-red-100 text-red-800 border-red-200";
    case "En progreso":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "En espera":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Resuelto":
      return "bg-green-100 text-green-800 border-green-200";
    case "Cerrado":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-white text-gray-800 border-gray-200";
  }
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTicketId(null);
    setIsModalOpen(false);
  };

  // Leemos la cookie "user"
  const rawUserCookie = Cookies.get("user") || "{}";
  const user = JSON.parse(rawUserCookie);
  const roleId = user?.rol?.rol_id; // Por ejemplo: 1 = Admin, 2 = Técnico, 3 = Cliente
  const userId = user?.usuario_id; // ID del usuario logueado

  useEffect(() => {
    // 1. Parsear la cookie "user" para extraer el nombre y apellido
    if (rawUserCookie) {
      try {
        const decoded = decodeURIComponent(rawUserCookie);
        const userObj = JSON.parse(decoded);
        if (userObj.nombre && userObj.apellido) {
          setNombreCompleto(`${userObj.nombre} ${userObj.apellido}`);
        }
      } catch (error) {
        console.error("Error al parsear cookie user:", error);
      }
    }

    // 2. Definir el endpoint según el rol del usuario
    let endpoint = "http://localhost:3000/ticket"; // Por defecto todos los tickets
    if (roleId === 3 && userId) {
      // Si es cliente, usar la ruta que devuelve solo los tickets del cliente
      endpoint = `http://localhost:3000/ticket/cliente/${userId}`;
    }
    if (roleId === 2) {
      // Si es técnico, usar la ruta que devuelve solo los tickets asignados al técnico
      endpoint = `http://localhost:3000/ticket/tecnico/${userId}`;
    }

    // 3. Llamada a la API
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        // Se mapean los tickets para la vista
        const mappedTickets = data.map((ticket: any) => ({
          id: ticket.ticket_id,
          titulo: ticket.titulo,
          descripcion: ticket.descripcion,
          diagnostico: ticket.diagnostico,
          solucion: ticket.solucion,
          fechaRegistro: new Date(ticket.fecha_registro)
            .toISOString()
            .split("T")[0],
          fechaSolucion: ticket.fecha_solucion
            ? new Date(ticket.fecha_solucion).toISOString().split("T")[0]
            : "-",
          categoria: ticket.categoria ? ticket.categoria.categoria : "N/A",
          prioridad: ticket.prioridad ? ticket.prioridad.prioridad : "N/A",
          dispositivo: ticket.dispositivo ? ticket.dispositivo.nombre : "N/A",
          tecnico: ticket.tecnico
            ? `${ticket.tecnico.nombre} ${ticket.tecnico.apellido}`
            : "N/A",
          cliente: ticket.cliente
            ? `${ticket.cliente.nombre} ${ticket.cliente.apellido}`
            : "N/A",
          estadoText: ticket.estado ? ticket.estado.estado : "Sin estado",
          reparaciones:
            ticket.reparaciones?.map((rep: any) => ({
              id: rep.reparacion_id,
              fecha: rep.fecha_reparacion,
            })) ?? [],
          comentarios:
            ticket.comentarios?.map((com: any) => ({
              id: com.comentario_id,
              contenido: com.contenido,
              fecha: com.fecha_comentario,
            })) ?? [],
          cambiosEstado: ticket.cambiosEstado ? ticket.cambiosEstado.length : 0,
        }));

        setTickets(mappedTickets);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los tickets:", error);
        setLoading(false);
      });
  }, [rawUserCookie, roleId, userId]);

  // Filtrado de tickets en tiempo real
  const filteredTickets = tickets.filter((ticket) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      ticket.titulo.toLowerCase().includes(searchLower) ||
      ticket.descripcion.toLowerCase().includes(searchLower) ||
      ticket.cliente.toLowerCase().includes(searchLower)
    );
  });

  // Manejo del submit del buscador
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (loading) {
    return <div>Cargando tickets...</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Cabecera con el nombre del usuario logueado */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Lista de Tickets
          {nombreCompleto && (
            <span className="block text-sm font-normal text-gray-600">
              Bienvenido, {nombreCompleto}
            </span>
          )}
        </h2>
        <div className="flex items-center space-x-2">
          <Link href="/tickets/nuevo">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Ticket
            </Button>
          </Link>
        </div>
      </div>

      {/* Tarjetas de resumen (podrías ocultarlas si es cliente, si así lo deseas) */}
      {roleId !== 3 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Tickets
              </CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tickets.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tickets "Abierto"
              </CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tickets.filter((t) => t.estadoText === "Abierto").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tickets "En progreso"
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tickets.filter((t) => t.estadoText === "En progreso").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tickets "Resuelto"
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tickets.filter((t) => t.estadoText === "Resuelto").length}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Buscador */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Tickets</CardTitle>
          <CardDescription>
            Utiliza el buscador para filtrar los tickets
          </CardDescription>
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-sm items-center space-x-2 mt-2"
          >
            <Input
              type="search"
              placeholder="Buscar ticket..."
              className="h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="sm" className="h-9 px-4 py-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </form>
        </CardHeader>
      </Card>

      {/* Tabla de tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Tickets</CardTitle>
          <CardDescription>Gestiona los tickets de reparación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Diagnóstico</TableHead>
                  <TableHead>Solución</TableHead>
                  <TableHead>Fecha Registro</TableHead>
                  <TableHead>Fecha Solución</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Dispositivo</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Comentarios</TableHead>
                  {roleId === 1 && <TableHead>Gestión Admin</TableHead>}
                  {roleId === 2 && <TableHead>Gestión Técnico</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => {
                  const estadoClassName = getEstadoClassName(ticket.estadoText);
                  return (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.titulo}</TableCell>
                      <TableCell>{ticket.descripcion}</TableCell>
                      <TableCell>{ticket.diagnostico}</TableCell>
                      <TableCell>{ticket.solucion}</TableCell>
                      <TableCell>{ticket.fechaRegistro}</TableCell>
                      <TableCell>{ticket.fechaSolucion}</TableCell>
                      <TableCell>{ticket.categoria}</TableCell>
                      <TableCell>{ticket.prioridad}</TableCell>
                      <TableCell>{ticket.dispositivo}</TableCell>
                      <TableCell>{ticket.tecnico}</TableCell>
                      <TableCell>{ticket.cliente}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${estadoClassName}`}
                        >
                          {ticket.estadoText}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-gray-500 hover:bg-gray-600"
                          onClick={() => handleOpenModal(ticket.id)}
                        >
                          Ver Comentarios
                        </Button>
                      </TableCell>
                      {roleId === 1 && (
                        <TableCell>
                          <Link href={`/tickets/gestionAdmin/${ticket.id}`}>
                            <Button
                              size="sm"
                              className="bg-blue-500 hover:bg-blue-600"
                            >
                              Gestionar
                            </Button>
                          </Link>
                        </TableCell>
                      )}
                      {roleId === 2 && (
                        <TableCell>
                          <Link href={`/tickets/gestionTecnico/${ticket.id}`}>
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600"
                            >
                              Gestionar
                            </Button>
                          </Link>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Modal de comentarios */}
      {selectedTicketId && (
        <ComentariosModal
          ticketId={selectedTicketId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
