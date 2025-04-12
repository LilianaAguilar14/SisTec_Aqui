"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Componente {
  componente_id: string;
  nombre: string;
  precio: number;
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AgregarComponentesPage() {
  const router = useRouter();
  const { id } = useParams(); // Obtener el ID de la reparación desde la URL
  const [formData, setFormData] = useState({
    ticket: { ticket_id: 0 },
    reparacion: { reparacion_id: id },
    componente: { componente_id: 0 },
    cantidad_usada: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [componentes, setComponentes] = useState<Componente[]>([]); // Estado para almacenar los componentes disponibles

  useEffect(() => {
    console.log("Cargando datos de la reparación y componentes...");
    fetch(`http://localhost:3000/reparacion/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al obtener datos: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Datos de la reparación recibidos:", data);
        setFormData((prev) => ({
          ...prev,
          ticket: { ticket_id: data.ticket.ticket_id }, // Asegúrate de que este valor exista en la respuesta
          reparacion: { reparacion_id: id }, // Asegúrate de que el ID de la reparación se asigne correctamente
        }));
      })
      .catch((error) => {
        console.error("Error al obtener información del ticket:", error);
        setError("No se pudo cargar la información del ticket.");
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:3000/reparacion-componente")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al obtener componentes: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Componentes disponibles recibidos:", data);
        const validComponentes = data
          .map((item: { componente: Componente | null | undefined }) => item.componente)
          .filter((componente): componente is Componente => componente !== null && componente !== undefined); // Filtrar valores nulos o indefinidos
        setComponentes(validComponentes);
      })
      .catch((error) => {
        console.error("Error al obtener componentes:", error);
        setError("No se pudo cargar la lista de componentes.");
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que todos los campos requeridos tengan valores
    if (!formData.ticket.ticket_id || !formData.reparacion.reparacion_id || !formData.componente.componente_id || !formData.cantidad_usada) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    console.log("Enviando datos del formulario:", formData); // Verifica que `ticket`, `reparacion`, `componente`, y `cantidad_usada` estén presentes
    try {
      const response = await fetch("http://localhost:3000/reparacion-componente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.error(`Error al agregar componente. Código: ${response.status}`);
        return;
      }
      const data = await response.json();
      console.log("Respuesta del servidor al agregar componente:", data);
      router.push("/reparaciones?reload=true");
    } catch (error) {
      console.error("Error al agregar componente:", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Agregar Componentes</CardTitle>
          <CardDescription>
            Agrega los componentes utilizados en la reparación #{id}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
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
                  componentes.map((componente, index) => (
                    <option key={`${componente.componente_id}-${index}`} value={componente.componente_id}>
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