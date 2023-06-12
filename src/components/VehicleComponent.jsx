import { Link } from "react-router-dom";
import { useFetchData } from "../utils";

const VehicleComponent = ({ url }) => {
  const { data } = useFetchData(url);
  const id = data?.url[data.url.length - 2];
  return (
    <Link to={`/vehicle/${id}`} style={{ display: "block" }}>
      {data?.name}
    </Link>
  );
};

export default VehicleComponent;
