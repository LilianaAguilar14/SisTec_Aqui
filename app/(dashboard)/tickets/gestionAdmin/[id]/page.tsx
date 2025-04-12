"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GestorAdminTicketPage() {
  const { id } = useParams();
  const router = useRouter();

  const [ticketData, setTicketData] = useState<any>(null);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [tecnicos, setTecnicos] = useState<any[]>([]);
  const [prioridades, setPrioridades] = useState<any[]>([]);
  const [estados, setEstados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Función para formatear una fecha (en caso de no existir, retorna "")
  const formatFecha = (fechaStr?: string) => {
    if (!fechaStr) return "";
    return new Date(fechaStr).toLocaleDateString();
  };

  useEffect(() => {
    if (!id) {
      setError("No se proporcionó un ID en la URL");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const resTicket = await fetch(`http://localhost:3000/ticket/${id}`);
        if (!resTicket.ok) {
          throw new Error(`Error al obtener ticket. Código: ${resTicket.status}`);
        }
        const ticket = await resTicket.json();
        setTicketData(ticket);

        const resCats = await fetch("http://localhost:3000/categoria-ticket");
        if (!resCats.ok) {
          throw new Error(`Error al obtener categorías. Código: ${resCats.status}`);
        }
        const cats = await resCats.json();
        setCategorias(cats);

        const resTechs = await fetch("http://localhost:3000/usuarios/tecnicos");
        if (!resTechs.ok) {
          throw new Error(`Error al obtener técnicos. Código: ${resTechs.status}`);
        }
        const techs = await resTechs.json();
        setTecnicos(techs);

        const resPrioridades = await fetch("http://localhost:3000/prioridad-ticket");
        if (!resPrioridades.ok) {
          throw new Error(`Error al obtener prioridades. Código: ${resPrioridades.status}`);
        }
        const prios = await resPrioridades.json();
        setPrioridades(prios);

        const resEstados = await fetch("http://localhost:3000/estado-ticket");
        if (!resEstados.ok) {
          throw new Error(`Error al obtener estados. Código: ${resEstados.status}`);
        }
        const estadosData = await resEstados.json();
        setEstados(estadosData);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("No se pudieron cargar los datos del ticket.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // Manejadores de cambio
  const handleCategoriaChange = (value: string) => {
    setTicketData((prev: any) => ({
      ...prev,
      categoria: { categoria_id: Number(value) },
    }));
  };

  const handleTecnicoChange = (value: string) => {
    setTicketData((prev: any) => ({
      ...prev,
      tecnico: { usuario_id: Number(value) },
    }));
  };

  const handlePrioridadChange = (value: string) => {
    setTicketData((prev: any) => ({
      ...prev,
      prioridad: { prioridad_id: Number(value) },
    }));
  };

  const handleEstadoChange = (value: string) => {
    setTicketData((prev: any) => ({
      ...prev,
      estado: { estado_ticket_id: Number(value) },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`http://localhost:3000/ticket/${id}`, {
        method: "PUT", // o PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoria: { categoria_id: ticketData.categoria.categoria_id },
          tecnico: { usuario_id: ticketData.tecnico.usuario_id },
          prioridad: { prioridad_id: ticketData.prioridad?.prioridad_id },
          estado: { estado_ticket_id: ticketData.estado?.estado_ticket_id },
        }),
      });
      if (!response.ok) {
        throw new Error(`Error al actualizar el ticket. Código: ${response.status}`);
      }
      setSuccess(true);
      // Opcional: router.push("/tickets");
    } catch (err) {
      console.error("Error al actualizar el ticket:", err);
      setError("Hubo un error al actualizar el ticket.");
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <p>Cargando ticket...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Desestructuramos las fechas del ticketData (si ya está cargado)
  // Esto evita que hagamos referencia a ellas antes de que existan.
  const { fecha_registro, fecha_solucion } = ticketData || {};

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Link href="/tickets">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle>Edición de Ticket #{id}</CardTitle>
          </div>
        </CardHeader>

        {/* Contenedor para dividir en dos columnas */}
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Columna izquierda: campos editables */}
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select
                    value={ticketData.categoria?.categoria_id?.toString() || ""}
                    onValueChange={handleCategoriaChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categorias.map((cat) => (
                        <SelectItem key={cat.categoria_id} value={cat.categoria_id.toString()}>
                          {cat.categoria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Técnico</Label>
                  <Select
                    value={ticketData.tecnico?.usuario_id?.toString() || ""}
                    onValueChange={handleTecnicoChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el técnico" />
                    </SelectTrigger>
                    <SelectContent>
                      {tecnicos.map((tech) => (
                        <SelectItem key={tech.usuario_id} value={tech.usuario_id.toString()}>
                          {tech.nombre} {tech.apellido}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Prioridad</Label>
                  <Select
                    value={ticketData.prioridad?.prioridad_id?.toString() || ""}
                    onValueChange={handlePrioridadChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      {prioridades.map((prio) => (
                        <SelectItem key={prio.prioridad_id} value={prio.prioridad_id.toString()}>
                          {prio.prioridad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select
                    value={ticketData.estado?.estado_ticket_id?.toString() || ""}
                    onValueChange={handleEstadoChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estados.map((est) => (
                        <SelectItem key={est.estado_ticket_id} value={est.estado_ticket_id.toString()}>
                          {est.estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Columna derecha: información de solo lectura */}
              <div className="flex-1 space-y-6 border rounded-md p-4 bg-gray-50">
                <div className="space-y-1">
                  <Label>Título</Label>
                  <Input value={ticketData.titulo || ""} readOnly className="bg-white" />
                </div>

                <div className="space-y-1">
                  <Label>Descripción</Label>
                  <Textarea value={ticketData.descripcion || ""} readOnly className="bg-white" />
                </div>

                <div className="space-y-1">
                  <Label>Fecha Registro</Label>
                  {/* Llamamos a nuestra función con 'fecha_registro' ya desestructurado */}
                  <Input value={formatFecha(fecha_registro)} readOnly className="bg-white" />
                </div>

                <div className="space-y-1">
                  <Label>Fecha Solución</Label>
                  {/* Si no existe la fecha, mostramos "-", sino la formateamos */}
                  <Input
                    value={ticketData.fecha_solucion ? formatFecha(fecha_solucion) : "-"}
                    readOnly
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Actualizar Ticket
            </Button>
          </CardFooter>
        </form>

        {success && (
          <p className="text-green-500 mt-2 px-4">Ticket actualizado correctamente.</p>
        )}
        {error && <p className="text-red-500 mt-2 px-4">{error}</p>}
      </Card>
    </div>
  );
}
