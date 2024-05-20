import Filter from "../../components/filter/Filter";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";

function HomePage() {
  return (
    <div>
      <div className="homePage">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
            <p>
              Discover the best real estate opportunities and make your dream
              home a reality with our comprehensive search tool. Whether you're
              looking to buy or rent, our platform provides an extensive
              database of properties to suit all your needs. Easily search by
              type, location, and price range to find the perfect place that
              matches your preferences and budget.
            </p>
            <p>
              Our user-friendly interface and advanced filtering options make it
              simple to navigate through a variety of listings. From cozy
              apartments to luxurious villas, we offer a wide range of choices
              to cater to every taste and lifestyle. Explore properties in prime
              locations and upcoming neighborhoods, and stay updated with the
              latest market trends and prices.
            </p>
            <p>
              With detailed property descriptions, high-quality images, and
              virtual tours, you can get a real sense of each property before
              scheduling a visit. Our dedicated team of real estate
              professionals is here to guide you through every step of the
              process, ensuring a smooth and hassle-free experience
            </p>
            <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
              <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
              </div>
              <div className="box">
                <h1>2000+</h1>
                <h2>Property Ready</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="imgContainer">
          <img src="/bg.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
