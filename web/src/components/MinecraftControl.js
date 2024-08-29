// web/src/components/MinecraftControl.js
import React, { useState, useEffect } from 'react';

const MinecraftControl = () => {
    const [command, setCommand] = useState('');
    const [logs, setLogs] = useState('');

    useEffect(() => {
        // Función para obtener logs
        const fetchLogs = async () => {
            try {
                const response = await fetch('/api/minecraft/logs');
                const data = await response.text();
                setLogs(data);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchLogs();
        // Actualizar logs cada 5 segundos
        const interval = setInterval(fetchLogs, 5000);

        return () => clearInterval(interval); // Limpiar intervalo al desmontar
    }, []);

    // Función para enviar comando
    const handleSendCommand = async () => {
        try {
            await fetch('/api/minecraft/command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command }),
            });
            setCommand('');
        } catch (error) {
            console.error('Error sending command:', error);
        }
    };

    return (
        <div>
            <h2>Control del Servidor Minecraft</h2>
            <textarea
                rows="10"
                cols="80"
                value={logs}
                readOnly
                style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
            />
            <br />
            <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Escribe un comando..."
            />
            <button onClick={handleSendCommand}>Enviar Comando</button>
        </div>
    );
};

export default MinecraftControl;
