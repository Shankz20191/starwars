import { Link } from "react-router-dom";
import { useFetchData } from "../utils";

const SpeciesComponent = ({ url }) => {
  const { data } = useFetchData(url);
  const id = data?.url[data.url.length - 2];
  return (
    <div className="box-component">
      <h3>{data?.name}</h3>
      <p>Life span: {data?.average_lifespan}</p>
      <p>Language: {data?.language}</p>
      <Link to={`/species/${id}`} style={{ display: "block" }}>
        <button className="btn">Details..</button>
      </Link>
    </div>
  );
};

export default SpeciesComponent;
