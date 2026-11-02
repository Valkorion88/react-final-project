export default function FilterSelect({ filter, onFilterChange }) {
  return (
    <div className="filter-wrapper">
      <label htmlFor="movie-filter">Sort:</label>
      <select
        id="movie-filter"
        className="filter__select"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="DEFAULT">Default</option>
        <option value="A_TO_Z">A - Z</option>
        <option value="Z_TO_A">Z - A</option>
        <option value="NEW_TO_OLD">Newest</option>
        <option value="OLD_TO_NEW">Oldest</option>
      </select>
    </div>
  );
}