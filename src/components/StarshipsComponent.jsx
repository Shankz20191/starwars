import { Link } from "react-router-dom";
import { useFetchData } from "../utils";

const StarshipsComponent = ({ url }) => {
  const { data } = useFetchData(url);
  const id = data?.url[data.url.length - 2];
  return (
    <div className="box-component">
      <h3>{data?.name}</h3>
      <p>Model: {data?.model}</p>
      <p>Hyperdrive Rating: {data?.hyperdrive_rating}</p>
      <Link to={`/starship/${id}`} style={{ display: "block" }}>
        <button className="btn">Details..</button>
      </Link>
    </div>
  );
};

export default StarshipsComponent;
