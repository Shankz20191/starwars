import { Link } from "react-router-dom";
import { useFetchData } from "../utils";

const FilmComponent = ({ url }) => {
  const { data } = useFetchData(url);
  const id = data?.url[data.url.length - 2];
  return (
    <div className="box-component">
      <h3>{data?.title}</h3>
      <p>Directed By: {data?.director}</p>
      <p>Release Date: {data?.release_date}</p>
      <Link to={`/films/${id}`} style={{ display: "block" }}>
        <button className="btn">Details</button>
      </Link>
    </div>
  );
};

export default FilmComponent;
