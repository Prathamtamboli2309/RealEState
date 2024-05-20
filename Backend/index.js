const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors());

// connect to database
require("./config/database").dbConnect();
require("./config/cloudinary").cloudinaryConnect();
//import express json

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // Ensure this directory exists
  })
);
//route import and mount
const user = require("./routes/Users");
app.use("/api/users", user);

app.listen(process.env.PORT, () => {
  console.log("Listing....");
});
