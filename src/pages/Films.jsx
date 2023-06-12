import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CharacterComponents from "../components/CharactersComponent";
import PlanetsComponent from "../components/PlanetsComponent";
import SpeciesComponent from "../components/SpeciesComponent";
import StarshipsComponent from "../components/StarshipsComponent";
import { useQuery } from "@tanstack/react-query";

const url = "https://swapi.dev/api/films/";

const singleFilmQuery = (id) => {
  return {
    queryKey: ["films", id],
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
    await queryClient.ensureQueryData(singleFilmQuery(id));
    return { id };
  };

const Films = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleFilmQuery(id));

  return (
    <section>
      <div>
        <h1>Characters</h1>
        {data.characters.map((character) => {
          return <CharacterComponents key={character} url={character} />;
        })}
      </div>
      <div>
        <h1>Planets</h1>
        {data.planets.map((planet) => {
          return <PlanetsComponent key={planet} url={planet} />;
        })}
      </div>
      <div>
        <h1>Species</h1>
        {data.species.map((item) => {
          return <SpeciesComponent key={item} url={item} />;
        })}
      </div>
      <div>
        <h1>Starships</h1>
        {data.starships.map((item) => {
          return <StarshipsComponent key={item} url={item} />;
        })}
      </div>
    </section>
  );
};

export default Films;
