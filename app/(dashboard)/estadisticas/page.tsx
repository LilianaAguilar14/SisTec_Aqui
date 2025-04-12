<<<<<<< Updated upstream
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Clock,
  ClipboardList,
  Cpu,
  Laptop,
  Ticket,
  Truck,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChartContainer } from "@/components/ui/chart";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function EstadisticasPage() {
  // Datos de ejemplo para los gráficos
  const ticketData = [
    { name: "Ene", abiertos: 40, cerrados: 24 },
    { name: "Feb", abiertos: 30, cerrados: 28 },
    { name: "Mar", abiertos: 20, cerrados: 26 },
    { name: "Abr", abiertos: 27, cerrados: 20 },
    { name: "May", abiertos: 18, cerrados: 19 },
    { name: "Jun", abiertos: 23, cerrados: 25 },
  ];

  const componentesData = [
    { name: "Ene", entradas: 65, salidas: 42 },
    { name: "Feb", entradas: 50, salidas: 53 },
    { name: "Mar", entradas: 75, salidas: 57 },
    { name: "Abr", entradas: 45, salidas: 42 },
    { name: "May", entradas: 60, salidas: 45 },
    { name: "Jun", entradas: 70, salidas: 55 },
  ];
=======
import Image from "next/image"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
>>>>>>> Stashed changes

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Cambiar tema</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            </Button>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Notificaciones</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
            </Button>
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          </div>
        </header>

        <main className="p-6">
          <Tabs defaultValue="vista-general" className="mb-6">
            <TabsList>
              <TabsTrigger value="vista-general">Vista General</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="inventario">Inventario</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
<<<<<<< Updated upstream
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tickets Activos
                </CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  +5% desde el mes pasado
                </p>
=======
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tickets Activos</CardTitle>
                <Ticket className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">23</div>
                <p className="text-xs text-green-600 mt-1">+5% desde el mes pasado</p>
>>>>>>> Stashed changes
              </CardContent>
            </Card>

            <Card>
<<<<<<< Updated upstream
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Reparaciones Completadas
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145</div>
                <p className="text-xs text-muted-foreground">
                  +12% desde el mes pasado
                </p>
=======
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Reparaciones Completadas</CardTitle>
                <Tool className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">145</div>
                <p className="text-xs text-green-600 mt-1">+12% desde el mes pasado</p>
>>>>>>> Stashed changes
              </CardContent>
            </Card>

            <Card>
<<<<<<< Updated upstream
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Componentes en Stock
                </CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,203</div>
                <p className="text-xs text-muted-foreground">
                  +18% desde el mes pasado
                </p>
=======
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Componentes en Stock</CardTitle>
                <Package className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,203</div>
                <p className="text-xs text-green-600 mt-1">+18% desde el mes pasado</p>
>>>>>>> Stashed changes
              </CardContent>
            </Card>

            <Card>
<<<<<<< Updated upstream
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tiempo Promedio de Reparación
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2 días</div>
                <p className="text-xs text-muted-foreground">
                  -8% desde el mes pasado
                </p>
=======
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tiempo Promedio de Reparación</CardTitle>
                <Clock className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3.2 días</div>
                <p className="text-xs text-red-600 mt-1">-8% desde el mes pasado</p>
>>>>>>> Stashed changes
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Tickets por Mes</CardTitle>
<<<<<<< Updated upstream
                <CardDescription>
                  Comparativa de tickets abiertos vs cerrados
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    abiertos: {
                      label: "Tickets Abiertos",
                      color: "hsl(var(--primary))",
                    },
                    cerrados: {
                      label: "Tickets Cerrados",
                      color: "hsl(var(--muted-foreground))",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <RechartsBarChart data={ticketData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="abiertos"
                      fill="var(--color-abiertos)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="cerrados"
                      fill="var(--color-cerrados)"
                      radius={[4, 4, 0, 0]}
                    />
                  </RechartsBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Tickets Recientes</CardTitle>
                <CardDescription>
                  Últimos tickets registrados en el sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="mr-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Laptop Dell XPS - Pantalla dañada
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Juan Pérez • Hace 2 horas
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 border-yellow-200">
                        En proceso
                      </span>
=======
                <p className="text-sm text-gray-500">Comparativa de tickets abiertos vs cerrados</p>
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
                <p className="text-sm text-gray-500">Últimos tickets registrados en el sistema</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Laptop Dell XPS - Pantalla dañada</h3>
                      <p className="text-sm text-gray-500">Juan Pérez • Hace 2 horas</p>
>>>>>>> Stashed changes
                    </div>
                    <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">En proceso</Badge>
                  </div>
<<<<<<< Updated upstream
                  <div className="flex items-center">
                    <div className="mr-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Impresora HP - No imprime
                      </p>
                      <p className="text-sm text-muted-foreground">
                        María González • Hace 5 horas
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800 border-red-200">
                        Pendiente
                      </span>
=======

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Impresora HP - No imprime</h3>
                      <p className="text-sm text-gray-500">María González • Hace 5 horas</p>
>>>>>>> Stashed changes
                    </div>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Pendiente</Badge>
                  </div>
<<<<<<< Updated upstream
                  <div className="flex items-center">
                    <div className="mr-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        PC de Escritorio - No enciende
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Carlos Rodríguez • Hace 1 día
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-200">
                        Completado
                      </span>
=======

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">PC de Escritorio - No enciende</h3>
                      <p className="text-sm text-gray-500">Carlos Rodríguez • Hace 1 día</p>
>>>>>>> Stashed changes
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completado</Badge>
                  </div>
<<<<<<< Updated upstream
                  <div className="flex items-center">
                    <div className="mr-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Monitor Samsung - Líneas en pantalla
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Ana Martínez • Hace 2 días
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-200">
                        Completado
                      </span>
=======

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Monitor Samsung - Líneas en pantalla</h3>
                      <p className="text-sm text-gray-500">Ana Martínez • Hace 2 días</p>
>>>>>>> Stashed changes
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completado</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
<<<<<<< Updated upstream
        </TabsContent>
        <TabsContent value="tickets" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Tickets
                </CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">
                  +8% desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tickets Pendientes
                </CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">
                  -2% desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tickets en Proceso
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  +3% desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tickets Completados
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">222</div>
                <p className="text-xs text-muted-foreground">
                  +15% desde el mes pasado
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Tickets</CardTitle>
              <CardDescription>
                Evolución de tickets en los últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  abiertos: {
                    label: "Tickets Abiertos",
                    color: "hsl(var(--primary))",
                  },
                  cerrados: {
                    label: "Tickets Cerrados",
                    color: "hsl(var(--muted-foreground))",
                  },
                }}
                className="aspect-[4/3]"
              >
                <LineChart data={ticketData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="abiertos"
                    stroke="var(--color-abiertos)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="cerrados"
                    stroke="var(--color-cerrados)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventario" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Componentes
                </CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,203</div>
                <p className="text-xs text-muted-foreground">
                  +18% desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Componentes Usados
                </CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">324</div>
                <p className="text-xs text-muted-foreground">
                  +5% desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Proveedores Activos
                </CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +1 desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Dispositivos Registrados
                </CardTitle>
                <Laptop className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">187</div>
                <p className="text-xs text-muted-foreground">
                  +7% desde el mes pasado
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Movimiento de Componentes</CardTitle>
              <CardDescription>
                Entradas y salidas de componentes en los últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  entradas: {
                    label: "Entradas",
                    color: "hsl(var(--primary))",
                  },
                  salidas: {
                    label: "Salidas",
                    color: "hsl(var(--muted-foreground))",
                  },
                }}
                className="aspect-[4/3]"
              >
                <RechartsBarChart data={componentesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="entradas"
                    fill="var(--color-entradas)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="salidas"
                    fill="var(--color-salidas)"
                    radius={[4, 4, 0, 0]}
                  />
                </RechartsBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
=======
        </main>
      </div>
    </div>
  )
}

function BarChart() {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
  const data = [
    { abiertos: 40, cerrados: 24 },
    { abiertos: 30, cerrados: 28 },
    { abiertos: 20, cerrados: 26 },
    { abiertos: 27, cerrados: 20 },
    { abiertos: 18, cerrados: 19 },
    { abiertos: 23, cerrados: 25 },
  ]

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
              <div className="w-8 bg-blue-500 rounded-sm" style={{ height: `${item.abiertos * 5}px` }}></div>
              <div className="w-8 bg-emerald-600 rounded-sm" style={{ height: `${item.cerrados * 5}px` }}></div>
              <div className="text-xs text-gray-500 mt-1">{months[i]}</div>
            </div>
          ))}
        </div>
      </div>
>>>>>>> Stashed changes
    </div>
  );
}
