import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import { BsSearch } from "react-icons/bs";

import "./Header.scss";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchAsyncMovies(searchTerm));
    dispatch(fetchAsyncShows(searchTerm));
    setSearchTerm("");
  };
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">MovieApp</div>
      </Link>
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit">
            <BsSearch />
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
}

export default Header;
