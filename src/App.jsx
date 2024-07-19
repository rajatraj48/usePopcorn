import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import MainBody from "./component/MainBody";

/* eslint-disable */

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [movieDetail,setMovieDetail] = useState([]);
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);
  const Key = "914fb139";
  useEffect(() => {
    // Define the async function to fetch data
    if (query.length === 0) {
      setMovies([]);
    } else {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${Key}&s=${query}`
          );
          const data = await response.json();

          if (data.Response === "True") {
            setMovies(data.Search);
            console.log(data.Search);
            setIsLoading(false);
          } else {
            console.error("Error fetching data1:", data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching datas:", error.message);
        }
      };

      // Call the fetch function
      fetchData();
    }

    // Optional cleanup function
    return () => {
      console.log("Component will unmount");
    };
  }, [query]);

  const handleMovieClick = async (id) => {
    console.log("Movie ID:", id);
    setSelectedId(id);
    setIsLoadingMovie(true)
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${Key}&i=${id}`);
      const data = await response.json();
      setMovieDetail(data);
      setIsLoadingMovie(false)
      console.log("Movie Details:", data);
     // setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error.message);
    }
  };

  function handleMovieClose(){
    setSelectedId(null)
  }

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies}></Navbar>
      <MainBody
        movies={movies}
        average={average}
        watched={watched}
        isLoading={isLoading}
        selectedId={selectedId}
        handleMovieClick={handleMovieClick}
        handleMovieClose={handleMovieClose}
        movieDetail={movieDetail}
       
      ></MainBody>
    </>
  );
}

export default App;
