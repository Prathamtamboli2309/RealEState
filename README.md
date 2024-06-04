# 🏡 RealEstate

## Description

RealEstate is a modern web application designed to facilitate property listings and searches. Leveraging a beautiful and intuitive UI, users can browse, list, save, and view properties with ease. The application integrates Leaflet maps to display property locations, enhancing the user experience with visual geolocation data. Built with the MERN stack (MongoDB, Express.js, React, and Node.js), RealEstate offers robust performance and scalability for real estate management. The project uses RESTful API endpoints to handle communication between the frontend and backend.

## Features

- 🏘️ **Property Listings**: Users can add, update, and delete property listings.
- 🗺️ **Interactive Maps**: Display property locations using Leaflet maps for an enhanced visual experience.
- 🔒 **User Authentication**: Secure user registration and login functionality.
- 📱 **Responsive Design**: Accessible on both desktop and mobile devices.
- 🔍 **Search Functionality**: Easily search and filter properties based on various criteria.
- 💾 **Save Property**: Users can save properties to their favorites list for easy access later.
- 🌟 **Beautiful UI**: Clean and modern interface for an optimal user experience.
- 📷 **Image Storage**: Store property images and user avatars using Cloudinary.

## Technologies Used

- **Frontend**: React, Leaflet
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **UI Framework**: Tailwind CSS (or any other UI framework used)
- **Image Storage**: Cloudinary
- **API**: RESTful API

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- 🟢 Node.js
- 🍃 MongoDB
- 📦 npm (Node Package Manager) or yarn

### Instructions

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Prathamtamboli2309/RealEState.git
    cd realestate
    ```

2. **Install backend dependencies:**

    ```sh
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**

    ```sh
    cd ../frontend
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

5. **Run the application:**

    Open two terminal windows or tabs:

    - In the first terminal, start the backend server:

      ```sh
      cd backend
      npm start
      ```

    - In the second terminal, start the frontend development server:

      ```sh
      cd frontend
      npm start
      ```

    The application should now be running, with the backend server on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## Usage

1. **🔐 Register/Login**: Create an account or log in with existing credentials.
2. **🏠 Browse Properties**: View property listings on the homepage or search for specific properties.
3. **➕ Add a Property**: Use the "Add Property" form to list a new property.
4. **🗺️ View Property Location**: Click on a property to see its location on the map.
5. **💾 Save Property**: Click on the save icon to add properties to your favorites list for easy access later.
6. **✏️ Edit/Delete Property**: If you are the owner of a property, you can edit or delete your listings.

## ScreenShots

![Screenshot (77)](https://github.com/Prathamtamboli2309/RealEState/assets/142076673/5811efa0-0298-4d61-a588-0e23cee979e5)
![Screenshot (78)](https://github.com/Prathamtamboli2309/RealEState/assets/142076673/e44a6c5f-090e-498f-ad6c-c6cfbf7ae7c3)
![Screenshot (79)](https://github.com/Prathamtamboli2309/RealEState/assets/142076673/2c0bc468-cb03-445d-987f-51b438aeb9eb)
![Screenshot (80)](https://github.com/Prathamtamboli2309/RealEState/assets/142076673/c512fcfc-0da0-4fe8-b8db-9910610b1f86)
![Screenshot (81)](https://github.com/Prathamtamboli2309/RealEState/assets/142076673/84f609f5-c098-4ccf-b339-6ae6d5d0596c)
![Screenshot (82)](https://github.com/Prathamtamboli2309/RealEState/assets/142076673/651b1839-cb88-491d-91f7-854dbfcb8f66)
![Screenshot (83)](https://github.com/Prathamtamboli2309/RealEState/assets/142076673/380bf22e-327a-4e1a-98c0-5cf35a95ec9f)

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.

## Acknowledgments

- 🙏 Thanks to the developers of Leaflet for their excellent mapping library.
- 🙏 Special thanks to the contributors of the MERN stack components.
- 🙏 Thanks to Cloudinary for providing image storage solutions.
- 🙏 Additional thanks to any third-party libraries and resources used in this project.
