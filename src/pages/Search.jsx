import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import CharacterComponents from "../components/CharactersComponent";
import PlanetsComponent from "../components/PlanetsComponent";
import StarshipsComponent from "../components/StarshipsComponent";

const urlPeople = "https://swapi.dev/api/people/?search=";
const urlPlanet = "https://swapi.dev/api/planets/?search=";
const urlStarship = "https://swapi.dev/api/starships/?search=";

const searchQuery = (searchParam) => {
  return {
    queryKey: ["search", searchParam],
    queryFn: async () => {
      const { data: peopleData } = await axios.get(
        `${urlPeople}${searchParam}`
      );
      const { data: planetsData } = await axios.get(
        `${urlPlanet}${searchParam}`
      );
      const { data: starshipsData } = await axios.get(
        `${urlStarship}${searchParam}`
      );
      return { peopleData, planetsData, starshipsData };
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { searchParam } = params;
    await queryClient.ensureQueryData(searchQuery(searchParam));
    return { searchParam };
  };

const Search = () => {
  const { searchParam } = useLoaderData();
  const {
    data: { peopleData, planetsData, starshipsData },
  } = useQuery(searchQuery(searchParam));

  console.log(peopleData, planetsData, starshipsData);

  return (
    <section className="box">
      <div className="box-header">
        <h1>Search</h1>
      </div>
      <div className="box-container">
        <h1>People</h1>
        <div className="box-container-container">
          {peopleData?.results.map((person) => {
            return <CharacterComponents key={person.name} url={person.url} />;
          })}
        </div>
      </div>
      <div className="box-container">
        <h1>Planets</h1>
        <div className="box-container-container">
          {planetsData?.results.map((planet) => {
            return <PlanetsComponent key={planet.name} url={planet.url} />;
          })}
        </div>
      </div>
      <div className="box-container">
        <h1>Starships</h1>
        <div className="box-container-container">
          {starshipsData?.results.map((starship) => {
            return (
              <StarshipsComponent key={starship.name} url={starship.url} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Search;
