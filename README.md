# 📚 Sistema de Gestión de Biblioteca - Grupo 6

Este proyecto consiste en una plataforma empresarial e integrada para la administración y automatización de flujos de una biblioteca pública o académica, desarrollada bajo un enfoque ágil de **Arquitectura de Microservicios** distribuidos.

---

## 🛠️ Estructura del Monorepo

El ecosistema del sistema se organiza de forma modular e independiente para garantizar el desacoplamiento de servicios:

├── frontend/               # Cliente Web desarrollado en React + Vite
├── service-auth/           # Microservicio de Autenticación (C# / .NET 8)
├── service-library/        # Microservicio de Biblioteca (Node.js / Express)
├── service-statistics/     # Microservicio de Reportes y Estadísticas (Node.js / Express)
└── postman/                # Colecciones de pruebas y documentación de endpoints

⚙️ Tecnologías Utilizadas
Frontend

    Framework: React (Vite)

    Estilos: CSS3 Modular

    Gestión de Rutas: React Router DOM

Backend & Microservicios

    Servicio Auth: C# / .NET 8 Web API (Clean Architecture: API, Application, Domain, Persistence)

    Servicio Library: Node.js (JavaScript) con Express.js

    Servicio Statistics: Node.js (JavaScript) con Express.js

Base de Datos & Seguridad

    Motor NoSQL: MongoDB Atlas

    ORM / ODM: Mongoose (Node.js) & Entity Framework Core (C#)

    Cifrado de Claves: Argon2 / BCrypt

    Sesiones: JSON Web Tokens (JWT)

🚀 Entregables y Estado de Sprints
🔹 Sprint 1 (Completado)

    [x] Configuración inicial del Monorepo y desacoplamiento de puertos.

    [x] Inicialización del Frontend estructurado en React.

    [x] Arquitectura de capas e interfaces de service-auth en .NET 8.

    [x] Establecimiento y mapeo del Modelo de Usuario y Libro en MongoDB Atlas.

    [x] Flujo de registro e inicio de sesión funcional emitiendo JWT.

    [x] Integración inicial Frontend ↔ Servicio de Autenticación.

🔹 Sprint 2 (En Desarrollo)

    [x] Operaciones CRUD completas para la gestión de Libros.

    [x] Lógica de negocio para el registro de préstamos y devoluciones de ejemplares.

    [x] Restricción y protección de endpoints mediante el middleware de validación JWT.

    [x] Comunicación síncrona HTTP entre los microservicios del ecosistema.

    [x] Persistencia y actualización en tiempo real en MongoDB Atlas.

🔹 Sprint 3 (Planificado)

    [x] Validaciones exhaustivas en las capas cliente y servidor.

    [x] Manejo global de excepciones y respuestas estructuradas de error.

    [x] Generación y renderizado de módulos estadísticos dinámicos.

    [x] Integración final del sistema, despliegue y Pull Request a la rama principal main.

🖥️ Instrucciones de Inicialización Local
Prerrequisitos

    Node.js (v18 o superior)

    SDK de .NET 8

    Cuenta o URI activa de MongoDB Atlas

1. Configuración de Variables de Entorno (.env)

Cada microservicio requiere su propio archivo .env en su respectiva raíz. Ejemplo base para los servicios de Node.js:
Fragmento de código

  PORT=4000
  MONGO_URL=tu_uri_de_mongodb_atlas
  JWT_SECRET=tu_clave_secreta_jwt

2. Levantar el Backend de Autenticación (.NET 8)
Bash

cd service-auth/src/AuthService.Api
dotnet restore
dotnet run

3. Levantar los Servicios de Node.js (Library / Statistics)
Bash

cd service-library
npm install
node index.js

4. Ejecutar el Cliente Web
Bash

cd frontend
npm install
npm run dev

👥 Equipo de Desarrollo - Grupo 6

    Angel Rodríguez - Scrum Master & Backend Developer (Auth Service)

    Hugo Muralles - Frontend Developer

    Marcos Cho - Backend Developer (Library Service)

    Angel de la Cruz - Backend Developer (Statistics Service)

    
