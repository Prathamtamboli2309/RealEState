import "./newPostPage.scss";
import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

function NewPostPage() {
  const { loginUserData } = useAppContext();
  const [images, setImages] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    address: "",
    description: "",
    city: "",
    bedroomNumber: 1,
    bathroomNumber: 1,
    latitude: "",
    longitude: "",
    type: "rent",
    property: "apartment",
    utilitiesPolicy: "owner",
    petPolicy: "allowed",
    incomePolicy: "",
    totalSize: 0,
    school: 0,
    bus: 0,
    restaurant: 0,
    userEmail: loginUserData.email,
  });

  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    images.forEach((image, index) => {
      form.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/newpost",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created successfully:", response.data);
      navigate("/profile"); // Navigate to the profile page on success
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="userEmail">Email</label>
              <input
                id="userEmail"
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="item description">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bedroomNumber">Bedroom Number</label>
              <input
                min={1}
                id="bedroomNumber"
                name="bedroomNumber"
                type="number"
                value={formData.bedroomNumber}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bathroomNumber">Bathroom Number</label>
              <input
                min={1}
                id="bathroomNumber"
                name="bathroomNumber"
                type="number"
                value={formData.bathroomNumber}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                name="latitude"
                type="text"
                value={formData.latitude}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                name="longitude"
                type="text"
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select
                name="property"
                value={formData.property}
                onChange={handleChange}
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilitiesPolicy">Utilities Policy</label>
              <select
                name="utilitiesPolicy"
                value={formData.utilitiesPolicy}
                onChange={handleChange}
              >
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="petPolicy">Pet Policy</label>
              <select
                name="petPolicy"
                value={formData.petPolicy}
                onChange={handleChange}
              >
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="incomePolicy">Income Policy</label>
              <input
                id="incomePolicy"
                name="incomePolicy"
                type="text"
                value={formData.incomePolicy}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="totalSize">Total Size (sqft)</label>
              <input
                min={0}
                id="totalSize"
                name="totalSize"
                type="number"
                value={formData.totalSize}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input
                min={0}
                id="school"
                name="school"
                type="number"
                value={formData.school}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input
                min={0}
                id="bus"
                name="bus"
                type="number"
                value={formData.bus}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                min={0}
                id="restaurant"
                name="restaurant"
                type="number"
                value={formData.restaurant}
                onChange={handleChange}
              />
            </div>
            <div className="item">
              <label htmlFor="images">Images</label>
              <input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </div>
            <button className="sendButton" type="submit">
              Add Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;
