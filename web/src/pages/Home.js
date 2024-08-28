// web/src/pages/Home.js
import React from 'react';
import GameCard from '../components/GameCard';

const Home = () => {
    return (
        <div>
            <GameCard title="Minecraft" description="Manage your Minecraft server" link="/minecraft" />
            <GameCard title="Project Zomboid" description="Manage your Project Zomboid server" link="/project-zomboid" />
            <GameCard title="Assetto Corsa" description="Manage your Assetto Corsa server" link="/assetto-corsa" />
        </div>
    );
};

export default Home;