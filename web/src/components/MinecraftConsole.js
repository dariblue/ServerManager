import React, { useEffect, useState } from 'react';

const MinecraftConsole = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  let socket;

  useEffect(() => {
    // Crear la conexión WebSocket
    socket = new WebSocket('ws://localhost:5000'); // Cambia localhost por la IP del servidor si es necesario
  
    socket.onopen = () => {
      console.log('WebSocket conectado');
    };
  
    socket.onmessage = (event) => {
      console.log(`Mensaje recibido: ${event.data}`);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
  
    socket.onerror = (error) => {
      console.error(`Error en WebSocket: ${error}`);
    };
  
    socket.onclose = () => {
      console.log('WebSocket desconectado');
    };
  
    return () => {
      socket.close();
    };
  }, []);

  
  const sendCommand = () => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(input);
      setInput('');
    }
  };

  return (
    <div>
      <h1>Consola de Minecraft</h1>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid black' }}>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') sendCommand();
        }}
      />
      <button onClick={sendCommand}>Enviar Comando</button>
    </div>
  );
};

export default MinecraftConsole;
