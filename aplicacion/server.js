// aplicacion/server.js
const express = require('express');
const { exec, execSync } = require('child_process');
const app = express();
const port = 5000;

app.use(express.json());

// Ejecutar comando en la sesión screen
app.post('/api/minecraft/command', (req, res) => {
    const { command } = req.body;
    exec(`screen -S Mine -p 0 -X stuff "${command}\n"`, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send('Error executing command');
        }
        res.send('Command executed');
    });
});

// Obtener los logs del servidor
app.get('/api/minecraft/logs', (req, res) => {
    exec('tail -n 100 /path/to/minecraft/server/logs/latest.log', (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send('Error retrieving logs');
        }
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
