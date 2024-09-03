// aplicacion/server.js
const { exec } = require('child_process');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Cliente conectado a WebSocket');
  
    ws.on('message', (message) => {
      console.log(`Comando recibido: ${message}`);
      exec(`screen -S Minecraft -p 0 -X stuff "${message}\n"`, (error) => {
        if (error) {
          console.error(`Error al enviar comando a Minecraft: ${error}`);
          ws.send(`Error: ${error.message}`);
        }
      });
    });
  
    const logProcess = exec('tail -f /home/d4rx/PruebaMinecraft/logs/latest.log');
  
    logProcess.stdout.on('data', (data) => {
      console.log(`Datos enviados a cliente: ${data}`);
      ws.send(data.toString());
    });
  
    logProcess.stderr.on('data', (data) => {
      console.error(`Error de logs: ${data}`);
      ws.send(`Error: ${data}`);
    });
  
    ws.on('close', () => {
      console.log('Cliente desconectado');
    });
  });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});
