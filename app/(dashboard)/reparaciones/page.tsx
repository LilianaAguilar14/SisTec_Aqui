import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ClipboardList, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function ReparacionesPage() {
  // Datos de ejemplo para reparaciones
  const reparaciones = [
    { id: 1, fecha: "2023-05-18", ticket: "Pantalla dañada - Dell XPS 15", costo: 3500.0 },
    { id: 2, fecha: "2023-05-12", ticket: "Líneas en pantalla - Samsung Curved", costo: 1800.0 },
    { id: 3, fecha: "2023-05-19", ticket: "Pantalla táctil no responde - iPad Pro", costo: 2200.0 },
    { id: 4, fecha: "2023-05-08", ticket: "Atasco de papel - HP LaserJet", costo: 500.0 },
    { id: 5, fecha: "2023-04-25", ticket: "Teclado no funciona - Lenovo ThinkPad", costo: 1200.0 },
    { id: 6, fecha: "2023-04-18", ticket: "Batería dañada - MacBook Air", costo: 2800.0 },
    { id: 7, fecha: "2023-04-10", ticket: "Disco duro corrupto - HP Pavilion", costo: 1500.0 },
    { id: 8, fecha: "2023-04-05", ticket: "Ventilador ruidoso - Dell Inspiron", costo: 800.0 },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reparaciones</h2>
        <div className="flex items-center space-x-2">
          <Link href="/reparaciones/nueva">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Reparación
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Reparaciones</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reparaciones.length}</div>
            <p className="text-xs text-muted-foreground">+3 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reparaciones del Mes</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">-1 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Total</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${reparaciones.reduce((sum, rep) => sum + rep.costo, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">+15% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Promedio</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(reparaciones.reduce((sum, rep) => sum + rep.costo, 0) / reparaciones.length).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">+5% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Reparaciones</CardTitle>
          <CardDescription>Gestiona las reparaciones realizadas</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="search" placeholder="Buscar reparación..." className="h-9" />
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
                <TableHead>Fecha</TableHead>
                <TableHead>Ticket</TableHead>
                <TableHead>Costo Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reparaciones.map((reparacion) => (
                <TableRow key={reparacion.id}>
                  <TableCell>{reparacion.id}</TableCell>
                  <TableCell>{reparacion.fecha}</TableCell>
                  <TableCell className="font-medium">{reparacion.ticket}</TableCell>
                  <TableCell>${reparacion.costo.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

