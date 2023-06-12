import { Link } from "react-router-dom";
import { useFetchData } from "../utils";

const PlanetsComponent = ({ url }) => {
  const { data } = useFetchData(url);
  const id = data?.url[data.url.length - 2];
  return (
    <div className="box-component">
      <h3>{data?.name}</h3>
      <p>Population: {data?.population}</p>
      <p>Terrain: {data?.terrain}</p>
      <Link to={`/planet/${id}`} style={{ display: "block" }}>
        <button className="btn">Details..</button>
      </Link>
    </div>
  );
};

export default PlanetsComponent;
