const os = require('os');

const getSystemStats = (req, res) => {
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
};

module.exports = {
  getSystemStats,
};
