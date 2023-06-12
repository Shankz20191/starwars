import { Link } from "react-router-dom";
import { useFetchData } from "../utils";

const PlanetsComponent = ({ url }) => {
  const { data } = useFetchData(url);
  const id = data?.url[data.url.length - 2];
  return (
    <Link to={`/planet/${id}`} style={{ display: "block" }}>
      {data?.name}
    </Link>
  );
};

export default PlanetsComponent;
