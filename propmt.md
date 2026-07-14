# Rol

Actúa como un desarrollador Backend Senior especializado en Node.js, Express, MongoDB y arquitecturas de microservicios.

Tu tarea es desarrollar ÚNICAMENTE el **Servicio B (Estadísticas y Recomendaciones)** del proyecto **Sistema de Gestión de Biblioteca**.

NO desarrolles el Frontend.
NO desarrolles el Servicio A.
NO desarrolles el Servicio de Autenticación.

Únicamente desarrolla el Servicio B, pero considera que ya existe un Servicio A al cual podrás consumir mediante HTTP cuando sea necesario.

El proyecto será desarrollado utilizando Scrum, por lo que debes respetar estrictamente el orden de los Sprint. No implementes funcionalidades del Sprint 2 durante el Sprint 1, ni funcionalidades del Sprint 3 antes de tiempo.

La tecnología obligatoria es:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT para validar el token recibido
- Axios para consumir el Servicio A
- Arquitectura limpia
- Variables de entorno (.env)

La estructura debe ser limpia y escalable.

Ejemplo:

service-statistics/

- src/
    - config/
    - controllers/
    - routes/
    - middleware/
    - services/
    - models/
    - utils/
    - app.js
- package.json
- .env
- README.md

---

# Descripción del Servicio B

Este servicio deberá implementar lógica independiente para generar información útil utilizando los datos de la biblioteca.

No debe almacenar la información principal de los libros.

Cuando necesite información deberá consumir el Servicio A mediante HTTP usando Axios.

Todos los endpoints deben requerir un JWT válido.

Implementa un middleware que valide el JWT recibido desde el Servicio de Autenticación.

---

# Funcionalidades finales del servicio

El servicio deberá ser capaz de:

- Mostrar los libros más prestados.
- Mostrar la cantidad de préstamos por categoría.
- Mostrar los últimos libros agregados.
- Recomendar libros disponibles según una categoría.
- Generar un resumen general de la biblioteca.

Los endpoints finales serán:

GET /statistics

GET /statistics/categories

GET /recommendations/:category

GET /summary

---

# Desarrollo por Sprint

## Sprint 1

Durante este Sprint únicamente debes realizar:

### Configuración del proyecto

- Inicializar Node.js.
- Instalar Express.
- Instalar Axios.
- Instalar Mongoose.
- Instalar dotenv.
- Instalar jsonwebtoken.
- Instalar nodemon.
- Configurar eslint si es necesario.

### Estructura

Crear toda la estructura del proyecto.

### Configuración

Configurar:

- Express
- Variables de entorno
- Puerto independiente
- Conexión a MongoDB

### Middleware

Crear el middleware que valide JWT.

No importa si aún no existe el Auth Service.

Debe quedar preparado para utilizarlo posteriormente.

### Primer endpoint funcional

Crear un endpoint de prueba.

Ejemplo:

GET /

que responda:

```json
{
    "message":"Service Statistics running"
}
```

o

GET /health

que responda correctamente.

### Comunicación inicial

Configurar Axios para consumir el Servicio A.

Crear un servicio preparado para consumirlo aunque todavía no se utilice.

No implementar todavía lógica de estadísticas.

### Objetivo Sprint 1

Al finalizar este Sprint el proyecto debe:

- iniciar correctamente
- conectarse a MongoDB
- tener estructura profesional
- validar JWT
- tener un endpoint funcionando
- estar listo para consumir el Servicio A

Nada más.

---

# Sprint 2

Ahora desarrolla la lógica principal.

Crear los siguientes endpoints:

GET /statistics

Debe mostrar:

- libros más prestados

GET /statistics/categories

Debe mostrar:

- cantidad de préstamos por categoría

La información deberá obtenerse consumiendo el Servicio A mediante Axios.

No debe duplicar información.

Implementa los servicios necesarios para procesar la información recibida.

Agregar manejo de errores.

Agregar controladores.

Agregar rutas.

Agregar servicios.

Agregar validaciones básicas.

Agregar respuestas HTTP correctas.

Objetivo del Sprint:

El Servicio B ya debe generar estadísticas reales.

---

# Sprint 3

Implementar el resto de funcionalidades.

Crear:

GET /recommendations/:category

Debe:

- consultar el Servicio A
- obtener libros disponibles
- filtrar únicamente la categoría solicitada
- devolver recomendaciones

Crear:

GET /summary

Debe generar un resumen como:

- total de libros
- libros disponibles
- libros prestados
- categorías existentes
- libro más prestado

Agregar:

- manejo completo de errores
- validaciones
- respuestas HTTP consistentes
- código limpio
- comentarios únicamente cuando sean necesarios
- organización profesional

Optimizar el código.

No repetir lógica.

Aplicar buenas prácticas.

---

# Requisitos

Todo el código debe estar en JavaScript utilizando CommonJS.

Utilizar Express Router.

Separar:

- routes
- controllers
- services
- middleware
- config

No escribir todo en app.js.

Utilizar variables de entorno.

No utilizar datos simulados si la información puede obtenerse desde el Servicio A.

Usar Axios para toda comunicación entre servicios.

Implementar manejo de errores utilizando try/catch.

Responder siempre con JSON.

---

# Entrega

Quiero que desarrolles el proyecto Sprint por Sprint.

Primero genera únicamente el Sprint 1 completo.

No avances al Sprint 2 hasta que yo lo indique.

Cuando termine el Sprint 2 esperarás nuevamente mi autorización para comenzar el Sprint 3.

Cada Sprint debe quedar completamente funcional y listo para hacer un Pull Request.