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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


export default function GestionTecnicoTicketPage() {
  const { id } = useParams();
  const router = useRouter();

  // Datos completos del ticket
  const [ticketData, setTicketData] = useState<any>(null);
  // Estados traídos de la API
  const [estados, setEstados] = useState<any[]>([]);
  
  // Control de estados de carga, error y éxito
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Campos que el técnico puede editar
  const [diagnostico, setDiagnostico] = useState("");
  const [solucion, setSolucion] = useState("");
  const [nuevosComentarios, setNuevosComentarios] = useState("");
  // Guardamos el id del estado seleccionado en el Select (como string)
  const [estadoEditable, setEstadoEditable] = useState("");

  useEffect(() => {
    if (!id) {
      setError("No se proporcionó un ID en la URL");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        // Obtener el ticket
        const resTicket = await fetch(`http://localhost:3000/ticket/${id}`);
        if (!resTicket.ok) {
          throw new Error(`Error al obtener ticket. Código: ${resTicket.status}`);
        }
        const data = await resTicket.json();
        setTicketData(data);

        // Inicializar los campos editables
        setDiagnostico(data.diagnostico || "");
        setSolucion(data.solucion || "");
        if (Array.isArray(data.comentarios)) {
          const comentariosConcatenados = data.comentarios
            .map((c: any) => c.contenido)
            .join("\n---------\n");
          setNuevosComentarios(comentariosConcatenados);
        } else {
          setNuevosComentarios(data.comentarios || "");
        }
        // Inicializa el estado editable (se asume que data.estado.estado_ticket_id es un número)
        setEstadoEditable(data.estado?.estado_ticket_id?.toString() || "");

        // Obtener estados desde la API
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

  // Función que se ejecuta cuando se selecciona un nuevo estado en el Select
  const handleEstadoChange = (value: string) => {
    setEstadoEditable(value);
  };

  const agregarComentarios = async () => {
    const comentariosArray = nuevosComentarios
      .split("\n\n")
      .map((comentario) => comentario.trim())
      .filter((comentario) => comentario !== "");

    // Recorre cada comentario y ejecuta un POST
    for (const comentario of comentariosArray) {
      try {
        const comentarioData = {
          contenido: comentario,
          fecha_comentario: new Date().toISOString(),
          ticket: { ticket_id: Number(id) },
          usuario: { usuario_id: Number(ticketData.tecnico.usuario_id) }, // Asumiendo que el técnico es el que agrega el comentario
          
        };
        
        console.log("Comentario a agregar:", comentarioData);
        const resComentario = await fetch("http://localhost:3000/comentario-ticket", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(comentarioData),
        });
  
        if (!resComentario.ok) {
          console.error(`Error al agregar comentario. Código: ${resComentario.status}`);
        }
      } catch (err) {
        console.error("Error al agregar comentario:", err);
      }
    }
  };

  // Manejo de envío del formulario: actualiza ticket mediante PUT y luego agrega comentarios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      // Asigna la fecha actual en formato ISO
      const fecha = new Date().toISOString();

      // Construir el cuerpo del PUT con la estructura requerida
      const bodyData = {
        diagnostico,
        solucion,
        estado: { estado_ticket_id: Number(estadoEditable) },
        fecha_solucion: fecha,
      };

      const response = await fetch(`http://localhost:3000/ticket/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el ticket. Código: ${response.status}`);
      }

      // Actualizamos los datos locales una vez guardados exitosamente
      setTicketData((prev: any) => ({
        ...prev,
        diagnostico,
        solucion,
        estado: estados.find(
          (est) => est.estado_ticket_id.toString() === estadoEditable
        ),
        fecha_solucion: fecha,
      }));

      // Agregar comentarios mediante el endpoint dedicado
      await agregarComentarios();

      setSuccess(true);

      // Opcional: redirigir a la lista de tickets
      // router.push("/tickets");
    } catch (err) {
      console.error("Error al actualizar el ticket:", err.message);
      setError("Hubo un error al actualizar el ticket.");
    }
  };

  // Para la fecha de registro, se usa toLocaleDateString
  const fechaRegistroStr = ticketData?.fecha_registro
    ? new Date(ticketData.fecha_registro).toLocaleDateString()
    : "";

  if (loading) {
    return <div className="p-4">Cargando ticket...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const {
    titulo = "",
    descripcion = "",
    fecha_solucion,
    categoria,
    prioridad,
    dispositivo,
    tecnico,
    cliente,
  } = ticketData || {};

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
            <CardTitle>Edición Técnico de Ticket #{id}</CardTitle>
          </div>
          <CardDescription>
            El técnico puede modificar el diagnóstico, la solución, los comentarios y el estado. La fecha solución se asignará a la fecha actual al guardar.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Columna izquierda: campos editables */}
              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <Label>Diagnóstico</Label>
                  <Textarea
                    value={diagnostico}
                    onChange={(e) => setDiagnostico(e.target.value)}
                    placeholder="Ingrese el diagnóstico..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Solución</Label>
                  <Textarea
                    value={solucion}
                    onChange={(e) => setSolucion(e.target.value)}
                    placeholder="Ingrese la solución..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Comentarios</Label>
                  <Textarea
                    value={nuevosComentarios}
                    onChange={(e) => setNuevosComentarios(e.target.value)}
                    placeholder="Ingrese comentarios adicionales..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select value={estadoEditable} onValueChange={handleEstadoChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estados.map((est) => (
                        <SelectItem
                          key={est.estado_ticket_id}
                          value={est.estado_ticket_id.toString()}
                        >
                          {est.estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Columna derecha: campos en modo solo lectura */}
              <div className="flex-1 space-y-6 border rounded-md p-4 bg-gray-50">
                <div className="space-y-1">
                  <Label>Título</Label>
                  <Input readOnly className="bg-white" value={titulo} />
                </div>
                <div className="space-y-1">
                  <Label>Descripción</Label>
                  <Textarea readOnly className="bg-white" value={descripcion} />
                </div>
                <div className="space-y-1">
                  <Label>Fecha Registro</Label>
                  <Input readOnly className="bg-white" value={fechaRegistroStr} />
                </div>
                <div className="space-y-1">
                  <Label>Fecha Solución</Label>
                  <Input readOnly className="bg-white" value={fecha_solucion || "-"} />
                </div>
                <div className="space-y-1">
                  <Label>Categoría</Label>
                  <Input readOnly className="bg-white" value={categoria?.categoria || "N/A"} />
                </div>
                <div className="space-y-1">
                  <Label>Prioridad</Label>
                  <Input readOnly className="bg-white" value={prioridad?.prioridad || "N/A"} />
                </div>
                <div className="space-y-1">
                  <Label>Dispositivo</Label>
                  <Input readOnly className="bg-white" value={dispositivo?.nombre || "N/A"} />
                </div>
                <div className="space-y-1">
                  <Label>Técnico</Label>
                  <Input
                    readOnly
                    className="bg-white"
                    value={tecnico ? `${tecnico.nombre} ${tecnico.apellido}` : "N/A"}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Cliente</Label>
                  <Input
                    readOnly
                    className="bg-white"
                    value={cliente ? `${cliente.nombre} ${cliente.apellido}` : "N/A"}
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
          <p className="text-green-500 mt-2 px-4">
            Ticket actualizado correctamente.
          </p>
        )}
        {error && <p className="text-red-500 mt-2 px-4">{error}</p>}
      </Card>
    </div>
  );
}
