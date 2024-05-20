import { useState, useEffect } from "react";
import axios from "axios";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/Card/Card";
import Map from "../../components/map/Map";
import { useAppContext } from "../../Context/AppContext";
import Loader from "../../components/Loader";

function ListPage() {
  const { postdata, setpostData } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  const fetchpostData = async (filters = {}) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/post/search",
        filters
      );
      console.log(response.data);
      setpostData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchpostData();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (filters) => {
    setIsLoading(true);
    fetchpostData(filters);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="listPage">
          <div className="listContainer">
            <div className="wrapper">
              <Filter onSearch={handleSearch} />
              <div>
                {postdata.length == 0 ? (
                  <div>No Data</div>
                ) : (
                  <div>
                    {postdata.map((item) => (
                      <Card key={item._id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mapContainer">
            <Map items={postdata} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListPage;
