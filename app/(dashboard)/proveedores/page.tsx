import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Truck } from "lucide-react"
import Link from "next/link"

export default function ProveedoresPage() {
  // Datos de ejemplo para proveedores
  const proveedores = [
    {
      id: 1,
      nombre: "TechSupply Inc.",
      rfc: "TSI123456789",
      contacto: "Juan Martínez",
      email: "juan@techsupply.com",
      tel: "555-123-4567",
    },
    {
      id: 2,
      nombre: "ComponentesMX",
      rfc: "CMX987654321",
      contacto: "María Rodríguez",
      email: "maria@componentesmx.com",
      tel: "555-987-6543",
    },
    {
      id: 3,
      nombre: "ElectroPartes",
      rfc: "ELP456789123",
      contacto: "Carlos López",
      email: "carlos@electropartes.com",
      tel: "555-456-7890",
    },
    {
      id: 4,
      nombre: "InnovaTech",
      rfc: "INT789123456",
      contacto: "Ana González",
      email: "ana@innovatech.com",
      tel: "555-789-0123",
    },
    {
      id: 5,
      nombre: "MegaComp",
      rfc: "MCO321654987",
      contacto: "Roberto Sánchez",
      email: "roberto@megacomp.com",
      tel: "555-321-6549",
    },
    {
      id: 6,
      nombre: "TecnoSoluciones",
      rfc: "TSO654987321",
      contacto: "Laura Ramírez",
      email: "laura@tecnosoluciones.com",
      tel: "555-654-9873",
    },
    {
      id: 7,
      nombre: "DigitalParts",
      rfc: "DPA159753468",
      contacto: "Pedro Díaz",
      email: "pedro@digitalparts.com",
      tel: "555-159-7534",
    },
    {
      id: 8,
      nombre: "ElectronicaTotal",
      rfc: "ETO753159468",
      contacto: "Sofía Torres",
      email: "sofia@electronicatotal.com",
      tel: "555-753-1594",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Proveedores</h2>
        <div className="flex items-center space-x-2">
          <Link href="/proveedores/nuevo">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Proveedor
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Proveedores</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{proveedores.length}</div>
            <p className="text-xs text-muted-foreground">+2 desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Proveedores</CardTitle>
          <CardDescription>Gestiona los proveedores de componentes para reparaciones</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="search" placeholder="Buscar proveedor..." className="h-9" />
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
                <TableHead>RFC</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proveedores.map((proveedor) => (
                <TableRow key={proveedor.id}>
                  <TableCell>{proveedor.id}</TableCell>
                  <TableCell className="font-medium">{proveedor.nombre}</TableCell>
                  <TableCell>{proveedor.rfc}</TableCell>
                  <TableCell>{proveedor.contacto}</TableCell>
                  <TableCell>{proveedor.email}</TableCell>
                  <TableCell>{proveedor.tel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

