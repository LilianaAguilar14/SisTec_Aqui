"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "../../../../axiosConfig";

const EditarComponente = () => {
  const router = useRouter();
  const params = useParams();
  const [componente, setComponente] = useState({
    nombre: "",
    precio: 0,
    cantidad: 0,
    proveedor: { proveedor_id: 0 },
  });
  const [proveedores, setProveedores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComponente = async () => {
      try {
        const response = await axios.get(`/componente/${params.id}`);
        setComponente(response.data);
      } catch (err) {
        setError("Error al cargar el componente");
        console.error(err);
      }
    };

    const fetchProveedores = async () => {
      try {
        const response = await axios.get("/proveedor");
        setProveedores(response.data);
      } catch (err) {
        console.error("Error al cargar los proveedores:", err);
      }
    };

    if (params.id) {
      fetchComponente();
      fetchProveedores();
    }
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setComponente((prev) => {
      if (name === "proveedor_id") {
        return {
          ...prev,
          proveedor: { proveedor_id: parseInt(value, 10) },
        };
      }

      return {
        ...prev,
        [name]:
          name === "precio" || name === "cantidad" ? parseFloat(value) : value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reconstruye el objeto exactamente como lo espera el backend
    const payload = {
      nombre: componente.nombre,
      precio: componente.precio,
      cantidad: componente.cantidad,
      proveedor: {
        proveedor_id: Number(componente.proveedor.proveedor_id), // Asegúrate que es número
      },
    };

    try {
      const response = await axios.put(`/componente/${params.id}`, payload);
      console.log("Actualización exitosa:", response.data);
      router.push("/componentes");
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Componente</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            type="text"
            value={componente.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="precio">Precio</Label>
          <Input
            id="precio"
            name="precio"
            type="number"
            step="0.01"
            value={componente.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="cantidad">Cantidad</Label>
          <Input
            id="cantidad"
            name="cantidad"
            type="number"
            value={componente.cantidad}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="proveedor_id">Proveedor</Label>
          <select
            id="proveedor_id"
            name="proveedor_id"
            value={componente.proveedor.proveedor_id}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Selecciona un proveedor</option>
            {proveedores.map((proveedor: any) => (
              <option
                key={proveedor.proveedor_id}
                value={proveedor.proveedor_id}
              >
                {proveedor.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/componentes")}
          >
            Cancelar
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Guardar Cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditarComponente;
