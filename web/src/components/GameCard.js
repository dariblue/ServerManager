// web/src/components/GameCard.js
import React from 'react';

const GameCard = ({ title, description, link }) => {
    return (
        <div className="game-card">
            <h2>{title}</h2>
            <p>{description}</p>
            <a href={link}>Go to {title}</a>
        </div>
    );
};

export default GameCard;
