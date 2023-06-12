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
  const { data } = useQuery(singleLandingQuery(id));

  return (
    <section>
      {data?.results.map((film) => {
        const id = film.url;
        return (
          <Link
            to={`/films/${id[id.length - 2]}`}
            key={film.title}
            style={{ display: "block" }}
          >
            {film.title}
          </Link>
        );
      })}
    </section>
  );
};

export default Landing;
