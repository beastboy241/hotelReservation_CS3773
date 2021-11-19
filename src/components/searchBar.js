import React from "react";
import { useState } from "react";
import "../css/styles.css";

const _searchBar = () => {
  const [query, setQuery] = useState("");
  return (
    <input
      className="searchBar"
      key="random1"
      value={query}
      placeholder={"search hotel..."}
      onChange={(event) => setQuery(event.target.value)}
    />
  );
};

export default _searchBar;
