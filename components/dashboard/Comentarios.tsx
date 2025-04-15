import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";

interface Comentario {
  comentario_id: number;
  contenido: string;
  fecha_comentario: string;
  usuario: {
    nombre: string;
    apellido: string;
  };
}

interface ComentariosModalProps {
  ticketId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ComentariosModal: React.FC<ComentariosModalProps> = ({
  ticketId,
  isOpen,
  onClose,
}) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [loading, setLoading] = useState(false);

  // Obtenemos el usuario en sesión
  const user = JSON.parse(Cookies.get("user") || "{}");
  const userId = user.usuario_id;

  // ---------------------------------------
  // Función para cargar comentarios
  // ---------------------------------------
  const cargarComentarios = () => {
    fetch(`http://localhost:3000/comentario-ticket/${ticketId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al cargar comentarios: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Comentario[]) => setComentarios(data))
      .catch((error) => console.error("Error al cargar comentarios:", error));
  };

  // Cuando se abre el modal, cargamos la lista
  useEffect(() => {
    if (isOpen) {
      cargarComentarios();
    }
  }, [isOpen, ticketId]);

  // ---------------------------------------
  // Agregar un nuevo comentario
  // ---------------------------------------
  const handleAgregarComentario = () => {
    if (!nuevoComentario.trim()) return;

    setLoading(true);

    fetch("http://localhost:3000/comentario-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contenido: nuevoComentario,
        ticket: { ticket_id: ticketId },
        usuario: { usuario_id: userId },
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error al agregar comentario: ${res.status} - ${errorText}`);
        }
        return res.json();
      })
      .then(() => {
        // Limpiamos el textarea
        setNuevoComentario("");
        // Volvemos a recargar la lista completa para asegurar 
        // que las fechas vengan formateadas del servidor
        cargarComentarios();
      })
      .catch((error) => console.error("Error al agregar comentario:", error))
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comentarios del Ticket #{ticketId}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Lista de comentarios con un contenedor de altura fija y scroll */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {comentarios.length > 0 ? (
              comentarios.map((comentario) => (
                <div
                  key={comentario.comentario_id}
                  className="p-2 border rounded-md"
                >
                  <p className="font-semibold">
                    {comentario.usuario.nombre} {comentario.usuario.apellido}
                  </p>
                  <p>{comentario.contenido}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comentario.fecha_comentario).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No hay comentarios para este ticket.
              </p>
            )}
          </div>

          {/* Formulario para agregar comentario */}
          <div className="space-y-2">
            <Textarea
              placeholder="Escribe un comentario..."
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
            />
            <Button onClick={handleAgregarComentario} disabled={loading}>
              {loading ? "Agregando..." : "Agregar Comentario"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComentariosModal;
