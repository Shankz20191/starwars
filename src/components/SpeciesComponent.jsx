import { Link } from "react-router-dom";
import { useFetchData } from "../utils";

const SpeciesComponent = ({ url }) => {
  const { data } = useFetchData(url);
  const id = data?.url[data.url.length - 2];
  return (
    <Link to={`/species/${id}`} style={{ display: "block" }}>
      {data?.name}
    </Link>
  );
};

export default SpeciesComponent;
