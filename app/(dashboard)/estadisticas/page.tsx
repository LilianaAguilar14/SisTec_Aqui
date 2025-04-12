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
          </div>
        </main>
      </div>
    </div>
  );
}

function BarChart() {
  const [data, setData] = useState<{ abiertos: number; cerrados: number }[]>(
    []
  );
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  useEffect(() => {
    const fetchEstadoPorMes = async () => {
      try {
        const response = await axios.get("/ticket/estado-por-mes");
        const rawData = response.data;

        // Mapear los datos para que coincidan con los meses
        const formattedData = Array(12).fill({ abiertos: 0, cerrados: 0 }); // Inicializar con 12 meses
        rawData.forEach(
          (item: { mes: number; abiertos: number; cerrados: number }) => {
            formattedData[item.mes - 1] = {
              abiertos: item.abiertos,
              cerrados: item.cerrados,
            };
          }
        );

        setData(formattedData);
      } catch (err) {
        console.error("Error al obtener los datos de la gráfica:", err);
      }
    };

    fetchEstadoPorMes();
  }, []);

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
