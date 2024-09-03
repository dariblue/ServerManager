// //!
// //! Archivo Principal del BACK
// //!

const PORT = process.env.PORT || 3001;
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const minecraftController = require('./controllers/minecraftController');
const monitorController = require('./controllers/monitorController');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Rutas para el monitor de recursos
app.get('/api/system/stats', monitorController.getSystemStats);

// WebSocket Minecraft
minecraftController(wss);
// require('./controllers/minecraftController')

server.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});
