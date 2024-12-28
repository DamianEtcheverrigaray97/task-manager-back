const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();
app.use(express.json());

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description: "API para la gestión de tareas",
        },
        servers: [
            { url: `http://localhost:${process.env.PORT || 5000}` }, // URL base del servidor
        ],
    },
    apis: ["./src/routes/*.js"], // Ruta donde están definidas tus rutas (modifícala según tu estructura)
};

// Inicializar Swagger JSDoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Ruta de documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Importar rutas
const taskRoutes = require('./src/routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
