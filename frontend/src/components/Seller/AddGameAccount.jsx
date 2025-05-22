// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AddGameAccount = () => {
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const [gameName, setGameName] = useState("");
//     const [coverPhoto, setCoverPhoto] = useState(null);
//     const [screenshots, setScreenshots] = useState([]);
//     const [keywords, setKeywords] = useState([""]); // Array for multiple keywords
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleCoverPhotoChange = (e) => {
//         setCoverPhoto(e.target.files[0]);
//     };

//     const handleScreenshotChange = (e) => {
//         setScreenshots(e.target.files);
//     };

//     // Handle keyword input change
//     const handleKeywordChange = (index, value) => {
//         const newKeywords = [...keywords];
//         newKeywords[index] = value;
//         setKeywords(newKeywords);
//     };

//     // Add a new keyword input field
//     const addMoreKeyword = () => {
//         setKeywords([...keywords, ""]);
//     };

//     // Remove a keyword field
//     const removeKeyword = (index) => {
//         if (keywords.length > 1) {
//             setKeywords(keywords.filter((_, i) => i !== index));
//         }
//     };

//     const handleAddGameAccount = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = new FormData();
//             formData.append("description", description);
//             formData.append("price", price);
//             formData.append("gameName", gameName);

//             keywords.forEach((keyword) => {
//                 formData.append("keywords", keyword); // Append multiple keywords
//             });

//             if (coverPhoto) {
//                 formData.append("coverPhoto", coverPhoto);
//             }

//             if (screenshots.length > 0) {
//                 Array.from(screenshots).forEach((file) => {
//                     formData.append("screenshots", file);
//                 });
//             }

//             const userId = localStorage.getItem("userid");
//             const response = await axios.post(
//                 `http://localhost:8000/api/addgameaccount/${userId}`,
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );

//             console.log(response);
//             alert("Game account added successfully");
//             navigate("/userGameAccount");
//         } catch (error) {
//             setError("Error adding game account");
//             console.error("Error adding game account:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Add Game Account</h2>
//             <form onSubmit={handleAddGameAccount} encType="multipart/form-data">
//                 <div>
//                     <label>Description:</label>
//                     <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Price:</label>
//                     <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Game Name:</label>
//                     <input type="text" value={gameName} onChange={(e) => setGameName(e.target.value)} required />
//                 </div>
//                 <div>
//                     <label>Cover Photo:</label>
//                     <input type="file" onChange={handleCoverPhotoChange} accept="image/*" />
//                 </div>
//                 <div>
//                     <label>Screenshots (up to 5):</label>
//                     <input type="file" multiple onChange={handleScreenshotChange} accept="image/*" />
//                 </div>
//                 <div>
//                     <label>Keywords:</label>
//                     {keywords.map((keyword, index) => (
//                         <div key={index} style={{ display: "flex", marginBottom: "5px" }}>
//                             <input
//                                 type="text"
//                                 value={keyword}
//                                 onChange={(e) => handleKeywordChange(index, e.target.value)}
//                                 required
//                             />
//                             {index > 0 && (
//                                 <button type="button" onClick={() => removeKeyword(index)} style={{ marginLeft: "5px" }}>
//                                     Remove
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                     <button type="button" onClick={addMoreKeyword} style={{ marginTop: "5px" }}>
//                         Add More
//                     </button>
//                 </div>
//                 {error && <p style={{ color: "red" }}>{error}</p>}
//                 <button type="submit">Add Game Account</button>
//             </form>
//         </div>
//     );
// };

// export default AddGameAccount;




import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SellerSide from "./sellerSide";

