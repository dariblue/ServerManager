// web/src/pages/Minecraft.js
import React from 'react';
// import MinecraftControl from '../components/MinecraftControl';
import MinecraftConsole from '../components/MinecraftConsole';

const Minecraft = () => {
    return (
        <div>
            <h1>Servidor Minecraft</h1>
            <p>Controla y monitorea tu servidor de Minecraft aquí.</p>
            <MinecraftConsole/>
            {/* Aquí puedes agregar botones y controles para gestionar el servidor */}
        </div>
    );
};

export default Minecraft;