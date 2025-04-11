import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NuevoDispositivoPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/dispositivos">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Nuevo Dispositivo</h2>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Información del Dispositivo</CardTitle>
          <CardDescription>Ingresa los detalles del nuevo dispositivo a registrar en el sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Dispositivo</Label>
              <Input id="nombre" placeholder="Ej: Dell XPS 15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Dispositivo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="impresora">Impresora</SelectItem>
                  <SelectItem value="monitor">Monitor</SelectItem>
                  <SelectItem value="tablet">Tablet</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="marca">Marca</Label>
              <Input id="marca" placeholder="Ej: Dell" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo</Label>
              <Input id="modelo" placeholder="Ej: XPS 15 9500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serie">Número de Serie</Label>
              <Input id="serie" placeholder="Ej: DL123456789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usuario">Usuario Asignado</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Juan Pérez</SelectItem>
                  <SelectItem value="2">María Rodríguez</SelectItem>
                  <SelectItem value="3">Carlos López</SelectItem>
                  <SelectItem value="4">Ana González</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fecha_adquisicion">Fecha de Adquisición</Label>
              <Input id="fecha_adquisicion" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="garantia">Fecha de Vencimiento de Garantía</Label>
              <Input id="garantia" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="reparacion">En Reparación</SelectItem>
                  <SelectItem value="mantenimiento">En Mantenimiento</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="especificaciones">Especificaciones Técnicas</Label>
            <Textarea
              id="especificaciones"
              placeholder="Ingresa las especificaciones técnicas del dispositivo (CPU, RAM, almacenamiento, etc.)"
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea id="observaciones" placeholder="Observaciones adicionales sobre el dispositivo" rows={3} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link href="/dashboard/dispositivos">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button className="bg-primary hover:bg-primary/90">Guardar Dispositivo</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

