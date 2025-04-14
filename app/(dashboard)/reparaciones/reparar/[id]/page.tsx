"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

interface Ticket {
  ticket_id: number;
  titulo: string;
  descripcion: string;
  fecha_solucion?: string | null;
}

interface Componente {
  componente_id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface ReparacionComponenteForm {
  ticket: { ticket_id: number };
  reparacion: { reparacion_id: number | null };
  componente: { componente_id: number };
  cantidad_usada: string;
}

export default function AgregarComponentesPage() {
  const router = useRouter();
  const { id } = useParams();

  const [ticketData, setTicketData] = useState<Ticket | null>(null);
  const [componentes, setComponentes] = useState<Componente[]>([]);
  const [formData, setFormData] = useState<ReparacionComponenteForm>({
    ticket: { ticket_id: 0 },
    reparacion: { reparacion_id: null },
    componente: { componente_id: 0 },
    cantidad_usada: "",
  });
  const [error, setError] = useState<string | null>(null);

  // 1. Cargar información del ticket según el ID
  useEffect(() => {
    if (!id) return;

    axios
      .get(`/ticket/${id}`)
      .then((response) => {
        const data = response.data;
        setTicketData(data);

        setFormData((prev) => ({
          ...prev,
          ticket: { ticket_id: data.ticket_id },
        }));
      })
      .catch((error) => {
        console.error("Error al obtener información del ticket:", error);
        setError("No se pudo cargar la información del ticket.");
      });
  }, [id]);

  // 2. Cargar la lista de componentes desde /componente
  useEffect(() => {
    axios
      .get("/componente")
      .then((response) => {
        setComponentes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener componentes:", error);
        setError("No se pudo cargar la lista de componentes.");
      });
  }, []);

  // 3. Manejo de cambios en el formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "componente_id") {
        return {
          ...prev,
          componente: { componente_id: Number(value) },
        };
      }
      if (name === "cantidad_usada") {
        return {
          ...prev,
          cantidad_usada: value,
        };
      }
      return prev;
    });
  };

  // 4. Enviar la información al endpoint POST /reparacion-componente
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.ticket.ticket_id ||
      !formData.componente.componente_id ||
      !formData.cantidad_usada
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await axios.post("/reparacion-componente", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(
        "Respuesta del servidor al agregar componente:",
        response.data
      );
      router.push("/reparaciones?reload=true");
    } catch (error) {
      console.error("Error al agregar componente:", error);
      setError("Ocurrió un error al agregar el componente.");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Registrar Reparación</CardTitle>
          <CardDescription>
            Agrega los componentes utilizados para el ticket #{id}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {ticketData && (
            <div className="mb-6">
              <p>
                <strong>Título:</strong> {ticketData.titulo}
              </p>
              <p>
                <strong>Descripción:</strong> {ticketData.descripcion}
              </p>
              {ticketData.fecha_solucion ? (
                <p>
                  <strong>Fecha Solución:</strong>{" "}
                  {new Date(ticketData.fecha_solucion).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              ) : (
                <p>
                  <strong>Estado:</strong> Pendiente de solución
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <Label htmlFor="componente_id">Componente</Label>
              <select
                id="componente_id"
                name="componente_id"
                value={formData.componente.componente_id || ""}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="">Selecciona un componente</option>
                {componentes.length > 0 ? (
                  componentes.map((componente) => (
                    <option
                      key={componente.componente_id}
                      value={componente.componente_id}
                    >
                      {componente.nombre} - ${componente.precio}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No hay componentes disponibles
                  </option>
                )}
              </select>
            </div>

            <div>
              <Label htmlFor="cantidad_usada">Cantidad Usada</Label>
              <Input
                id="cantidad_usada"
                name="cantidad_usada"
                placeholder="Ej: 2"
                type="number"
                value={formData.cantidad_usada}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Guardar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
