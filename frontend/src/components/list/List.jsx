import "./list.scss";
import Card from "../Card/Card";
import { listData } from "../../lib/dummydata";

function List({ data }) {
  return (
    <div className="list">
      {loading ? (
        <div className="loader">
          <img src={loaderGif} alt="Loading..." width="100px" height="100px" />
        </div>
      ) : (
        <div>
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default List;
