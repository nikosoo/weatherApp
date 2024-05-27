import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center pt-2"
    >
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleChange}
        className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:border-gray-500 opacity-60"
      />
      <button
        type="submit"
        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-r-md focus:outline-none"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
