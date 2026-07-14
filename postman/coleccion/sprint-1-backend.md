# Sprint 1 — Backend Servicio A (Gestión de Biblioteca)

**Nombre del Sprint:** Sprint 1 - Backend API REST  
**Duración:** 90 minutos  
**Objetivo:** Implementar el backend del servicio de gestión de biblioteca con autenticación JWT, CRUD de libros, sistema de préstamos/devoluciones y gestión de usuarios.

---

## Historias de Usuario

### HU-001: Como administrador, quiero registrar libros en el sistema para que estén disponibles para préstamo.

**Criterios de aceptación:**
- El endpoint `POST /books` debe recibir título, autor, categoría y año.
- El libro se crea con `available: true` por defecto.
- Se valida que los campos obligatorios estén presentes.
- Se retorna el libro creado con su `_id`.

**Estado:** ✅ Completada

---

### HU-002: Como administrador, quiero consultar la lista de libros para ver el catálogo completo.

**Criterios de aceptación:**
- El endpoint `GET /books` retorna todos los libros activos.
- Se pueden filtrar por título, autor, categoría y disponibilidad.
- Los libros eliminados lógicamente no aparecen.

**Estado:** ✅ Completada

---

### HU-003: Como administrador, quiero buscar un libro por ID para ver sus detalles.

**Criterios de aceptación:**
- El endpoint `GET /books/:id` retorna un libro específico.
- Si no existe, retorna 404.

**Estado:** ✅ Completada

---

### HU-004: Como administrador, quiero actualizar la información de un libro.

**Criterios de aceptación:**
- El endpoint `PUT /books/:id` permite modificar título, autor, categoría, año y disponibilidad.
- Se actualiza el campo `updatedAt` automáticamente.
- Si no existe, retorna 404.

**Estado:** ✅ Completada

---

### HU-005: Como administrador, quiero eliminar un libro del catálogo.

**Criterios de aceptación:**
- El endpoint `DELETE /books/:id` realiza eliminación lógica (`status: false`).
- El libro no se borra físicamente de la base de datos.
- Si no existe, retorna 404.

**Estado:** ✅ Completada

---

### HU-006: Como usuario, quiero prestar un libro para poder leerlo.

**Criterios de aceptación:**
- El endpoint `POST /loans` recibe `bookId`, `userId` y `dueDate`.
- Se valida que el libro esté disponible (`available: true`).
- Al crear el préstamo, se marca el libro como no disponible.
- Si el libro no está disponible, retorna error 400.

**Estado:** ✅ Completada

---

### HU-007: Como usuario, quiero devolver un libro prestado.

**Criterios de aceptación:**
- El endpoint `POST /loans/returns` recibe `loanId`.
- Se marca el préstamo con `status: 'returned'` y `returnDate` con la fecha actual.
- Se marca el libro como disponible nuevamente.
- Si el préstamo ya fue devuelto, retorna error 400.

**Estado:** ✅ Completada

---

### HU-008: Como usuario, quiero ver mis préstamos activos.

**Criterios de aceptación:**
- El endpoint `GET /loans/user/:userId` retorna los préstamos de un usuario.
- Se muestra la información del libro (populate).
- Se puede filtrar por estado.

**Estado:** ✅ Completada

---

### HU-009: Como administrador, quiero gestionar los usuarios del sistema.

**Criterios de aceptación:**
- CRUD completo: `GET /users`, `GET /users/:id`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id`.
- Los usuarios son creados con un `_id` proporcionado por el auth service.
- El `DELETE` es lógico.

**Estado:** ✅ Completada

---

### HU-010: Como sistema, quiero que todos los endpoints estén protegidos con JWT.

**Criterios de aceptación:**
- Todos los endpoints requieren header `Authorization: Bearer <token>` o `x-token: <token>`.
- Se validan roles: `USER_ROLE` y `ADMIN_ROLE`.
- Sin token o token inválido → 401.
- Rol no autorizado → 403.

**Estado:** ✅ Completada

---

## Tareas Relacionadas con Commits

| # | Tarea | Commit |
|---|-------|--------|
| 1 | Corregir error de sintaxis en `index.js` (paréntesis extra en `unhandledRejection`) | `fix: corregir error de sintaxis en index.js` |
| 2 | Corregir exportación `initServer` en `app.js` | `fix: alinear nombre de exportación initServer en app.js` |
| 3 | Actualizar middleware JWT para Mongoose 9 (sin `next()`) | `fix: actualizar hooks pre de Mongoose 9 en book.model y loan.model` |
| 4 | Crear `loan.controller.js` con lógica de préstamos y devoluciones | `feat: crear controlador de préstamos con crear, devolver, listar` |
| 5 | Crear `loan.routes.js` con POST /loans y POST /returns | `feat: crear rutas de préstamos y devoluciones` |
| 6 | Crear `user.controller.js` con CRUD completo | `feat: crear controlador de usuarios con CRUD completo` |
| 7 | Crear `user.routes.js` | `feat: crear rutas de usuarios` |
| 8 | Unificar respuestas en formato `success/message` | `refactor: unificar formato de respuestas JSON en todos los controladores` |

---

## Commits para Cho (Git)

```bash
# 1. Corrección de sintaxis
git add service-library/index.js
git commit -m "fix: corregir error de sintaxis en index.js - paréntesis extra en unhandledRejection"

# 2. Corrección de exportación
git add service-library/configs/app.js
git commit -m "fix: alinear nombre de exportación initServer en app.js"

# 3. Corrección de hooks Mongoose 9
git add service-library/src/books/book.model.js service-library/src/loans/loan.model.js
git commit -m "fix: actualizar hooks pre de Mongoose 9 - eliminar next() obsoleto"

# 4. Controlador de préstamos
git add service-library/src/loans/
git commit -m "feat: crear controlador y rutas de préstamos - POST /loans, POST /returns, GET /loans"

# 5. Controlador de usuarios
git add service-library/src/users/
git commit -m "feat: crear controlador y rutas de usuarios - CRUD completo"

# 6. Middleware JWT actualizado
git add service-library/middlewares/
git commit -m "refactor: actualizar middleware JWT - nombres en inglés, respuestas uniformes"

# 7. Colección de Postman y documentación
git add postman/
git commit -m "docs: agregar colección de Postman y esquema de base de datos"

# 8. Estructura del proyecto y README
git add README.md
git commit -m "docs: actualizar README con estructura correcta del proyecto"
```

---

## Commits Únicos (uno solo)

Si prefieres un solo commit para todo:

```bash
git add service-library/ postman/ README.md
git commit -m "feat: completar backend Servicio A - CRUD libros, préstamos, usuarios"
```

---

## Cómo Correr el Proyecto

```bash
# 1. Iniciar MongoDB con Docker
docker run -d --name mongodb-libreria -p 27017:27017 mongo:7.0

# 2. Instalar dependencias
cd service-library
npm install

# 3. Configurar .env
PORT=3005
MONGODB_URI=mongodb://localhost:27017/BibliotecaDB
JWT_SECRET=TuClaveSecretaSeguraParaJWT2024!@#$%^&*()

# 4. Ejecutar el servidor
npm run dev

# 5. Verificar que funciona
curl http://localhost:3005/api/v1/check

# 6. Importar colección de Postman
# Abrir Postman → Import → seleccionar postman/coleccion/servicio-a-biblioteca.json
# Generar token con test-token.js y copiarlo a la variable "token" en Postman
```
