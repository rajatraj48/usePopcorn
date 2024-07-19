import StarRating from "./StarRating";

/* eslint-disable */
function MovieDetails({ selectedId, handleMovieClose,movieDetail}) {
  return (
    <>
      <div className="details">
        <header>
        <button className="btn-back" onClick={handleMovieClose}>
        &larr; 
        </button>
        <img src={movieDetail.Poster}></img>
        <div className="details-overview">
        <h2>{movieDetail.Title}</h2>
        <p>{movieDetail.Released} &bull; {movieDetail.Runtime}</p>
        <p>{movieDetail.Genre}</p>
        <p><span>🌟</span>{movieDetail.imdbRating} IMDb rating</p>
        </div>
        </header>
       <section>
        <div className="rating"><StarRating/></div>
        <p><em>{movieDetail.Plot}</em></p>
       <p>Starring {movieDetail.Actors}</p>
       <p>Directed by {movieDetail.Director}</p>
       </section>
      </div>
    </>
  );
}

export default MovieDetails;
