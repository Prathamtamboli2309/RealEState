import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [postdata, setpostData] = useState([]);

  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRegisterData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginUserData, setLoginData] = useState({
    email: "",
    password: "",
  });
  // if (!isAuthenticated) {
  // navigate("/");
  // }
  // console.log(isAuthenticated);
  const registerUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/signup",
        userRegisterData
      );
      // console.log("User registered:", response.data);
      // navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        loginUserData
      );
      if (response.data.success) {
        await getuserData(loginUserData.email);

        setIsAuthenticated(true);

        // console.log("User Data:", response.data.user);
        // console.log("Token:", response.data.token);

        navigate("/");
      } else {
        toast.error("Login failed: ");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const getuserData = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/getuserdata/${email}`
      );
      // console.log(response.data);
      setUserProfile(response.data.user);
      await getUserPost(response.data.user._id);
      // console.log("Fetched user data:", response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      if (error.response && error.response.status === 404) {
        toast.error("User data not found");
      } else {
        toast.error("Error fetching user data");
      }
    }
  };
  //post list
  const fetchpostData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/users/getallpost"
      );
      setpostData(response.data);
    } catch (error) {
      console.error("Error fetching new posts data:", error);
    }
  };

  //get user post
  const getUserPost = async (id) => {
    try {
      // console.log(id);
      const response = await fetch(
        `http://localhost:4000/api/users/userpost/${id}/post`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setUserPost(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  };
  //for post search

  return (
    <AppContext.Provider
      value={{
        setRegisterData,
        setUserProfile,
        registerUser,
        loginUserData,
        setLoginData,
        userRegisterData,
        login,
        userProfile,
        isAuthenticated,
        getuserData,
        postdata,
        setpostData,
        getUserPost,
        setIsAuthenticated,
        fetchpostData,
        userPost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = () => useContext(AppContext);
