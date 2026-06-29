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
    <div className="seller-dashboard">
      <SellerSide />
      <div className="main-content">
        <div className="form-container">
          <div className="form-header">
            <h2>Add New <span>Account</span></h2>
            <p>List your gaming account for sale on the marketplace.</p>
          </div>

          <form onSubmit={handleAddGameAccount} className="modern-form" encType="multipart/form-data">
            {/* Basic Info Section */}
            <div className="form-section">
              <h3><i className="bi bi-info-circle"></i> Basic Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Game Title</label>
                  <input
                    type="text"
                    className="custom-input"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    placeholder="e.g. Valorant, League of Legends"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    className="custom-input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Set your price"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Platform</label>
                  <select
                    className="custom-input"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    required
                  >
                    <option value="">Select Platform</option>
                    <option value="PC">PC</option>
                    <option value="PlayStation">PlayStation</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Game Mode</label>
                  <select
                    className="custom-input"
                    value={gameMode}
                    onChange={(e) => setGameMode(e.target.value)}
                    required
                  >
                    <option value="">Select Mode</option>
                    <option value="Single Player">Single Player</option>
                    <option value="Multiplayer">Multiplayer</option>
                    <option value="Co-op">Co-op</option>
                    <option value="Battle Royale">Battle Royale</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  className="custom-input textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the account's rank, skins, and achievements..."
                  required
                />
              </div>
            </div>

            {/* Credentials Section */}
            <div className="form-section">
              <h3><i className="bi bi-shield-lock"></i> Account Credentials</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Login Username</label>
                  <input
                    type="text"
                    className="custom-input"
                    value={gameUsername}
                    onChange={(e) => setGameUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Login Password</label>
                  <input
                    type="password"
                    className="custom-input"
                    value={gamePassword}
                    onChange={(e) => setGamePassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="form-section">
              <h3><i className="bi bi-image"></i> Visuals & Media</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Cover Banner</label>
                  <div className="file-input-wrapper">
                    <input type="file" onChange={handleCoverPhotoChange} accept="image/*" />
                    <span><i className="bi bi-cloud-arrow-up"></i> Upload Cover</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Gallery (up to 5)</label>
                  <div className="file-input-wrapper">
                    <input type="file" multiple onChange={handleScreenshotChange} accept="image/*" />
                    <span><i className="bi bi-images"></i> Add Screenshots</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords Section */}
            <div className="form-section">
              <h3><i className="bi bi-tags"></i> Tags & Keywords</h3>
              <div className="keyword-list">
                {keywords.map((keyword, index) => (
                  <div key={index} className="keyword-input-row">
                    <input
                      type="text"
                      className="custom-input sm"
                      value={keyword}
                      onChange={(e) => handleKeywordChange(index, e.target.value)}
                      placeholder="e.g. Immortal, Rare Skins"
                      required
                    />
                    {index > 0 && (
                      <button type="button" className="remove-btn" onClick={() => removeKeyword(index)}>
                        <i className="bi bi-x"></i>
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="add-more-btn" onClick={addMoreKeyword}>
                  <i className="bi bi-plus-lg"></i> Add Tag
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-footer">
              <button type="submit" className="submit-btn">
                Publish Account Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default AddGameAccount;
