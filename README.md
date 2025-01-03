
# Task Manager API Backend

Este es el backend del proyecto *Task Manager*, una API RESTful que permite gestionar tareas, permitiendo crear, leer, actualizar y eliminar tareas. La aplicación está construida utilizando Node.js, Express y MongoDB.

## Enlace del Proyecto Deployado

La API está disponible en línea en el siguiente enlace:

[https://task-manager-back-2yaa.onrender.com/api/tasks](https://task-manager-back-2yaa.onrender.com/api/tasks)

## Documentación Swagger

### Acceder a Swagger Online

La documentación Swagger para la API se puede acceder a través del siguiente enlace:

[https://task-manager-back-2yaa.onrender.com/api-docs/#/](https://task-manager-back-2yaa.onrender.com/api-docs/#/)

### Acceder a Swagger Localmente

Si deseas acceder a la documentación Swagger de manera local, asegúrate de haber levantado el proyecto en tu entorno de desarrollo y usa la siguiente URL:

```
http://localhost:5000/api-docs/#/
```

## Instalación y Configuración

### Requisitos Previos

- Node.js (versión >= 14.0.0)
- MongoDB instalado localmente para desarrollo
- MongoDB Atlas para la base de datos en producción

### Pasos para la instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/DamianEtcheverrigaray97/task-manager-back.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd task-manager-backend
    ```
    
3. Instala las dependencias:

    ```bash
    bun install
    ```
     Nota: Asegúrate de tener Bun instalado en tu pc.

4. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

    ```plaintext
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/taskmanager
    ```

    Nota: Asegúrate de tener MongoDB instalado y corriendo localmente para desarrollo. En producción, utiliza una URI de conexión a MongoDB Atlas.

5. Levanta el servidor:

    ```bash
    bun run dev
    ```
    Nota: Asegúrate de tener Bun instalado en tu pc.

El servidor estará corriendo en `http://localhost:5000` por defecto.

### Configuración de la Base de Datos

- **Desarrollo Local:** Asegúrate de tener MongoDB instalado y ejecutándose localmente.
- **Producción:** El proyecto utiliza MongoDB Atlas. Para configurarlo, sigue estos pasos:
  1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
  2. Crea un clúster.
  3. Obtén la URI de conexión del clúster y configúrala en tu entorno de despliegue.

## Estructura del Proyecto

La estructura de directorios es la siguiente:

```
task-manager-backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
├── server.js
├── .env
├── package.json
└── README.md
```

### Descripción de Archivos

#### `src/config/db.js`

Este archivo contiene la configuración para la conexión a la base de datos MongoDB usando `mongoose`.

#### `src/controllers/taskController.js`

Contiene la lógica de negocio para las operaciones de creación, obtención, actualización y eliminación de tareas.

#### `src/models/Task.js`

Define el esquema de la base de datos para las tareas.

#### `src/routes/taskRoutes.js`

Define las rutas para acceder a las tareas a través de la API. Incluye las validaciones y documentaciones Swagger.

## Rutas de la API

### Crear una tarea

`POST /api/tasks`

- **Body:** `{ "title": "título de la tarea", "description": "descripción de la tarea", "completed": booleano }`
- **Respuestas:**
  - `201 Created`: Devuelve los datos de la tarea creada.
  - `400 Bad Request`: Si el título es obligatorio pero no se proporciona.
  - `500 Internal Server Error`: Si ocurre un error en el servidor.

### Obtener todas las tareas

`GET /api/tasks`

- **Query Params:** `completed` (opcional, booleano para filtrar por tareas completadas o pendientes).
- **Respuestas:**
  - `200 OK`: Devuelve la lista de tareas.
  - `500 Internal Server Error`: Si ocurre un error en el servidor.

### Obtener una tarea por ID

`GET /api/tasks/{id}`

- **Params:** `{id}` (ID de la tarea).
- **Respuestas:**
  - `200 OK`: Devuelve los datos de la tarea.
  - `404 Not Found`: Si la tarea no existe.
  - `500 Internal Server Error`: Si ocurre un error en el servidor.

### Actualizar una tarea

`PUT /api/tasks/{id}`

- **Params:** `{id}` (ID de la tarea).
- **Body:** `{ "title": "nuevo título", "description": "nueva descripción", "completed": nuevo valor booleano }`.
- **Respuestas:**
  - `200 OK`: Devuelve los datos de la tarea actualizada.
  - `404 Not Found`: Si la tarea no existe.
  - `500 Internal Server Error`: Si ocurre un error en el servidor.

### Eliminar una tarea

`DELETE /api/tasks/{id}`

- **Params:** `{id}` (ID de la tarea).
- **Respuestas:**
  - `200 OK`: Confirma que la tarea fue eliminada.
  - `404 Not Found`: Si la tarea no existe.
  - `500 Internal Server Error`: Si ocurre un error en el servidor.
