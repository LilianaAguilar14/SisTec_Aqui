"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "../axiosConfig";
import Cookies from "js-cookie"; // Importa js-cookie

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter(); // Inicializa useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { accessToken, user } = response.data;

      // Guarda el token y el usuario completo en cookies
      Cookies.set("token", accessToken, { expires: 7 }); // Expira en 7 días
      Cookies.set("user", JSON.stringify(user), { expires: 7 }); // Guarda el usuario como string JSON

      // Redirige al dashboard o página principal
      router.push("/componentes");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  const user = JSON.parse(Cookies.get("user") || "{}");
  console.log(user);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-950/20 relative">
      <div className="absolute inset-0 dot-pattern opacity-30"></div>
      <div className="container relative flex flex-col items-center justify-center px-4 py-8">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <Image src="/logo.png" alt="Logo de SisTec" width={40} height={40} />
          <span className="font-bold text-xl">TechFix</span>
        </Link>
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    href="/recuperar-password"
                    className="text-xs text-primary hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
              >
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link href="/registro" className="text-primary hover:underline">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
