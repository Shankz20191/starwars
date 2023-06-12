import { Link } from "react-router-dom";
import { useFetchData } from "../utils";

const CharacterComponents = ({ url }) => {
  const { data } = useFetchData(url);

  console.log(data);

  const id = data?.url[data.url.length - 2];
  return (
    <div className="films-character">
      <h3>{data?.name}</h3>
      <p>{data?.gender}</p>
      <p>{data?.birth_year}</p>
      <Link to={`/people/${id}`} style={{ display: "block" }}>
        <button className="btn">Details..</button>
      </Link>
    </div>
  );
};

export default CharacterComponents;
