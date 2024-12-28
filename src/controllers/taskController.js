const Task = require('../models/Task');

// Crear una tarea
exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'El título es obligatorio' });

    try {
        const task = new Task({ title, description });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las tareas (con filtro opcional)
exports.getTasks = async (req, res) => {
    const { completed } = req.query;

    try {
        const query = completed ? { completed: completed === 'true' } : {};
        const tasks = await Task.find(query);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

        res.json({ message: 'Tarea eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
