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
    console.log("vehicle");
    const { id } = params;
    await queryClient.ensureQueryData(singleVehicleQuery(id));
    return { id };
  };

const Vehicle = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleVehicleQuery(id));
  return (
    <section>
      <h1>{data.name}</h1>
      <div>
        <h1>Films</h1>
        {data.films.map((character) => {
          return <FilmComponent key={character} url={character} />;
        })}
      </div>
      <div>
        <h1>Pilots</h1>
        {data.pilots.map((character) => {
          return <CharacterComponents key={character} url={character} />;
        })}
      </div>
    </section>
  );
};

export default Vehicle;
