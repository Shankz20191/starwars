import { Link } from "react-router-dom";
import { useFetchData } from "../utils";

const VehicleComponent = ({ url }) => {
  const { data } = useFetchData(url);
  const id = data?.url[data.url.length - 2];
  return (
    <div className="box-component">
      <h3>{data?.name}</h3>
      <p>Model: {data?.model}</p>
      <p>Max Speed: {data?.max_atmosphering_speed}</p>
      <Link to={`/vehicle/${id}`} style={{ display: "block" }}>
        <button className="btn">Details..</button>
      </Link>
    </div>
  );
};

export default VehicleComponent;
