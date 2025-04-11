import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Cpu, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function ComponentesPage() {
  // Datos de ejemplo para componentes
  const componentes = [
    {
      id: 1,
      nombre: "Disco Duro SSD 500GB",
      tipo: "Almacenamiento",
      cantidad: 25,
      precio: 1200.0,
      proveedor: "TechSupply Inc.",
    },
    { id: 2, nombre: "Memoria RAM 8GB DDR4", tipo: "Memoria", cantidad: 40, precio: 850.5, proveedor: "ComponentesMX" },
    {
      id: 3,
      nombre: "Procesador Intel i5",
      tipo: "Procesador",
      cantidad: 15,
      precio: 3500.0,
      proveedor: "ElectroPartes",
    },
    {
      id: 4,
      nombre: "Tarjeta Gráfica NVIDIA GTX 1660",
      tipo: "Gráficos",
      cantidad: 10,
      precio: 4200.0,
      proveedor: "InnovaTech",
    },
    { id: 5, nombre: "Fuente de Poder 650W", tipo: "Energía", cantidad: 20, precio: 950.0, proveedor: "MegaComp" },
    {
      id: 6,
      nombre: "Placa Madre ASUS",
      tipo: "Placa Base",
      cantidad: 12,
      precio: 2800.0,
      proveedor: "TecnoSoluciones",
    },
    { id: 7, nombre: "Ventilador CPU", tipo: "Refrigeración", cantidad: 30, precio: 350.0, proveedor: "DigitalParts" },
    { id: 8, nombre: "Cable HDMI 2m", tipo: "Cables", cantidad: 50, precio: 120.0, proveedor: "ElectronicaTotal" },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Componentes</h2>
        <div className="flex items-center space-x-2">
          <Link href="/componentes/nuevo">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Componente
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Componentes</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">202</div>
            <p className="text-xs text-muted-foreground">+15 desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245,350.00</div>
            <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Componentes Críticos</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">-2 desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Componentes</CardTitle>
          <CardDescription>Gestiona los componentes disponibles para reparaciones</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="search" placeholder="Buscar componente..." className="h-9" />
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
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Proveedor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {componentes.map((componente) => (
                <TableRow key={componente.id}>
                  <TableCell>{componente.id}</TableCell>
                  <TableCell className="font-medium">{componente.nombre}</TableCell>
                  <TableCell>{componente.tipo}</TableCell>
                  <TableCell>{componente.cantidad}</TableCell>
                  <TableCell>${componente.precio.toFixed(2)}</TableCell>
                  <TableCell>{componente.proveedor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

