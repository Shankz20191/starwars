import { Link } from "react-router-dom";
import { useFetchData } from "../utils";

const StarshipsComponent = ({ url }) => {
  const { data } = useFetchData(url);
  const id = data?.url[data.url.length - 2];
  return (
    <Link to={`/starship/${id}`} style={{ display: "block" }}>
      {data?.name}
    </Link>
  );
};

export default StarshipsComponent;
