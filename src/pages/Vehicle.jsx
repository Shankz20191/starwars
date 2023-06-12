import axios from "axios";
import { useLoaderData } from "react-router-dom";
import FilmComponent from "../components/FilmComponent";
import CharacterComponents from "../components/CharactersComponent";
import { useQuery } from "@tanstack/react-query";

const url = "https://swapi.dev/api/vehicles/";

const singleVehicleQuery = (id) => {
  return {
    queryKey: ["vehicle", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleVehicleQuery(id));
    return { id };
  };

const Vehicle = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleVehicleQuery(id));
  return (
    <section className="box">
      <div className="box-header">
        <h1>{data.name}</h1>
      </div>
      <div className="box-container">
        <h1>Films</h1>
        <div className="box-container-container">
          {data.films.map((character) => {
            return <FilmComponent key={character} url={character} />;
          })}
        </div>
      </div>
      <div className="box-container">
        <h1>Pilots</h1>
        <div className="box-container-container">
          {data.pilots.map((character) => {
            return <CharacterComponents key={character} url={character} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Vehicle;
