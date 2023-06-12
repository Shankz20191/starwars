import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const HomeLayout = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };
  return (
    <>
      <nav>
        <section>Star Wars Info</section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </nav>
      <Outlet />
    </>
  );
};

export default HomeLayout;
