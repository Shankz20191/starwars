import { Link } from "react-router-dom";
import { useFetchData } from "../utils";

const FilmComponent = ({ url }) => {
  const { data } = useFetchData(url);
  const id = data?.url[data.url.length - 2];
  return (
    <Link to={`/films/${id}`} style={{ display: "block" }}>
      {data?.title}
    </Link>
  );
};

export default FilmComponent;
