// // web/src/pages/Home.js
// import React from 'react';
// import GameCard from '../components/GameCard';

// const Home = () => {
//     return (      

//         <div>

//             <h1>Bienvenido al Gestor de Servidores</h1>
//             <p>Administra tus servidores de juegos desde una interfaz web.</p>
//             <p>Selecciona un juego en el menú para comenzar.</p>

//             <GameCard title="Minecraft" description="Manage your Minecraft server" link="/minecraft" />
//             <GameCard title="Project Zomboid" description="Manage your Project Zomboid server" link="/project-zomboid" />
//             <GameCard title="Assetto Corsa" description="Manage your Assetto Corsa server" link="/assetto-corsa" />
//         </div>
//     );
// };

// export default Home;



// web/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './styles.css'; // Asegúrate de importar el archivo CSS

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Home = () => {
    const [stats, setStats] = useState({ cpuUsage: '0', memoryUsage: '0' });

    useEffect(() => {
        // Función para obtener las estadísticas del sistema
        const fetchSystemStats = async () => {
            try {
                const response = await fetch('/api/system/stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching system stats:', error);
            }
        };

        fetchSystemStats();
        // Actualizar cada 1 segundo
        const interval = setInterval(fetchSystemStats, 1000);

        return () => clearInterval(interval); // Limpiar intervalo al desmontar
    }, []);

    // Datos para la gráfica de uso de RAM
    const memoryUsageData = {
        labels: ['Uso de RAM', 'Libre'],
        datasets: [
            {
                data: [stats.memoryUsage, 100 - stats.memoryUsage],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(200, 200, 200, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(200, 200, 200, 1)'],
                borderWidth: 1,
            },
        ],
    };

    // Datos para la gráfica de uso de CPU
    const cpuUsageData = {
        labels: ['Uso de CPU', 'Libre'],
        datasets: [
            {
                data: [stats.cpuUsage, 100 - stats.cpuUsage],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(200, 200, 200, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(200, 200, 200, 1)'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1>Bienvenido al Gestor de Servidores</h1>
            <p>Administra tus servidores de juegos desde una interfaz web.</p>
            <p>Selecciona un juego en el menú para comenzar.</p>

            <div>
                <h2>Estadísticas del Sistema</h2>
                <div className="stats-container">
                    <div className="stat">
                        <h3>Uso de RAM</h3>
                        <Doughnut data={memoryUsageData} />
                    </div>
                    <div className="stat">
                        <h3>Uso de CPU</h3>
                        <Doughnut data={cpuUsageData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
