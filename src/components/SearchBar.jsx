import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ initialQuery = "", onSearch }) {
  const [input, setInput] = useState(initialQuery);

  // Sync internal input state when URL parameter changes (e.g., browser back/forward)
  useEffect(() => {
    setInput(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search__input"
        placeholder="Search for movies (e.g. Matrix, Batman)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="search__btn" aria-label="Search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}