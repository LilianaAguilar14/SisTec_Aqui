"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function DispositivosPage() {
  const [dispositivos, setDispositivos] = useState([]); // Lista de dispositivos
  const [error, setError] = useState("");

  // Obtener la lista de dispositivos al cargar la página
  useEffect(() => {
    const fetchDispositivos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/tipo-dispositivo"
        ); // Cambia la URL según tu backend
        setDispositivos(response.data); // Asume que el backend devuelve un array de dispositivos
      } catch (err) {
        setError("Error al obtener los dispositivos");
        console.error("Error al obtener los dispositivos:", err);
      }
    };

    fetchDispositivos();
  }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Dispositivos</h2>
        </div>
        <Link href="/dashboard/dispositivos/nuevo">
          <Button className="bg-primary hover:bg-primary/90">
            Registrar Nuevo Dispositivo
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Dispositivos</CardTitle>
          <CardDescription>
            Aquí puedes ver todos los dispositivos registrados en el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {!error && dispositivos.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No hay dispositivos registrados.
            </p>
          )}
          {dispositivos.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Nombre
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Tipo
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Marca/Modelo
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Usuario Asignado
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Descripción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dispositivos.map((dispositivo: any) => (
                    <tr key={dispositivo.dispositivo_id}>
                      <td className="border border-gray-200 px-4 py-2">
                        {dispositivo.nombre}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {dispositivo.tipo}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {dispositivo.marca_modelo}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {dispositivo.usuarioAsignado
                          ? `${dispositivo.usuarioAsignado.nombre} ${dispositivo.usuarioAsignado.apellido}`
                          : "No asignado"}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {dispositivo.descripcion || "Sin descripción"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
