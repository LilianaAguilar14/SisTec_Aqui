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
import  axios  from "../../../../axiosConfig"; // Asegúrate de que la ruta sea correcta
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

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

/** Estructura para agregar un "detalle" (componente usado) */
interface ReparacionComponenteForm {
  componente_id: number;
  cantidad_usada: string;
}

export default function AgregarComponentesPage() {
  const router = useRouter();
  const { id } = useParams();

  // 1) Obtenemos el usuario en sesión (técnico)
  const user = JSON.parse(Cookies.get("user") || "{}");
  const userId = user.usuario_id;

  // 2) Información del ticket
  const [ticketData, setTicketData] = useState<Ticket | null>(null);

  // 3) Catálogo de componentes (los disponibles para usar)
  const [catalogoComponentes, setCatalogoComponentes] = useState<Componente[]>([]);

  // 4) Lista de detalles (componentes a registrar)
  const [detalles, setDetalles] = useState<ReparacionComponenteForm[]>([
    { componente_id: 0, cantidad_usada: "" },
  ]);

  const [error, setError] = useState<string | null>(null);

  // ----------------------------------------------------------------------------------
  // Cargar datos iniciales
  // ----------------------------------------------------------------------------------

  // a) Obtener info del Ticket
  useEffect(() => {
    if (!id) return;

    axios
      .get<Ticket>(`/ticket/${id}`)
      .then((response) => {
        setTicketData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("No se pudo cargar la información del ticket.");
      });
  }, [id]);

  // b) Cargar catálogo de componentes
  useEffect(() => {
    axios
      .get<Componente[]>("/componente")
      .then((response) => {
        setCatalogoComponentes(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("No se pudo cargar la lista de componentes.");
      });
  }, []);

  // ----------------------------------------------------------------------------------
  // Manejo de componentes en el formulario
  // ----------------------------------------------------------------------------------

  // Agregar una nueva fila para seleccionar otro componente
  const handleAddDetalle = () => {
    setDetalles((prev) => [...prev, { componente_id: 0, cantidad_usada: "" }]);
  };

  // Eliminar fila (por índice)
  const handleRemoveDetalle = (index: number) => {
    setDetalles((prev) => prev.filter((_, i) => i !== index));
  };

  // Manejo de cambios en cada detalle
  const handleChangeDetalle = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setDetalles((prev) =>
      prev.map((detalle, i) => {
        if (i !== index) return detalle;
        if (name === "componente_id") {
          return { ...detalle, componente_id: Number(value) };
        }
        if (name === "cantidad_usada") {
          return { ...detalle, cantidad_usada: value };
        }
        return detalle;
      })
    );
  };

  // ----------------------------------------------------------------------------------
  // Guardar la Reparación + Componentes en un solo flujo (al hacer clic en "Guardar")
  // ----------------------------------------------------------------------------------
  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones mínimas
    if (!id) {
      setError("No se encontró el ID del ticket en la URL.");
      return;
    }
    if (!userId) {
      setError("No se encontró el ID del usuario en sesión.");
      return;
    }
    for (const det of detalles) {
      if (!det.componente_id || !det.cantidad_usada) {
        setError("Hay campos de componente o cantidad incompletos.");
        return;
      }
    }

    try {
      // 1) Crear la Reparación con la fecha actual, el ticket y el técnico
      const bodyReparacion = {
        fecha_reparacion: new Date().toISOString(),
        ticket_id: parseInt(id, 10),
        usuario_tecnico_id: userId,
      };

      console.log("Creando reparación con:", bodyReparacion);

      // axios lanza excepción si la respuesta tiene status >= 400
      const respRep = await axios.post("/reparacion", bodyReparacion);
      const dataRep = respRep.data;
      const newReparacionId = dataRep.reparacion_id;

      if (!newReparacionId) {
        throw new Error("La respuesta no contenía 'reparacion_id'.");
      }

      // 2) Con el ID de la reparación, creamos los detalles uno por uno
      for (const det of detalles) {
        const bodyDetalle = {
          ticket: { ticket_id: parseInt(id, 10) },
          reparacion: { reparacion_id: newReparacionId },
          componente: { componente_id: det.componente_id },
          cantidad_usada: det.cantidad_usada,
        };

        await axios.post("/reparacion-componente", bodyDetalle);
      }

      // Si todo salió bien
      console.log("Reparación y sus componentes se registraron con éxito.");
      router.push("/reparaciones?reload=true");
    } catch (err: any) {
      console.error(err);
      // Puedes mejorar el manejo de error según la estructura de tu backend
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || "Ocurrió un error al guardar la reparación y sus componentes.");
      }
    }
  };

  // ----------------------------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------------------------
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Registrar Reparación</CardTitle>
          <CardDescription>
            Selecciona todos los componentes usados.
            <br />
            Al guardar, se creará la reparación y se registrarán todos los detalles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Datos del Ticket */}
          {ticketData && (
            <div className="mb-4">
              <p>
                <strong>Ticket #{ticketData.ticket_id}</strong>
              </p>
              <p>
                <strong>Título:</strong> {ticketData.titulo}
              </p>
              <p>
                <strong>Descripción:</strong> {ticketData.descripcion}
              </p>
            </div>
          )}

          {/* Formulario para los componentes */}
          <form onSubmit={handleGuardar} className="space-y-6">
            {detalles.map((detalle, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-4"
              >
                {/* Seleccionar componente */}
                <div className="flex-1">
                  <Label>Componente</Label>
                  <select
                    name="componente_id"
                    value={detalle.componente_id || ""}
                    onChange={(e) => handleChangeDetalle(e, index)}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Selecciona un componente</option>
                    {catalogoComponentes.map((comp) => (
                      <option key={comp.componente_id} value={comp.componente_id}>
                        {comp.nombre} - ${comp.precio}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cantidad usada */}
                <div className="flex-1">
                  <Label>Cantidad Usada</Label>
                  <Input
                    name="cantidad_usada"
                    type="number"
                    placeholder="Ej: 2"
                    value={detalle.cantidad_usada}
                    onChange={(e) => handleChangeDetalle(e, index)}
                  />
                </div>

                {/* Botón para eliminar la fila */}
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => handleRemoveDetalle(index)}
                >
                  Eliminar
                </Button>
              </div>
            ))}

            {/* Botón para agregar más componentes */}
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleAddDetalle}
            >
              + Agregar otro componente
            </Button>

            {/* Botón para GUARDAR (crea la reparación + detalles) */}
            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Guardar Reparación y Detalles
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
