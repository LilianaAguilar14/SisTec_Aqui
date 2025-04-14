"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function EditarProveedorPage() {
  const router = useRouter();
  const { id } = useParams(); // Se espera que devuelva algo como { id: "3" }
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    direccion: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carga los datos del proveedor al montar el componente
  useEffect(() => {
    console.log("Valor recibido de id:", id);
    if (!id) {
      setError("No se proporcionó un ID en la URL");
      setLoading(false);
      return;
    }

    // Convertir id a número, ya que tu backend espera un número (proveedor_id)
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      setError("El ID proporcionado no es válido");
      setLoading(false);
      return;
    }

    async function fetchProveedor() {
      try {
        const response = await axios.get(`/proveedor/${numericId}`);
        const data = response.data;

        if (!data) {
          setError("Proveedor no encontrado.");
          setLoading(false);
          return;
        }

        // Se cargan los datos existentes (nombre, contacto y dirección)
        setFormData({
          nombre: data.nombre || "",
          contacto: data.contacto || "",
          direccion: data.direccion || "",
        });
      } catch (error) {
        console.error("Error en la petición de proveedor:", error);
        setError("Hubo un error al cargar el proveedor.");
      } finally {
        setLoading(false);
      }
    }

    fetchProveedor();
  }, [id]);

  // Actualiza los valores del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Envía la actualización con una petición PUT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Convertir id nuevamente a número
    const numericId = parseInt(id, 10);

    try {
      await axios.put(`/proveedor/${numericId}`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      // Si se actualiza correctamente, redirige a la lista de proveedores
      router.push("/proveedores");
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
      setError("Hubo un error al actualizar el proveedor.");
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <p>Cargando proveedor...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Editar Proveedor</CardTitle>
          <CardDescription>
            Modifica el nombre, el contacto y la dirección del proveedor y
            guarda los cambios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre
              </label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre del proveedor"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            {/* Campo Contacto */}
            <div>
              <label
                htmlFor="contacto"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contacto
              </label>
              <Input
                id="contacto"
                name="contacto"
                type="text"
                placeholder="Correo o teléfono"
                value={formData.contacto}
                onChange={handleChange}
              />
            </div>
            {/* Campo Dirección */}
            <div>
              <label
                htmlFor="direccion"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dirección
              </label>
              <Input
                id="direccion"
                name="direccion"
                type="text"
                placeholder="Dirección del proveedor"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>
            {/* Botón para guardar */}
            <div className="flex justify-end">
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Guardar Cambios
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
