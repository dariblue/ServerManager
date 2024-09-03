const WebSocket = require('ws');
const { exec } = require('child_process');
// const { executeCommand } = require('./utils');

module.exports = (wss) => {
  wss.on('connection', (ws) => {
    console.log('Cliente conectado a WebSocket');

    ws.on('message', (message) => {
      console.log(`Comando recibido: ${message}`);
      const startTime = Date.now();

      // Ejecutar el comando en screen
      exec(`screen -S Minecraft -p 0 -X stuff "${message}\n"`, (error, stdout, stderr) => {
      //exec(`help`, (error, stdout, stderr) => {
        const endTime = Date.now();
        console.log(`Command executed in ${endTime - startTime} ms`);
        
        if (error) {
          console.error(`Error al enviar comando a Minecraft: ${error}`);
          ws.send(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          ws.send(`stderr: ${stderr}`);
          return;
        }
        ws.send(stdout);
      });
    });

    const logProcess = exec('tail -f /home/d4rx/PruebaMinecraft/logs/latest.log');

    logProcess.stdout.on('data', (data) => {
      ws.send(data.toString());
    });

    logProcess.stderr.on('data', (data) => {
      ws.send(`Error: ${data}`);
    });

    ws.on('close', () => {
      console.log('Cliente desconectado');
    });
  });
};
