"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  BarChart3,
  Clock,
  Cog,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Ticket,
  PenToolIcon as Tool,
  Truck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import axios from "../../axiosConfig";

export default function Dashboard() {
  const [ticketsActivos, setTicketsActivos] = useState(0); // Estado para los tickets activos
  const [ticketsCerrados, setTicketsCerrados] = useState(0); // Estado para los tickets cerrados
  const [componentesEnStock, setComponentesEnStock] = useState(0); // Estado para los componentes en stock

  // Obtener el conteo de tickets activos y cerrados
  useEffect(() => {
    const fetchTicketsActivos = async () => {
      try {
        const response = await axios.get("/ticket/conteo-estado");
        setTicketsActivos(response.data.activos);
        setTicketsCerrados(response.data.inactivos);
      } catch (err) {
        console.error("Error al obtener el conteo de tickets:", err);
      }
    };

    fetchTicketsActivos();
  }, []);

  // Obtener el total de componentes en stock
  useEffect(() => {
    const fetchComponentesEnStock = async () => {
      try {
        const response = await axios.get("/componente/total-componentes");
        setComponentesEnStock(response.data.total); // Actualiza el estado con el valor de "total"
      } catch (err) {
        console.error(
          "Error al obtener el total de componentes en stock:",
          err
        );
      }
    };

    fetchComponentesEnStock();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Tickets Activos
                </CardTitle>
                <Ticket className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ticketsActivos}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Reparaciones Completadas
                </CardTitle>
                <Tool className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{ticketsCerrados}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Componentes en Stock
                </CardTitle>
                <Package className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{componentesEnStock}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Tickets por Mes</CardTitle>
                <p className="text-sm text-gray-500">
                  Comparativa de tickets abiertos vs cerrados
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Tickets Recientes</CardTitle>
                <p className="text-sm text-gray-500">
                  Últimos tickets registrados en el sistema
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        Laptop Dell XPS - Pantalla dañada
                      </h3>
                      <p className="text-sm text-gray-500">
                        Juan Pérez • Hace 2 horas
                      </p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                      En proceso
                    </Badge>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Impresora HP - No imprime</h3>
                      <p className="text-sm text-gray-500">
                        María González • Hace 5 horas
                      </p>
                    </div>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                      Pendiente
                    </Badge>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        PC de Escritorio - No enciende
                      </h3>
                      <p className="text-sm text-gray-500">
                        Carlos Rodríguez • Hace 1 día
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Completado
                    </Badge>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        Monitor Samsung - Líneas en pantalla
                      </h3>
                      <p className="text-sm text-gray-500">
                        Ana Martínez • Hace 2 días
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Completado
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function BarChart() {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"];
  const data = [
    { abiertos: 40, cerrados: 24 },
    { abiertos: 30, cerrados: 28 },
    { abiertos: 20, cerrados: 26 },
    { abiertos: 27, cerrados: 20 },
    { abiertos: 18, cerrados: 19 },
    { abiertos: 23, cerrados: 25 },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Leyenda */}
      <div className="flex justify-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
          <span className="text-sm">Tickets abiertos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-600 rounded-sm"></div>
          <span className="text-sm">Tickets cerrados</span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="flex-1 flex items-end pt-4">
        <div className="flex-1 flex items-end justify-around h-full">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-1 w-12">
              <div
                className="w-8 bg-blue-500 rounded-sm"
                style={{ height: `${item.abiertos * 5}px` }}
              ></div>
              <div
                className="w-8 bg-emerald-600 rounded-sm"
                style={{ height: `${item.cerrados * 5}px` }}
              ></div>
              <div className="text-xs text-gray-500 mt-1">{months[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
