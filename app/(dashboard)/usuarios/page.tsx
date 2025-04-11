import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Users } from "lucide-react"
import Link from "next/link"

export default function UsuariosPage() {
  // Datos de ejemplo para usuarios
  const usuarios = [
    { id: 1, nombre: "Juan Pérez", correo: "juan.perez@empresa.com", telefono: "555-123-4567" },
    { id: 2, nombre: "María Rodríguez", correo: "maria.rodriguez@empresa.com", telefono: "555-987-6543" },
    { id: 3, nombre: "Carlos López", correo: "carlos.lopez@empresa.com", telefono: "555-456-7890" },
    { id: 4, nombre: "Ana González", correo: "ana.gonzalez@empresa.com", telefono: "555-789-0123" },
    { id: 5, nombre: "Roberto Sánchez", correo: "roberto.sanchez@empresa.com", telefono: "555-321-6549" },
    { id: 6, nombre: "Laura Ramírez", correo: "laura.ramirez@empresa.com", telefono: "555-654-9873" },
    { id: 7, nombre: "Pedro Díaz", correo: "pedro.diaz@empresa.com", telefono: "555-159-7534" },
    { id: 8, nombre: "Sofía Torres", correo: "sofia.torres@empresa.com", telefono: "555-753-1594" },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
        <div className="flex items-center space-x-2">
          <Link href="/usuarios/nuevo">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usuarios.length}</div>
            <p className="text-xs text-muted-foreground">+3 desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>Gestiona los usuarios registrados en el sistema</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="search" placeholder="Buscar usuario..." className="h-9" />
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
                <TableHead>Correo</TableHead>
                <TableHead>Teléfono</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.id}</TableCell>
                  <TableCell className="font-medium">{usuario.nombre}</TableCell>
                  <TableCell>{usuario.correo}</TableCell>
                  <TableCell>{usuario.telefono}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

