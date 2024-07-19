/* eslint-disable */

import { useState } from "react";

function Navbar({query,setQuery,movies}) {
 
  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          {/* <span className="logo-icon" role="img" aria-label="popcorn">
            🍿
          </span> */}
          <h1 className="logo-text">
            Pop<span className="highlight">corn</span>
          </h1>
        </div>

        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        
        />
        <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
      </nav>
    </>
  );
}

export default Navbar;
