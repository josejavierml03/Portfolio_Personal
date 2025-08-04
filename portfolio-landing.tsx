"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Code, Palette, Database, Moon, Sun, Download } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" || !savedTheme) {
    setIsDarkMode(true)
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  // Función de scroll suave simplificada y más robusta
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const headerOffset = 80
    const elementPosition = element.offsetTop
    const offsetPosition = elementPosition - headerOffset
    const startPosition = window.pageYOffset
    const distance = offsetPosition - startPosition
    const duration = 800
    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const percentage = Math.min(progress / duration, 1)

      // Función de easing suave
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      const currentPosition = startPosition + distance * easeInOutCubic(percentage)
      window.scrollTo(0, currentPosition)

      if (progress < duration) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

  const scrollToTop = () => {
    const startPosition = window.pageYOffset
    const duration = 800
    let start: number | null = null

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const percentage = Math.min(progress / duration, 1)

      // Función de easing suave
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      const currentPosition = startPosition * (1 - easeInOutCubic(percentage))
      window.scrollTo(0, currentPosition)

      if (progress < duration) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background mx-4 md:mx-8 lg:mx-12">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <button
              onClick={scrollToTop}
              className="mr-6 flex items-center space-x-2 transition-colors hover:text-foreground/80 bg-transparent border-none cursor-pointer"
            >
              <Code className="h-6 w-6" />
              <span className="font-bold">José Javier Méndez Lagunas</span>
            </button>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <button
              onClick={() => scrollToSection("about")}
              className="transition-colors hover:text-foreground/80 bg-transparent border-none cursor-pointer"
            >
              Acerca de Mí
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="transition-colors hover:text-foreground/80 bg-transparent border-none cursor-pointer"
            >
              Habilidades
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="transition-colors hover:text-foreground/80 bg-transparent border-none cursor-pointer"
            >
              Proyectos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="transition-colors hover:text-foreground/80 bg-transparent border-none cursor-pointer"
            >
              Contacto
            </button>
          </nav>
          <div className="ml-auto flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="transition-colors hover:bg-accent" asChild>
              <Link href="https://github.com/josejavierml03" target="_blank">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="transition-colors hover:bg-accent" asChild>
              <Link href="https://www.linkedin.com/in/jos%C3%A9-javier-m%C3%A9ndez-lagunas-645429342/" target="_blank">
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="transition-colors hover:bg-accent" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Hola, soy José Javier
                  </h1>
                  <h2 className="text-xl text-muted-foreground sm:text-2xl">
                    Ingeniero Informático - Ingeniero Software
                  </h2>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-6">
                  <Button size="lg" onClick={() => scrollToSection("projects")}>
                    Ver Mi Trabajo
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => scrollToSection("contact")}>
                    Contáctame
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/cv-jose-javier-mendez.pdf" download="CV-Jose-Javier-Mendez-Lagunas.pdf">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar CV
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/image2.png"
                  width="375"
                  height="375"
                  alt="José Javier Méndez Lagunas - Desarrollador Junior"
                  className="aspect-square overflow-hidden rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 mb-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Acerca de Mí</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Soy un ingeniero informático recién graduado, con formación en desarrollo de software. Me motiva
                  aprender constantemente y enfrentar desafíos que impulsen mi crecimiento profesional. Actualmente
                  busco oportunidades para integrarme a equipos donde pueda aportar mis habilidades técnicas, seguir
                  aprendiendo de profesionales con experiencia y comenzar mi trayectoria en el mundo del desarrollo de
                  software de manera sólida y comprometida.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <Code className="h-6 w-6 mt-1 text-primary" />
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Trabajo en Equipo</h3>
                      <p className="text-muted-foreground">
                        Valoro mucho el trabajo colaborativo. Me gusta contribuir activamente, compartir conocimientos y ayudar a construir soluciones en conjunto.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Palette className="h-6 w-6 mt-1 text-primary" />
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Desafíos Técnicos</h3>
                      <p className="text-muted-foreground">
                        Me atraen los proyectos que resuelven problemas reales. Siempre busco que mi trabajo tenga impacto y valor en el producto final.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Database className="h-6 w-6 mt-1 text-primary" />
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Aprender y Adaptarme</h3>
                      <p className="text-muted-foreground">
                        Disfruto aprender nuevas tecnologías y adaptarme a distintos entornos de trabajo. Siempre estoy buscando formas de mejorar mis habilidades.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                src="/skills.jpg"
                width="500"
                height="400"
                alt="Espacio de trabajo del desarrollador"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-2">Habilidades y Tecnologías</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Estas son las tecnologías con las que he estado trabajando recientemente.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Frontend</CardTitle>
                  <CardDescription>Construyendo interfaces de usuario responsive e interactivas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Vue</Badge>
                    <Badge variant="secondary">JavaScript/TypeScript</Badge>
                    <Badge variant="secondary">Bootstrap/Tailwind</Badge>
                    <Badge variant="secondary">HTML5</Badge>
                    <Badge variant="secondary">CSS3</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Backend</CardTitle>
                  <CardDescription>Desarrollo del lado del servidor y diseño de APIs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">.Net</Badge>
                    <Badge variant="secondary">Spring</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">MySQL</Badge>
                    <Badge variant="secondary">MongoDB</Badge>
                    <Badge variant="secondary">APIs REST</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Lenguajes y herramientas</CardTitle>
                  <CardDescription>Lenguajes, herramientas de desarrollo y metodologías</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Java</Badge>
                    <Badge variant="secondary">C/C++</Badge>
                    <Badge variant="secondary">VS Code</Badge>
                    <Badge variant="secondary">Git</Badge>
                    <Badge variant="secondary">Latex</Badge>
                    <Badge variant="secondary">Agile</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-2">Proyectos Destacados</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Estos son algunos de los proyectos en los que he trabajado recientemente. Puedes encontrar más en mi
                  GitHub.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <Image
                    src="WebChat.jpg"
                    width="400"
                    height="200"
                    alt="WebChat"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="mb-2">WebChat - Extensión de IA para Visual Studio Code</CardTitle>
                  <CardDescription className="mb-4">
                    Es una herramienta pensada para el uso educativo en institutos, con el fin de aprender o mejorar tus conocimientos en el ámbito de la programación web a través del uso de IA generativa.
                  </CardDescription>
                  <div className="flex justify-center gap-2 mb-4">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">Flask</Badge>
                    <Badge variant="outline">VS Code</Badge>
                  </div>
                  <div className="flex justify-center">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="https://github.com/josejavierml03/TFG_WebChat" target="_blank">
                        <Github className="h-4 w-4 mr-2" />
                        Código
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Image
                    src="/ReservasApp.png"
                    width="400"
                    height="300"
                    alt="ReservasApp"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="mb-2">ReservasApp - Web de Reservas</CardTitle>
                  <CardDescription className="mb-4">
                    La aplicación web responsive desarrollada permite gestionar un sistema de reservas de eventos, ofreciendo funcionalidades específicas según el rol del usuario.
                  </CardDescription>
                  <div className="flex justify-center gap-2 mb-4">
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Bootstrap</Badge>
                    <Badge variant="outline">Spring</Badge>
                    <Badge variant="outline">MySQL</Badge>
                    <Badge variant="outline">MongoDB</Badge>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="https://github.com/josejavierml03/DAWeb_Front" target="_blank">
                        <Github className="h-4 w-4 mr-2" />
                        Frontend
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="https://github.com/josejavierml03/ArSo_Back" target="_blank">
                        <Github className="h-4 w-4 mr-2" /> 
                        Backend
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Pongamonos en Contacto</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Actualmente estoy buscando nuevas oportunidades. Ya sea que tengas una pregunta o solo quieras
                  saludar, ¡haré mi mejor esfuerzo para responderte!
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="mailto:josejavierml03@gmail.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Email
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link
                    href="https://www.linkedin.com/in/jos%C3%A9-javier-m%C3%A9ndez-lagunas-645429342/"
                    target="_blank"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="https://github.com/josejavierml03" target="_blank">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} José Javier Méndez Lagunas. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <button
            onClick={() => scrollToSection("about")}
            className="text-xs hover:underline underline-offset-4 bg-transparent border-none cursor-pointer"
          >
            Acerca de Mí
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="text-xs hover:underline underline-offset-4 bg-transparent border-none cursor-pointer"
          >
            Habilidades
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-xs hover:underline underline-offset-4 bg-transparent border-none cursor-pointer"
          >
            Proyectos
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-xs hover:underline underline-offset-4 bg-transparent border-none cursor-pointer"
          >
            Contacto
          </button>
        </nav>
      </footer>
    </div>
  )
}
