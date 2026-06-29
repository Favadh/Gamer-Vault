import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./GameAccounts.css";
import IndexHeader from "./IndexHeader";
import HeroSection from "./HeroSection";
import News from "./News";
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { localGameAccounts } from "./localGameData";

const MainPage = () => {
    const [gameAccounts, setGameAccounts] = useState(localGameAccounts);
    const navigate = useNavigate();

    const [showScrollDown, setShowScrollDown] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        // Offline Mode: Data loaded from localGameData.js
        // axios.get("http://localhost:8000/api/game")
        //     .then((response) => {
        //         setGameAccounts(response.data);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching game accounts:", error);
        //     });
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
                                src={game.coverPhoto?.startsWith('/game-cover/') ? game.coverPhoto : `http://localhost:8000/uploads/coverPhotos/${game.coverPhoto}`}
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

            <div className="store-title">
                <div className="store-subtitle">
                    <h1 id="about-us">SIMPLE, SECURE,</h1>
                    <p className="store-gears store-and-text">AND</p>
                    <h1>RELIABLE</h1>
                </div>
            </div>

            <div className="about-us-div">
                <div className="about-section">
                    <p>
                        <strong>Gamer Vault</strong> is your ultimate destination for seamless trading of gaming accounts. We provide a user-friendly platform where buyers and sellers can connect with confidence. Whether you’re looking for top-tier accounts or want to monetize your hard-earned progress, Gamer Vault is here to help.

                    </p>

                    <p>
                        We support trading across a wide range of games, including popular titles like World of Warcraft, League of Legends, Genshin Impact, Fortnite, Call of Duty, and many more. From high-level accounts to rare in-game items, Gamer Vault is your one-stop shop for all your trading needs.
                    </p>

                    <p>
                        Looking for exclusive accounts or powerful characters? Our advanced search filters make it easy to find exactly what you’re looking for, whether it’s geared-up accounts, specific game levels, or unique achievements.
                    </p>

                    <p>
                        Worried about security? With Gamer Vault, your peace of mind is guaranteed. We provide secure payment gateways, account verification, and a rating system to ensure trust and reliability in every transaction.
                    </p>

                    <p>
                        Stuck in a game or want to level up quickly? We’re here to support you with trading solutions tailored to your gaming goals.
                    </p>

                    <p>
                        Why wait? Join Gamer Vault today and discover a secure, reliable, and efficient way to trade gaming accounts.
                    </p>
                </div>
            </div>

            <footer className="footer">
                <div className="details-section">
                    <div>
                        <img src="../../public/logo.png" alt="logo" />
                        <p>
                            Our platform is a perfect market place for selling and buying of used game accounts with a variety of options.
                        </p>
                    </div>

                    <div className="links">
                        <div>
                            <p className="useful-link">USEFUL LINKS</p>
                        </div>
                        <p>Help Center</p>
                        <p>Privacy and Policy</p>
                        <p>Terms of Use</p>
                        <p>Contact Us</p>
                    </div>
                    
                    <div className="links">
                        <div>
                            <p className="useful-link">CONTACT US</p>
                        </div>
                        <div className="contact-info">
                            <p className="purple">Location:</p>
                            <p>Kunnath apartments, Aalinchod, valanchery, 679331</p>
                        </div>
                        <div className="contact-info">
                            <p className="purple">Email:</p>
                            <p>gamervault@gmail.com</p>
                        </div>
                        <div className="contact-info">
                            <p className="purple">Phone:</p>
                            <p>+91 9188 054 019</p>
                        </div>
                    </div>

                </div>

                <div className="copyright-section">
                    <p>Copyright © 2025. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainPage;
