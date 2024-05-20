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
    git clone https://github.com/yourusername/realestate.git
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

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- 🙏 Thanks to the developers of Leaflet for their excellent mapping library.
- 🙏 Special thanks to the contributors of the MERN stack components.
- 🙏 Thanks to Cloudinary for providing image storage solutions.
- 🙏 Additional thanks to any third-party libraries and resources used in this project.
