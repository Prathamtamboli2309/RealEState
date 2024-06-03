import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import SaveButton from "../../components/buttons/SaveButton";
import RemoveButton from "../../components/buttons/RemovwButton";
import { useAppContext } from "../../Context/AppContext";
import "./singlePage.scss";

function SinglePage() {
  const { id } = useParams();
  const { userProfile, getuserData } = useAppContext();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:4000/api/users/post/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setCardData(data);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCardData();
  }, [id]);

  const handleSavePlace = async () => {
    const userId = userProfile._id;
    const placeId = cardData._id;

    try {
      const response = await fetch(
        `http://localhost:4000/api/users/savelikepost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            placeId: placeId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save place");
      }

      getuserData(userProfile.email);
      console.log("Place saved successfully!");
    } catch (error) {
      console.error("Error saving place:", error);
    }
  };

  const handleRemovePlace = async () => {
    const userId = userProfile._id;
    const placeId = cardData._id;

    try {
      const response = await fetch(
        `http://localhost:4000/api/users/removefromsave`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            placeId: placeId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove place");
      }

      getuserData(userProfile.email);
      console.log("Place removed successfully!");
    } catch (error) {
      console.error("Error removing place:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={cardData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{cardData.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{cardData.address}</span>
                </div>
                <div className="price">$ {cardData.price}</div>
              </div>
              <div className="user">
                <img src={cardData.user[0].avatar} alt="" />
                <span>{cardData.user[0].email}</span>
              </div>
            </div>
            <div className="bottom">{cardData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{cardData.petPolicy}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{cardData.totalSize} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>2 Bedroom</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>1 Bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{cardData.school} m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{cardData.bus} m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{cardData.restaurant} m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[cardData]} />
          </div>
          <div className="buttons">
            {userProfile.savePost.includes(cardData._id) ? (
              <RemoveButton handleRemovePlace={handleRemovePlace} />
            ) : (
              <SaveButton handleSavePlace={handleSavePlace} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
