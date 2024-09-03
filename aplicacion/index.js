//!
//! Archivo Principal del BACK
//!
const express = require('express');
const os = require('os');
const app = express();
const port = 3001;

app.use(express.json());

// Endpoint para obtener la información del sistema
app.get('/api/system/stats', (req, res) => {
    const cpuUsage = os.loadavg(); // Carga de la CPU en 1, 5 y 15 minutos
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercent = (usedMemory / totalMemory) * 100;

    // Estimación simple del uso de CPU en porcentaje
    const cpuUsagePercent = (cpuUsage[0] / os.cpus().length) * 100; // Promedio de 1 minuto

    res.json({
        cpuUsage: cpuUsagePercent.toFixed(2),
        memoryUsage: memoryUsagePercent.toFixed(2),
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
