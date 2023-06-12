import axios from "axios";
import { useLoaderData } from "react-router-dom";
import FilmComponent from "../components/FilmComponent";
import CharacterComponents from "../components/CharactersComponent";
import { useQuery } from "@tanstack/react-query";

const url = "https://swapi.dev/api/planets/";

const singlePlanetQuery = (id) => {
  return {
    queryKey: ["planet", id],
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
    await queryClient.ensureQueryData(singlePlanetQuery(id));
    return { id };
  };

const Planet = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singlePlanetQuery(id));
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
        <h1>Residents</h1>
        {data.residents.map((character) => {
          return <CharacterComponents key={character} url={character} />;
        })}
      </div>
    </section>
  );
};

export default Planet;
