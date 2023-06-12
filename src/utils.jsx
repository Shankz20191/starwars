import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const singleQuery = (url) => {
  return {
    queryKey: ["fetch", url],
    queryFn: async () => {
      const { data } = await axios.get(url);
      return data;
    },
  };
};

export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const { data: result } = useQuery(singleQuery(url));

  useEffect(() => {
    setData(result);
  }, [result]);
  return { data };
};
