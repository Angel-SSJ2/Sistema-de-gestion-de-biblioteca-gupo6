Ahora vamos a desarrollar únicamente mi parte del Frontend correspondiente al Servicio B del proyecto Sistema de Gestión de Biblioteca.

NO modifiques el login.
NO modifiques el CRUD de libros.
NO modifiques préstamos ni devoluciones.
NO modifiques el código del Servicio A ni del Servicio de Autenticación.

Únicamente desarrolla la parte del Frontend que consume el Servicio B.

Tecnologías:

- React
- React Router
- Axios
- CSS o Tailwind (utiliza el mismo estilo del proyecto)

El frontend deberá consumir estos endpoints del Servicio B:

GET /statistics
GET /statistics/categories
GET /recommendations/:category
GET /summary

La implementación también debe respetar los Sprint.

# Sprint 1

Crear únicamente la estructura del módulo.

- Crear la carpeta correspondiente.
- Crear las rutas.
- Crear los componentes vacíos.
- Configurar Axios para consumir el Servicio B.
- Agregar la navegación hacia el módulo.

Crear las siguientes páginas:

- StatisticsPage
- RecommendationsPage
- SummaryPage

No consumir todavía los endpoints.

---

# Sprint 2

Consumir únicamente:

GET /statistics

y

GET /statistics/categories

Mostrar:

- Libros más prestados.
- Cantidad de préstamos por categoría.

Agregar:

- Loading.
- Manejo básico de errores.
- Componentes reutilizables.

No implementar todavía recomendaciones ni resumen.

---

# Sprint 3

Consumir:

GET /recommendations/:category

GET /summary

Mostrar:

- Recomendaciones por categoría.
- Resumen general de la biblioteca.

Crear un Dashboard donde se visualicen todas las estadísticas.

Agregar:

- Mejoras visuales.
- Diseño responsivo.
- Navegación entre estadísticas y recomendaciones.
- Mensajes cuando no existan datos.
- Código limpio y reutilizable.

No modificar ninguna otra parte del Frontend que no pertenezca al Servicio B.

Primero desarrolla únicamente el Sprint 1 y espera mi autorización para continuar con el Sprint 2.