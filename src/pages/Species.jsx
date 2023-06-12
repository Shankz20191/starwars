import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CharacterComponents from "../components/CharactersComponent";
import FilmComponent from "../components/FilmComponent";
import { useQuery } from "@tanstack/react-query";

const url = "https://swapi.dev/api/species/";

const singleSpeciesQuery = (id) => {
  return {
    queryKey: ["species", id],
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
    await queryClient.ensureQueryData(singleSpeciesQuery(id));
    return { id };
  };

const Species = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleSpeciesQuery(id));

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
        <h1>People</h1>
        {data.people.map((character) => {
          return <CharacterComponents key={character} url={character} />;
        })}
      </div>
    </section>
  );
};

export default Species;
