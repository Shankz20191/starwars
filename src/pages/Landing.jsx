import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";

const url = "https://swapi.dev/api/films";

const singleLandingQuery = (id) => {
  return {
    queryKey: ["landing", id],
    queryFn: async () => {
      const { data } = await axios.get(`${url}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleLandingQuery(id));
    return { id };
  };

const Landing = () => {
  const { id } = useLoaderData();
  const { data, isFetching } = useQuery(singleLandingQuery(id));

  return isFetching ? (
    <div className="loader-container">
      <div className="loading"></div>
    </div>
  ) : (
    <section className="landing">
      {data?.results.map((film) => {
        const id = film.url;
        return (
          <div className="landing-box" key={film.title}>
            <h3>{film.title}</h3>
            <p>{film.director}</p>
            <p>{film.release_date}</p>
            <Link
              to={`/films/${id[id.length - 2]}`}
              style={{ display: "block" }}
            >
              <button className="btn">{film.title}</button>
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default Landing;
