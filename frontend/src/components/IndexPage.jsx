import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./GameAccounts.css";  
import IndexHeader from "./IndexHeader";
import HeroSection from "./HeroSection";
import News from "./News";
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const MainPage = () => {
    const [gameAccounts, setGameAccounts] = useState([]);
    const navigate = useNavigate();

    const [showScrollDown, setShowScrollDown] = useState(true);
    const containerRef = useRef(null);

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
        navigate('/login');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const { scrollTop } = containerRef.current;
            setShowScrollDown(scrollTop < 0.5);
        };

        const refCurrent = containerRef.current;
        if (refCurrent) {
            refCurrent.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (refCurrent) {
                refCurrent.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div>
            <IndexHeader />
            <HeroSection />

            <div id="store"></div>

            <div className="store-title">
                <h1>STORE</h1>
                <div className="store-subtitle">
                    <p className="store-top">Accounts with top</p>
                    <p className="store-gears">Gears</p>
                </div>
            </div>

            <div className="game-accounts-container" ref={containerRef}>
                <div className="game-cards">
                    {gameAccounts.map((game) => (
                        <div key={game._id} className="game-card" onClick={handlePopUp}>
                            <img
                                src={`http://localhost:8000/uploads/coverPhotos/${game.coverPhoto}`}
                                alt={game.gameName}
                                className="game-cover"
                            />
                            <span className="hehe"></span>
                            <div className="game-info">
                                <div className="game-details">
                                    <div className="game-details-text">
                                        <p className="game-title">{game.gameName}</p>
                                        <p className="game-description">{game.platform}</p>
                                        <p className="game-price">₹{game.price}</p>
                                    </div>
                                    <div>
                                        <img className="sellerPhoto" src={`http://localhost:8000/uploads/profilePhotos/${game.profilePhoto}`} alt="Profile Photo" />
                                        <p className="sellerName">{game.username}</p>
                                    </div>
                                </div>
                                <div>
                                    <button className="cart-btn">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`scroll-down${showScrollDown ? ' show' : ' hide'}`}>
                    <div>
                        <MdKeyboardDoubleArrowDown className="scroll-icon" />
                        <p>Scroll for more</p>
                    </div>
                </div>
            </div>


            <div className="store-title">
                <h1 id="news">NEWS</h1>
                <div className="store-subtitle">
                    <p className="store-top">Events and</p>
                    <p className="store-gears">Headlines</p>
                </div>
            </div>

            <div className="news-section">

                    <div className="news-card">
                        <div className="news-image">
                            <img src="../../public/news-1.jpg"/>
                        </div>                        
    
                        <div className="news-details">
                            <h3>Battlefield Chaos</h3>
                            <p>Explosive new missions arrive in the latest war shooter update, featuring intense airstrikes and cinematic combat moments.</p>
                        </div>
                    </div>

                    <div className="news-card">
                        <div className="news-image">
                            <img src="../../public/news-2.jpg"/>
                        </div>                        

                        <div className="news-details">
                            <h3>Frozen Warrior</h3>
                            <p>A powerful new ice-themed boss challenges players with freezing attacks and electrifying abilities in the dark fantasy expansion.</p>
                        </div>
                    </div>

                    <div className="news-card">
                        <div className="news-image">
                            <img src="../../public/news-3.jpg"/>
                        </div>                        

                        <div className="news-details">
                            <h3>Arctic Ops</h3>
                            <p>Special forces deploy in icy terrains with new winter gear, tactical weapons, and high-stakes missions.</p>
                        </div>
                    </div>

                    
            </div>
        </div>
    );
};

export default MainPage;
