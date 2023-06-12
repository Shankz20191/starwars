import axios from "axios";
import { useLoaderData } from "react-router-dom";
import FilmComponent from "../components/FilmComponent";
import SpeciesComponent from "../components/SpeciesComponent";
import StarshipsComponent from "../components/StarshipsComponent";
import VehicleComponent from "../components/VehicleComponent";
import { useQuery } from "@tanstack/react-query";

const url = "https://swapi.dev/api/people/";

const singlePeopleQuery = (id) => {
  return {
    queryKey: ["people", id],
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
    await queryClient.ensureQueryData(singlePeopleQuery(id));
    return { id };
  };

const People = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singlePeopleQuery(id));
  return (
    <section>
      <h1>{data.name}</h1>
      <div>
        <h1>Films</h1>
        {data.films.map((character) => {
          return <FilmComponent key={character} url={character} />;
        })}
      </div>
      {data.species.length !== 0 ? (
        <div>
          <h1>Species</h1>
          {data.species.map((character) => {
            return <SpeciesComponent key={character} url={character} />;
          })}
        </div>
      ) : null}
      <div>
        <h1>Starship</h1>
        {data.starships.map((character) => {
          return <StarshipsComponent key={character} url={character} />;
        })}
      </div>
      <div>
        <h1>Vehicles</h1>
        {data.vehicles.map((character) => {
          return <VehicleComponent key={character} url={character} />;
        })}
      </div>
    </section>
  );
};

export default People;
