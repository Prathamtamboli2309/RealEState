import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import loaderGif from "../../assets/loader.gif";
import Card from "../../components/Card/Card";
import { toast } from "react-toastify";
import { useAppContext } from "../../Context/AppContext";
import "./profilePage.scss";

function ProfilePage() {
  const {
    userProfile,
    isAuthenticated,
    userPost,
    loginUserData,
    getuserData,
    getUserPost,
  } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        await getuserData(loginUserData.email);

        // Fetch saved posts
        const response = await fetch(
          `http://localhost:4000/api/users/${userProfile._id}/saved-posts`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch saved posts");
        }
        const data = await response.json();
        setSavedPosts(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []);

  return (
    <div className="profilePage">
      {loading ? (
        <div className="loader">
          <img src={loaderGif} alt="Loading..." width="100px" height="100px" />
        </div>
      ) : (
        <div className="details">
          <div className="wrapper">
            <div className="title">
              <h1>User Information</h1>
              <Link to="/updateprofile">
                <button>Update Profile</button>
              </Link>
            </div>
            <div className="info">
              <span>
                Avatar:
                <img src={userProfile?.avatar} alt="User Avatar" />
              </span>
              <span>
                Username: <b>{userProfile?.username}</b>
              </span>
              <span>
                E-mail: <b>{userProfile?.email}</b>
              </span>
            </div>
            <div className="title">
              <h1>My List</h1>
              <Link to="/createpost">
                {" "}
                <button>Create New Post</button>
              </Link>
            </div>
            {userPost.length !== 0 ? (
              <div className="list">
                {userPost.map((item) => (
                  <Card key={item._id} item={item} />
                ))}
              </div>
            ) : (
              <div>No Data</div>
            )}
            <div className="title">
              <h1>Saved List</h1>
            </div>
            {savedPosts.length !== 0 ? (
              <div className="list">
                {savedPosts.map((item) => (
                  <Card key={item._id} item={item} />
                ))}
              </div>
            ) : (
              <div>No Saved Posts</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
