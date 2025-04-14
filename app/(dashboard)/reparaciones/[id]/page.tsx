"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "../../../axiosConfig";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ArrowLeft, Link } from "lucide-react";

interface Ticket {
  ticket_id: number;
  titulo: string;
  descripcion: string;
  diagnostico?: string;
  solucion?: string;
  fecha_registro: string;
  fecha_solucion?: string | null;
}

interface Tecnico {
  usuario_id: number;
  nombre: string;
  apellido: string;
  email: string;
}

interface ComponenteData {
  componente_id: number;
  nombre: string;
  precio: number;
  cantidad_disponible: number;
}

interface ReparacionComponente {
  reparacion_componente_id: number;
  componente: ComponenteData;
  cantidad_usada: number;
}

interface ReparacionDetail {
  reparacion_id: number;
  fecha_reparacion: string;
  ticket: Ticket;
  tecnico: Tecnico;
  componentes: ReparacionComponente[];
}

export default function DetalleReparacionPage() {
  const { id } = useParams();

  const [reparacion, setReparacion] = useState<ReparacionDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/reparacion/${id}`)
      .then((response) => {
        setReparacion(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar la información de la reparación.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <p>Cargando detalle de la reparación...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!reparacion) {
    return (
      <div className="p-4 md:p-8">
        <p>No se encontró la reparación solicitada.</p>
      </div>
    );
  }

  const { fecha_reparacion, ticket, tecnico, componentes } = reparacion;

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Detalle de Reparación</CardTitle>
          <CardDescription>
            Información detallada de la reparación #{reparacion.reparacion_id}.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Información de la Reparación */}
          <div className="border p-4 rounded-md">
            <Label className="text-sm">Fecha de Reparación</Label>
            <p className="mb-2">
              {new Date(fecha_reparacion).toLocaleString("es-ES")}
            </p>

            <Label className="text-sm">Técnico Responsable</Label>
            <p className="mb-2">
              {tecnico.nombre} {tecnico.apellido} ({tecnico.email})
            </p>
          </div>

          {/* Información del Ticket asociado */}
          <div className="border p-4 rounded-md">
            <Label className="text-sm">Ticket #{ticket.ticket_id}</Label>
            <p className="mb-2">
              <strong>Título:</strong> {ticket.titulo}
            </p>
            <p className="mb-2">
              <strong>Descripción:</strong> {ticket.descripcion}
            </p>
            {ticket.diagnostico && (
              <p className="mb-2">
                <strong>Diagnóstico:</strong> {ticket.diagnostico}
              </p>
            )}
            {ticket.solucion && (
              <p className="mb-2">
                <strong>Solución:</strong> {ticket.solucion}
              </p>
            )}
            <p className="mb-2">
              <strong>Fecha Registro:</strong>{" "}
              {new Date(ticket.fecha_registro).toLocaleString("es-ES")}
            </p>
            {ticket.fecha_solucion && (
              <p className="mb-2">
                <strong>Fecha Solución:</strong>{" "}
                {new Date(ticket.fecha_solucion).toLocaleString("es-ES")}
              </p>
            )}
          </div>

          {/* Tabla de Componentes utilizados */}
          <div className="border p-4 rounded-md">
            <Label className="text-sm">Componentes utilizados</Label>
            {componentes.length === 0 ? (
              <p className="mt-2 text-gray-600">No se utilizaron componentes.</p>
            ) : (
              <Table className="mt-2">
                <TableHeader>
                  <TableRow>
                    <TableHead>#ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Cantidad Usada</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {componentes.map((rc) => (
                    <TableRow key={rc.reparacion_componente_id}>
                      <TableCell>{rc.componente.componente_id}</TableCell>
                      <TableCell>{rc.componente.nombre}</TableCell>
                      <TableCell>${rc.componente.precio}</TableCell>
                      <TableCell>{rc.cantidad_usada}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
