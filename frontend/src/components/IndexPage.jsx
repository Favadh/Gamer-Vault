import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GameAccounts.css";  
import IndexHeader from "./IndexHeader";
import HeroSection from "./HeroSection";
import News from "./News";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const [gameAccounts, setGameAccounts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8000/api/game")
            .then((response) => {
                setGameAccounts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching game accounts:", error);
            });
    }, []);
    const handlePopUp = () => {
        alert('you need to login to see the game accounts');
        navigate('/login')
    }

    return (
        <div>
            <IndexHeader />
            <HeroSection />
            <div id="store" className="game-accounts-container">
            <div className="game-cards" onClick={handlePopUp}>
                {gameAccounts.map((game) => (
                    <div key={game._id} className="game-card">
                        <img 
                            src={`http://localhost:8000/uploads/coverPhotos/${game.coverPhoto}`} 
                            alt={game.gameName}     
                            className="game-cover" 
                        />
                        <div className="game-info">
                            <h3 className="game-title">{game.gameName}</h3>
                            <p className="game-description"><strong>Mode:</strong> {game.gameMode}</p>
                            <p className="game-price"><strong>Price:</strong> ${game.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {/* <News /> */}
        </div>
    );
};

export default MainPage;
