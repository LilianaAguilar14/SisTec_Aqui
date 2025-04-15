import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  // Fetch comentarios del ticket
  useEffect(() => {
    if (isOpen) {
      fetch(`http://localhost:3000/comentario-ticket/${ticketId}`)
        .then((res) => res.json())
        .then((data) => setComentarios(data))
        .catch((error) => console.error("Error al cargar comentarios:", error));
    }
  }, [isOpen, ticketId]);

  // Agregar un nuevo comentario
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
        usuario: { usuario_id: 1 }, // Reemplaza con el ID del usuario actual
      }),
    })
      .then((res) => res.json())
      .then((comentario) => {
        setComentarios((prev) => [...prev, comentario]);
        setNuevoComentario("");
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
          {/* Lista de comentarios */}
          <div className="space-y-2">
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
                    {new Date(comentario.fecha_comentario).toLocaleDateString()}
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
