import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Laptop, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function EquiposPage() {
  // Datos de ejemplo para equipos
  const equipos = [
    {
      id: 1,
      categoria: "Laptop",
      nombre: "Dell XPS 15",
      marca: "Dell",
      modelo: "XPS 15 9500",
      serie: "DL123456789",
      usuario: "Juan Pérez",
    },
    {
      id: 2,
      categoria: "Desktop",
      nombre: "HP Pavilion",
      marca: "HP",
      modelo: "Pavilion 590",
      serie: "HP987654321",
      usuario: "María Rodríguez",
    },
    {
      id: 3,
      categoria: "Impresora",
      nombre: "Epson EcoTank",
      marca: "Epson",
      modelo: "L3150",
      serie: "EP456789123",
      usuario: "Carlos López",
    },
    {
      id: 4,
      categoria: "Monitor",
      nombre: "Samsung Curved",
      marca: "Samsung",
      modelo: "C27F591",
      serie: "SM789123456",
      usuario: "Ana González",
    },
    {
      id: 5,
      categoria: "Laptop",
      nombre: "MacBook Pro",
      marca: "Apple",
      modelo: "MacBook Pro 13",
      serie: "AP321654987",
      usuario: "Roberto Sánchez",
    },
    {
      id: 6,
      categoria: "Tablet",
      nombre: "iPad Pro",
      marca: "Apple",
      modelo: "iPad Pro 12.9",
      serie: "AP654987321",
      usuario: "Laura Ramírez",
    },
    {
      id: 7,
      categoria: "Desktop",
      nombre: "Lenovo ThinkCentre",
      marca: "Lenovo",
      modelo: "M720",
      serie: "LN159753468",
      usuario: "Pedro Díaz",
    },
    {
      id: 8,
      categoria: "Impresora",
      nombre: "HP LaserJet",
      marca: "HP",
      modelo: "M404dn",
      serie: "HP753159468",
      usuario: "Sofía Torres",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Equipos</h2>
        <div className="flex items-center space-x-2">
          <Link href="/equipos/nuevo">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Equipo
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Equipos</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">+12 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laptops</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-muted-foreground">+5 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desktops</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">62</div>
            <p className="text-xs text-muted-foreground">+3 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Otros Dispositivos</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">40</div>
            <p className="text-xs text-muted-foreground">+4 desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Equipos</CardTitle>
          <CardDescription>Gestiona los equipos registrados en el sistema</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="search" placeholder="Buscar equipo..." className="h-9" />
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
                <TableHead>Categoría</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>No. Serie</TableHead>
                <TableHead>Usuario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipos.map((equipo) => (
                <TableRow key={equipo.id}>
                  <TableCell>{equipo.id}</TableCell>
                  <TableCell>{equipo.categoria}</TableCell>
                  <TableCell className="font-medium">{equipo.nombre}</TableCell>
                  <TableCell>{equipo.marca}</TableCell>
                  <TableCell>{equipo.modelo}</TableCell>
                  <TableCell>{equipo.serie}</TableCell>
                  <TableCell>{equipo.usuario}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

