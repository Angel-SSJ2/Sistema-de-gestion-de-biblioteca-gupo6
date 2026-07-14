# Esquema de Base de Datos - Servicio A (Gestión de Biblioteca)

Base de datos: **BibliotecaDB** (MongoDB)

---

## Libros (Books)

```
Libro:
  - _id: ObjectId (generado automáticamente por MongoDB)
  - title: String (requerido, trim)
  - author: String (requerido, trim)
  - category: String (requerido, trim)
  - year: Number (requerido, min: 1000, max: año actual + 1)
  - available: Boolean (default: true)
  - status: Boolean (default: true) — para eliminación lógica
  - createdAt: Date (default: Date.now)
  - updatedAt: Date (default: Date.now)
```

---

## Préstamos (Loans)

```
Préstamo:
  - _id: ObjectId (generado automáticamente por MongoDB)
  - bookId: ObjectId (requerido, referencia → Libro)
  - userId: String (requerido)
  - loanDate: Date (default: Date.now)
  - dueDate: Date (requerido)
  - returnDate: Date (default: null)
  - status: String (enum: ['active', 'returned', 'overdue'], default: 'active')
  - createdAt: Date (default: Date.now)
```

---

## Usuarios (Users)

```
Usuario:
  - _id: String (requerido — proporcionado por auth service)
  - name: String (requerido)
  - email: String (requerido, único)
  - role: String (requerido, enum: ['USER_ROLE', 'ADMIN_ROLE'])
  - status: Boolean (default: true)
```

---

## Relaciones

```
Préstamo.bookId → Libro._id (ObjectId reference)
Préstamo.userId → Usuario._id (String reference — el ID viene del auth service)
```

---

## Estados de disponibilidad

- Al crear un préstamo → `Libro.available = false`
- Al registrar devolución → `Libro.available = true`
- La eliminación de libros es lógica: `Libro.status = false` (no se borra físicamente)
