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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * Este componente representa la pantalla de edición "gestionar admin" de un ticket,
 * usando el App Router de Next.js 13 en la ruta /tickets/gestionAdmin/[id]/page.tsx.
 *
 * Ahora se agrega el selector de dispositivo para que el administrador también pueda asignarlo.
 */
export default function GestorAdminTicketPage() {
  // 1. Obtenemos el id del ticket desde la ruta dinámica
  const { id } = useParams();
  // 2. Para redirigir después de editar si se desea
  const router = useRouter();

  // Estado local para almacenar el ticket, categorías, técnicos y dispositivos
  const [ticketData, setTicketData] = useState<any>(null);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [tecnicos, setTecnicos] = useState<any[]>([]);
  const [dispositivos, setDispositivos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // 3. useEffect para cargar los datos del ticket, las categorías, técnicos y dispositivos
  useEffect(() => {
    if (!id) {
      setError("No se proporcionó un ID en la URL");
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        // Obtener detalle del ticket
        const resTicket = await fetch(`http://localhost:3000/ticket/${id}`);
        if (!resTicket.ok) {
          throw new Error(`Error al obtener ticket. Código: ${resTicket.status}`);
        }
        const ticket = await resTicket.json();
        setTicketData(ticket);

        // Obtener la lista de categorías (nota: se usa el endpoint "categoria-ticket")
        const resCats = await fetch("http://localhost:3000/categoria-ticket");
        if (!resCats.ok) {
          throw new Error(`Error al obtener categorías. Código: ${resCats.status}`);
        }
        const cats = await resCats.json();
        setCategorias(cats);

        // Obtener la lista de técnicos
        const resTechs = await fetch("http://localhost:3000/usuarios/tecnicos");
        if (!resTechs.ok) {
          throw new Error(`Error al obtener técnicos. Código: ${resTechs.status}`);
        }
        const techs = await resTechs.json();
        setTecnicos(techs);

        // Obtener la lista de dispositivos
        const resDisp = await fetch("http://localhost:3000/tipo-dispositivo");
        if (!resDisp.ok) {
          throw new Error(`Error al obtener dispositivos. Código: ${resDisp.status}`);
        }
        const dispData = await resDisp.json();
        setDispositivos(dispData);

      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("No se pudieron cargar los datos del ticket.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  // 4. Manejadores de cambio para categoría, técnico y dispositivo
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

  const handleDispositivoChange = (value: string) => {
    setTicketData((prev: any) => ({
      ...prev,
      dispositivo: { dispositivo_id: Number(value) },
    }));
  };

  // 5. Envío del formulario para actualizar el ticket
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`http://localhost:3000/ticket/${id}`, {
        method: "PUT", // o PATCH, según tu backend
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoria: { categoria_id: ticketData.categoria.categoria_id },
          tecnico: { usuario_id: ticketData.tecnico.usuario_id },
          dispositivo: { dispositivo_id: ticketData.dispositivo.dispositivo_id },
        }),
      });
      if (!response.ok) {
        throw new Error(`Error al actualizar el ticket. Código: ${response.status}`);
      }
      setSuccess(true);
      // Opcional: redirigir tras la actualización, por ejemplo:
      // router.push("/tickets");
    } catch (err) {
      console.error("Error al actualizar el ticket:", err);
      setError("Hubo un error al actualizar el ticket.");
    }
  };

  // 6. Renderizado condicional mientras carga
  if (loading) {
    return (
      <div className="p-4">
        <p>Cargando ticket...</p>
      </div>
    );
  }

  // 7. Mostrar error si lo hay
  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // 8. Render principal del formulario de edición
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          {/* Botón para regresar */}
          <div className="flex items-center gap-2">
            <Link href="/tickets">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle>Edición de Ticket #{id}</CardTitle>
          </div>
          <CardDescription>
            Modifica la categoría, el técnico y el dispositivo asignado a este ticket.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Campo: Categoría */}
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

            {/* Campo: Técnico */}
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
                  {tecnicos.map((tecnico) => (
                    <SelectItem key={tecnico.usuario_id} value={tecnico.usuario_id.toString()}>
                      {tecnico.nombre} {tecnico.apellido}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campo: Dispositivo */}
            <div className="space-y-2">
              <Label>Dispositivo</Label>
              <Select
                value={ticketData.dispositivo?.dispositivo_id?.toString() || ""}
                onValueChange={handleDispositivoChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el dispositivo" />
                </SelectTrigger>
                <SelectContent>
                  {dispositivos.map((disp) => (
                    <SelectItem key={disp.dispositivo_id} value={disp.dispositivo_id.toString()}>
                      {disp.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Actualizar Ticket
            </Button>
          </CardFooter>
        </form>
        {success && <p className="text-green-500 mt-2 px-4">Ticket actualizado correctamente.</p>}
        {error && <p className="text-red-500 mt-2 px-4">{error}</p>}
      </Card>
    </div>
  );
}
