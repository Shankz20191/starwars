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
  const { data, isFetching } = useQuery(singleSpeciesQuery(id));

  return isFetching ? (
    <div className="loader-container">
      <div className="loading"></div>
    </div>
  ) : (
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
        <h1>People</h1>
        <div className="box-container-container">
          {data.people.map((character) => {
            return <CharacterComponents key={character} url={character} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Species;
