import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Clock, Plus, Search, Ticket, XCircle } from "lucide-react"
import Link from "next/link"

export default function TicketsPage() {
  // Datos de ejemplo para tickets
  const tickets = [
    {
      id: 1,
      equipo: "Dell XPS 15",
      fechaInicio: "2023-05-15",
      fechaFin: "2023-05-18",
      usuario: "Juan Pérez",
      descripcion: "Pantalla dañada",
      estatus: "Completado",
    },
    {
      id: 2,
      equipo: "HP Pavilion",
      fechaInicio: "2023-05-20",
      fechaFin: null,
      usuario: "María Rodríguez",
      descripcion: "No enciende",
      estatus: "En proceso",
    },
    {
      id: 3,
      equipo: "Epson EcoTank",
      fechaInicio: "2023-05-22",
      fechaFin: null,
      usuario: "Carlos López",
      descripcion: "No imprime",
      estatus: "Pendiente",
    },
    {
      id: 4,
      equipo: "Samsung Curved",
      fechaInicio: "2023-05-10",
      fechaFin: "2023-05-12",
      usuario: "Ana González",
      descripcion: "Líneas en pantalla",
      estatus: "Completado",
    },
    {
      id: 5,
      equipo: "MacBook Pro",
      fechaInicio: "2023-05-25",
      fechaFin: null,
      usuario: "Roberto Sánchez",
      descripcion: "Batería no carga",
      estatus: "En proceso",
    },
    {
      id: 6,
      equipo: "iPad Pro",
      fechaInicio: "2023-05-18",
      fechaFin: "2023-05-19",
      usuario: "Laura Ramírez",
      descripcion: "Pantalla táctil no responde",
      estatus: "Completado",
    },
    {
      id: 7,
      equipo: "Lenovo ThinkCentre",
      fechaInicio: "2023-05-28",
      fechaFin: null,
      usuario: "Pedro Díaz",
      descripcion: "Ventilador ruidoso",
      estatus: "Pendiente",
    },
    {
      id: 8,
      equipo: "HP LaserJet",
      fechaInicio: "2023-05-05",
      fechaFin: "2023-05-08",
      usuario: "Sofía Torres",
      descripcion: "Atasco de papel",
      estatus: "Completado",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
        <div className="flex items-center space-x-2">
          <Link href="/tickets/nuevo">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Ticket
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.length}</div>
            <p className="text-xs text-muted-foreground">+5 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Pendientes</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter((t) => t.estatus === "Pendiente").length}</div>
            <p className="text-xs text-muted-foreground">+1 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets en Proceso</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter((t) => t.estatus === "En proceso").length}</div>
            <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.filter((t) => t.estatus === "Completado").length}</div>
            <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Tickets</CardTitle>
          <CardDescription>Gestiona los tickets de reparación</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="search" placeholder="Buscar ticket..." className="h-9" />
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
                <TableHead>Equipo</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Fecha Fin</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estatus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell className="font-medium">{ticket.equipo}</TableCell>
                  <TableCell>{ticket.fechaInicio}</TableCell>
                  <TableCell>{ticket.fechaFin || "-"}</TableCell>
                  <TableCell>{ticket.usuario}</TableCell>
                  <TableCell>{ticket.descripcion}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        ticket.estatus === "Completado"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : ticket.estatus === "En proceso"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      {ticket.estatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

