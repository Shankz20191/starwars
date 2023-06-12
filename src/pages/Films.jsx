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
  const { data, isFetching } = useQuery(singleFilmQuery(id));

  return isFetching ? (
    <div className="loader-container">
      <div className="loading"></div>
    </div>
  ) : (
    <section className="box">
      <div className="box-header">
        <h1>{data.title}</h1>
        <h5>Directed By: {data.director}</h5>
        <h6>Release Date: {data.release_date}</h6>

        <p>{data.opening_crawl}</p>
      </div>
      <div className="box-container">
        <h1>Characters</h1>
        <div className="box-container-container">
          {data.characters.map((character) => {
            return <CharacterComponents key={character} url={character} />;
          })}
        </div>
      </div>
      <div className="box-container">
        <h1>Planets</h1>
        <div className="box-container-container">
          {data.planets.map((planet) => {
            return <PlanetsComponent key={planet} url={planet} />;
          })}
        </div>
      </div>
      <div className="box-container">
        <h1>Species</h1>
        <div className="box-container-container">
          {data.species.map((item) => {
            return <SpeciesComponent key={item} url={item} />;
          })}
        </div>
      </div>
      <div className="box-container">
        <h1>Starships</h1>
        <div className="box-container-container">
          {data.starships.map((item) => {
            return <StarshipsComponent key={item} url={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Films;