const AddGameAccount = () => {
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [gameName, setGameName] = useState("");
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [keywords, setKeywords] = useState([""]);
    const [gameUsername, setGameUsername] = useState("");
    const [gamePassword, setGamePassword] = useState("");
    const [platform, setPlatform] = useState("");
    const [gameMode, setGameMode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCoverPhotoChange = (e) => {
        setCoverPhoto(e.target.files[0]);
    };

    const handleScreenshotChange = (e) => {
        setScreenshots(e.target.files);
    };

    const handleKeywordChange = (index, value) => {
        const newKeywords = [...keywords];
        newKeywords[index] = value;
        setKeywords(newKeywords);
    };

    const addMoreKeyword = () => {
        setKeywords([...keywords, ""]);
    };

    const removeKeyword = (index) => {
        if (keywords.length > 1) {
            setKeywords(keywords.filter((_, i) => i !== index));
        }
    };

    const handleAddGameAccount = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("description", description);
            formData.append("price", price);
            formData.append("gameName", gameName);
            formData.append("gameUsername", gameUsername);
            formData.append("gamePassword", gamePassword);
            formData.append("platform", platform);
            formData.append("gameMode", gameMode);



            keywords.forEach((keyword) => {
                formData.append("keywords", keyword);
            });
            if (coverPhoto) {
                formData.append("coverPhoto", coverPhoto);
            }
            if (screenshots.length > 0) {
                Array.from(screenshots).forEach((file) => {
                    formData.append("screenshots", file);
                });
            }

            const userId = localStorage.getItem("userid");
            const response = await axios.post(
                `http://localhost:8000/api/addgameaccount/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response);
            alert("Game account added successfully");
            navigate("/userGameAccount");
        } catch (error) {
            setError("Error adding game account");
            console.error("Error adding game account:", error);
        }
    };

    return (
        <div className="d-flex">
            <SellerSide />
        <div className="container d-flex justify-content-center align-items-start mt-5 min-vh-100">
            <div
                className="card p-4 shadow"
                style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    width: "100%",
                    maxWidth: "700px",
                    color: "#fff",
                }}
            >
                <h2 style={{color: 'white'}} className="text-center mb-4">Add Game Account</h2>
                <form onSubmit={handleAddGameAccount} encType="multipart/form-data">
                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <label>Game Name:</label>
                            <input
                                type="text"
                                className="form-control bg-transparent text-white border-white"
                                value={gameName}
                                onChange={(e) => setGameName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Price:</label>
                            <input
                                type="number"
                                className="form-control bg-transparent text-white border-white"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Platform:</label>
                            <select
                                className="form-control bg-transparent text-white border-white"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                required>
                                <option className="text-dark bg-light" value="">Select Platform</option>
                                <option className="text-dark bg-light" value="PC">PC</option>
                                <option className="text-dark bg-light" value="PlayStation">PlayStation</option>
                                <option className="text-dark bg-light" value="Xbox">Xbox</option>
                                <option className="text-dark bg-light" value="Nintendo">Nintendo</option>
                                <option className="text-dark bg-light" value="Mobile">Mobile</option>
                            </select>

                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Game Mode:</label>
                            <select
                                className="form-control bg-transparent text-white border-white"
                                value={gameMode}
                                onChange={(e) => setGameMode(e.target.value)}
                                required>
                                <option className="text-dark bg-light" value="">Select Game Mode</option>
                                <option className="text-dark bg-light" value="Single Player">Single Player</option>
                                <option className="text-dark bg-light" value="Multiplayer">Multiplayer</option>
                                <option className="text-dark bg-light" value="Co-op">Co-op</option>
                                <option className="text-dark bg-light" value="Battle Royale">Battle Royale</option>
                            </select>

                        </div>

                        <div className="col-md-12 mb-3">
                            <label>Description:</label>
                            <input
                                style={{height: '150px'}}
                                type="text"
                                className="form-control bg-transparent text-white border-white"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Cover Photo:</label>
                            <input
                                type="file"
                                className="form-control bg-transparent text-white border-white"
                                onChange={handleCoverPhotoChange}
                                accept="image/*"
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Screenshots (up to 5):</label>
                            <input
                                type="file"
                                multiple
                                className="form-control bg-transparent text-white border-white"
                                onChange={handleScreenshotChange}
                                accept="image/*"
                            />
                        </div>
                        
                        <div className="col-md-6 mb-3">
                        <label>Account Username:</label>
                        <input
                            type="text"
                            className="form-control bg-transparent text-white border-white"
                            value={gameUsername}
                            onChange={(e) => setGameUsername(e.target.value)}
                            required
                        />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Account Password:</label>
                            <input
                                type="text"
                                className="form-control bg-transparent text-white border-white"
                                value={gamePassword}
                                onChange={(e) => setGamePassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label>Keywords:</label>
                            {keywords.map((keyword, index) => (
                                <div key={index} className="d-flex mb-2">
                                    <input
                                        type="text"
                                        className="form-control bg-transparent text-white border-white"
                                        value={keyword}
                                        onChange={(e) => handleKeywordChange(index, e.target.value)}
                                        required
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            className="btn btn-danger ms-2"
                                            onClick={() => removeKeyword(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                style={{backgroundColor: 'none', border: '1px solid #9742FF', color: '#9742FF '}}
                                type="button"
                                className="btn btn-outline-light btn-sm mt-2"
                                onClick={addMoreKeyword}
                            >
                                Add More
                            </button>
                        </div>

                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="text-center mt-4">
                        <button type="submit" className="btn  px-4" style={{
                    width: '50%',
                    padding: '10px',
                    backgroundColor: '#7301FF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    font: '16px',
                }}>
                            Add Game Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default AddGameAccount;
