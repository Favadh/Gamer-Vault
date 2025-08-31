import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import useScreenWidth from '../utils/useScreenWidth';
import Classes from './IndexHeader.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
    // Track scroll state
    const [scrolled, setScrolled] = useState(false);
    // Track the current window width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Update scroll state based on window.scrollY
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update windowWidth on resize
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigateTo = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState('/');
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleNavigate = (page) => {
        navigateTo(page);
    };

    // This function returns a margin value based on window width and scroll state.
    const getMargin = (navbar) => {
      if(navbar === 'bigScreenWidthNavbar') {
         if (windowWidth < 576) {
            // For devices with width less than 576px:
            return scrolled ? '10px 5%' : '10px 5%';
        } else if (windowWidth < 792) {
            // For devices with width between 576px and 768px:
            return scrolled ? '10px 7%' : '10px 5%';
        }else if (windowWidth < 992) {
            return scrolled ? '10px 12%' : '10px 5%';
        } else if (windowWidth < 1200) {
            // For devices with width between 1000px and 1200px:
            return scrolled ? '10px 16%' : '10px 5%';
        } else if(windowWidth < 1400) {
            // For devices with width between 1200px and 1400px:
            return scrolled ? '10px 17%' : '10px 7%';
        } else {
          // For devices with width greater than 1400px:
            return scrolled ? '10px 20%' : '10px 9%';
        }
      }
      else if(navbar === 'offCanvasNavbar') {
         if (windowWidth < 576) {
            // For devices with width less than 576px:
            return scrolled ? '-10px -8%' : '-10px -5.5%';
        } else if (windowWidth < 792) {
            // For devices with width between 576px and 768px:
            return scrolled ? '-10px -8.1%' : '-10px -5.5%';
        }
      }
    };

    const isMobile = useScreenWidth() < 480;

    return (
      <header className="header">
      <nav className="container navbar-expand-lg navbar-dark ">
        <motion.div
        className={Classes.navbar}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          margin: getMargin('bigScreenWidthNavbar'),
          padding: scrolled ? '0 30px' : '0',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
          borderRadius: scrolled ? '40px' : '0',
          boxShadow: scrolled
          ? 'rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.16) 0px 2px 8px 0px'
          : 'none',
          transform: 'none',
          transformOrigin: '50% 50% 0px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
        <motion.div
          animate={{
          height: scrolled ? '4rem' : '5.5rem',
          width: scrolled ? '4rem' : '5.5rem',
          }}
          transition={{ duration: 0.3 }}
          className={Classes.logo}
        >
          <a href="">
          <img
            src="/logo.png"
            alt="Gamer Vault"
            style={{ height: '100%' }}
          />
          </a>
        </motion.div>

        <ul className={scrolled ? Classes.ul : Classes.ulScrolled}>
          <li
          onClick={() => {
            setActiveSection('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={activeSection === '/' ? Classes.navActive : ''}
          >
          <h5>Home</h5>
          </li>

          <li
          onClick={() => {
            setActiveSection('/store');
            const storeSection = document.getElementById("store");
            if (storeSection) {
            storeSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={activeSection === '/store' ? Classes.navActive : ''}
          >
          <h5>Store</h5>
          </li>

          <li
          onClick={() => {
            setActiveSection('/news');
            const storeSection = document.getElementById("news");
            if (storeSection) {
            storeSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={activeSection === '/news' ? Classes.navActive : ''}
          >
          <h5>News</h5>
          </li>

          <li
          onClick={() => {
            setActiveSection('/about-us');
            const storeSection = document.getElementById("about-us");
            if (storeSection) {
            storeSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={activeSection === '/about-us' ? Classes.navActive : ''}
          >
          <h5> {isMobile ? 'About' : 'About Us'} </h5>
          </li>
        </ul>

        {/* Hamburger toggler only for < 700px */}
        {windowWidth < 700 && (
          <>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setShowOffcanvas(true)}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Offcanvas Navbar */}
                  <div
                    className={`offcanvas offcanvas-end${showOffcanvas ? ' show' : ''}`}
                    tabIndex="-1"
                    style={{
                    margin: getMargin('offCanvasNavbar'),
                    visibility: showOffcanvas ? 'visible' : 'hidden',
                    background: 'rgba(0,0,0,0.95)',
                    color: '#fff',
                    transition: 'visibility 0s, transform 0.3s ease-in-out',
                    zIndex: 1050,
                    // Prevent any scroll-based style changes here
                    padding: '0',
                    height: '100vh',
                    width: '50%',
                    backdropFilter: 'none',
                    borderRadius: '0',
                    boxShadow: 'none',
                    }}
                    aria-modal="true"
                    role="dialog"
                  >
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title"
                      style={{
                        fontSize: windowWidth < 480 && windowWidth >380 ? '16px': windowWidth <= 380 && '13px',
                        fontWeight: windowWidth <= 380 && '100',
                      }}>Gamer Vault</h5>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        aria-label="Close"
                        onClick={() => setShowOffcanvas(false)}
                      ></button>
                    </div>

                    <div className="offcanvas-body row d-flex flex-column align-items-start gap-3">

                    <button
                      className={`col-6 ${Classes.loginBtn}`}
                      
                      onClick={() => {
                    setShowOffcanvas(false);
                    handleNavigate('/login');
                  }}
                >
                  Login
                </button>

                <button
                  className={` col-6 ${Classes.signupBtn}`}
                  onClick={() => {
                    setShowOffcanvas(false);
                    handleNavigate('/signup');
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
            {/* Overlay for offcanvas */}
            {showOffcanvas && (
              <div
                className="offcanvas-backdrop fade show"
                style={{ zIndex: 1040,
                  margin: getMargin('offCanvasNavbar'),
                 }}
                onClick={() => setShowOffcanvas(false)}
              />
            )}
          </>
        )}

        {(windowWidth >= 700) 
        ? (
            <div className={Classes.gridRight}>
              <button className={Classes.loginBtn} onClick={() => handleNavigate('/login')}>
                Login
              </button>
              <button className={Classes.signupBtn} onClick={() => handleNavigate('/signup')}>
                Sign Up
              </button>
            </div>
          ) 
        : (
          <div className={`${Classes.gridRight} collapse collapse-vertical navbar-collapse `} id='navbarBtns'>
            <button className={`${Classes.loginBtn}`} onClick={() => handleNavigate('/login')}>
              Login
            </button>
            <button className={Classes.signupBtn} onClick={() => handleNavigate('/signup')}>
              Sign Up
            </button>
          </div>
        )}

        </motion.div>
      </nav>
      </header>
    );
}
