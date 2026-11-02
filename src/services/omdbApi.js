const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "e0822fdd";
const BASE_URL = "https://www.omdbapi.com/";

/**
 * Fetch movies by search keyword
 */
export async function fetchMoviesBySearch(searchTerm) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: searchTerm.trim(),
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error("Network error occurred while fetching movies.");
  }
  return response.json();
}

/**
 * Fetch detailed movie information by IMDb ID
 */
export async function fetchMovieById(imdbId) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    i: imdbId,
    plot: "full",
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error("Network error occurred while fetching movie details.");
  }
  return response.json();
}