import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Laptop, Monitor, Plus, Printer, Search, Server } from "lucide-react"
import Link from "next/link"

export default function DispositivosPage() {
  // Datos de ejemplo para dispositivos
  const dispositivos = [
    {
      id: 1,
      nombre: "Dell XPS 15",
      tipo: "Laptop",
      marca: "Dell",
      modelo: "XPS 15 9500",
      serie: "DL123456789",
      usuario: "Juan Pérez",
      estado: "Activo",
      fecha_adquisicion: "2022-05-15",
      garantia: "2024-05-15",
    },
    {
      id: 2,
      nombre: "HP Pavilion Desktop",
      tipo: "Desktop",
      marca: "HP",
      modelo: "Pavilion 590",
      serie: "HP987654321",
      usuario: "María Rodríguez",
      estado: "Activo",
      fecha_adquisicion: "2021-08-20",
      garantia: "2023-08-20",
    },
    {
      id: 3,
      nombre: "Epson EcoTank L3150",
      tipo: "Impresora",
      marca: "Epson",
      modelo: "L3150",
      serie: "EP456789123",
      usuario: "Carlos López",
      estado: "Mantenimiento",
      fecha_adquisicion: "2022-02-10",
      garantia: "2024-02-10",
    },
    {
      id: 4,
      nombre: "Samsung Curved Monitor",
      tipo: "Monitor",
      marca: "Samsung",
      modelo: "C27F591",
      serie: "SM789123456",
      usuario: "Ana González",
      estado: "Activo",
      fecha_adquisicion: "2022-11-05",
      garantia: "2024-11-05",
    },
    {
      id: 5,
      nombre: "MacBook Pro 13",
      tipo: "Laptop",
      marca: "Apple",
      modelo: "MacBook Pro 13",
      serie: "AP321654987",
      usuario: "Roberto Sánchez",
      estado: "Reparación",
      fecha_adquisicion: "2021-12-15",
      garantia: "2023-12-15",
    },
    {
      id: 6,
      nombre: "iPad Pro 12.9",
      tipo: "Tablet",
      marca: "Apple",
      modelo: "iPad Pro 12.9",
      serie: "AP654987321",
      usuario: "Laura Ramírez",
      estado: "Activo",
      fecha_adquisicion: "2023-01-20",
      garantia: "2025-01-20",
    },
    {
      id: 7,
      nombre: "Lenovo ThinkCentre",
      tipo: "Desktop",
      marca: "Lenovo",
      modelo: "M720",
      serie: "LN159753468",
      usuario: "Pedro Díaz",
      estado: "Activo",
      fecha_adquisicion: "2022-07-10",
      garantia: "2024-07-10",
    },
    {
      id: 8,
      nombre: "HP LaserJet Pro",
      tipo: "Impresora",
      marca: "HP",
      modelo: "M404dn",
      serie: "HP753159468",
      usuario: "Sofía Torres",
      estado: "Inactivo",
      fecha_adquisicion: "2021-05-05",
      garantia: "2023-05-05",
    },
  ]

  // Contadores para las tarjetas de estadísticas
  const totalDispositivos = dispositivos.length
  const laptops = dispositivos.filter((d) => d.tipo === "Laptop").length
  const desktops = dispositivos.filter((d) => d.tipo === "Desktop").length
  const impresoras = dispositivos.filter((d) => d.tipo === "Impresora").length
  const enReparacion = dispositivos.filter((d) => d.estado === "Reparación").length

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dispositivos</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/dispositivos/nuevo">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Dispositivo
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dispositivos</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDispositivos}</div>
            <p className="text-xs text-muted-foreground">+5 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Laptops</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{laptops}</div>
            <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desktops</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{desktops}</div>
            <p className="text-xs text-muted-foreground">+1 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impresoras</CardTitle>
            <Printer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impresoras}</div>
            <p className="text-xs text-muted-foreground">+0 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Reparación</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enReparacion}</div>
            <p className="text-xs text-muted-foreground">+1 desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Dispositivos</CardTitle>
          <CardDescription>Gestiona los dispositivos registrados en el sistema</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="search" placeholder="Buscar dispositivo..." className="h-9" />
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
                <TableHead>Tipo</TableHead>
                <TableHead>Marca/Modelo</TableHead>
                <TableHead>No. Serie</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Garantía</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dispositivos.map((dispositivo) => (
                <TableRow key={dispositivo.id}>
                  <TableCell>{dispositivo.id}</TableCell>
                  <TableCell className="font-medium">{dispositivo.nombre}</TableCell>
                  <TableCell>{dispositivo.tipo}</TableCell>
                  <TableCell>
                    {dispositivo.marca} {dispositivo.modelo}
                  </TableCell>
                  <TableCell>{dispositivo.serie}</TableCell>
                  <TableCell>{dispositivo.usuario}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        dispositivo.estado === "Activo"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : dispositivo.estado === "Reparación"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : dispositivo.estado === "Mantenimiento"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {dispositivo.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>{dispositivo.garantia}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

