
# Task Manager API Backend

Este es el backend del proyecto *Task Manager*, una API RESTful que permite gestionar tareas, permitiendo crear, leer, actualizar y eliminar tareas. La aplicación está construida utilizando Node.js, Express y MongoDB. La base de datos está alojada en MongoDB Atlas.

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
- MongoDB Atlas para la base de datos

### Pasos para la instalación

1. Clona el repositorio:

    ```bash
    git clone <repositorio_url>
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd task-manager-backend
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Crea un archivo `.env` en la raíz del proyecto y agrega tu URI de conexión de MongoDB Atlas:

    ```plaintext
    MONGO_URI=<tu_uri_de_mongodb_atlas>
    ```

5. Levanta el servidor:

    ```bash
    npm start
    ```

El servidor estará corriendo en `http://localhost:5000` por defecto.

### Configuración de la Base de Datos

El proyecto usa MongoDB Atlas como base de datos. Para configurarlo, sigue estos pasos:

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Crea un clúster.
3. Obtén la URI de conexión del clúster y configúralo en el archivo `.env`.

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
│   ├── server.js
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

- **Body**: `{ "title": "título de la tarea", "description": "descripción de la tarea", "completed": booleano }`
- **Respuesta**: `201 Created` (con los datos de la tarea creada)

### Obtener todas las tareas

`GET /api/tasks`

- **Query Params**: `completed` (opcional, booleano para filtrar por tareas completadas o pendientes)
- **Respuesta**: `200 OK` (con la lista de tareas)

### Obtener una tarea por ID

`GET /api/tasks/{id}`

- **Params**: `{id}` (ID de la tarea)
- **Respuesta**: `200 OK` (con los datos de la tarea)
- **Errores**: `404 Not Found` si la tarea no existe.

### Actualizar una tarea

`PUT /api/tasks/{id}`

- **Params**: `{id}` (ID de la tarea)
- **Body**: `{ "title": "nuevo título", "description": "nueva descripción", "completed": nuevo valor booleano }`
- **Respuesta**: `200 OK` (con los datos de la tarea actualizada)

### Eliminar una tarea

`DELETE /api/tasks/{id}`

- **Params**: `{id}` (ID de la tarea)
