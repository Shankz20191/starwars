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
      <nav className="nav-bar">
        <section className="logo">StarWars Info</section>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="form-input"
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </nav>
      <Outlet />
    </>
  );
};

export default HomeLayout;
