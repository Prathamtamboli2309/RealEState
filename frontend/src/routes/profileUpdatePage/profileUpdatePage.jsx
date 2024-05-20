import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profileUpdatePage.scss";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/AppContext";
import loaderGif from "../../assets/loader.gif"; // Adjust the path to your loader GIF

function ProfileUpdatePage() {
  const navigate = useNavigate();
  const { userProfile, loginUserData, setUserProfile, getuserData } =
    useAppContext();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getuserData(loginUserData.email);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setUserProfile((prevState) => ({
      ...prevState,
      profileImage: file,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("username", userProfile.username);
    data.append("email", userProfile.email);
    data.append("password", userProfile.password);
    if (userProfile.profileImage) {
      data.append("imagefile", userProfile.profileImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/updateprofile", // Replace with your backend endpoint
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await getuserData(loginUserData.email);
      setMessage("Profile updated successfully");
    } catch (error) {
      console.error("Error uploading profile:", error);
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
      navigate("/profile");
    }
  };

  return (
    <div className="profileUpdatePage">
      {loading ? (
        <div className="loader">
          <img src={loaderGif} alt="Loading..." />
        </div>
      ) : (
        <div className="content">
          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              <h1>Update Profile</h1>
              <div className="item">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={userProfile?.username || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="item">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userProfile?.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="item">
                <label htmlFor="profileImage">Profile Image</label>
                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>
          <div className="sideContainer">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Profile preview"
                className="avatar"
              />
            ) : (
              <img
                src={userProfile?.avatar || ""}
                alt="Profile Avatar"
                className="avatar"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileUpdatePage;
