import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CharacterComponents from "../components/CharactersComponent";
import FilmComponent from "../components/FilmComponent";
import { useQuery } from "@tanstack/react-query";

const url = "https://swapi.dev/api/starships/";

const singleStarshipQuery = (id) => {
  return {
    queryKey: ["starship", id],
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
    await queryClient.ensureQueryData(singleStarshipQuery(id));
    return { id };
  };

const Starship = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleStarshipQuery(id));
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

export default Starship;
