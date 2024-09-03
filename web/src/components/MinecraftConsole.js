import React, { useState, useEffect } from 'react';

const MinecraftConsole = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001'); // Asegúrate de usar el puerto correcto
    ws.onopen = () => {
      console.log('Conectado al servidor WebSocket');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      setConsoleOutput((prev) => prev + event.data);
    };

    ws.onclose = () => {
      console.log('Desconectado del servidor WebSocket');
      setSocket(null);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const sendCommand = () => {
    if (socket) {
      socket.send(message);
      setMessage('');
    } else {
      console.error('WebSocket no está conectado');
    }
  };

  return (
    <div>
      <textarea value={consoleOutput} readOnly rows="30" cols="120" />
      <br />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Introduce comando"
      />
      <button onClick={sendCommand}>Enviar Comando</button>
    </div>
  );
};

export default MinecraftConsole;
