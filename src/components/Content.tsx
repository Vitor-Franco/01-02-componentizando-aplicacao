import { MovieCard } from './MovieCard';
import { MovieProps } from '../App';
interface ContentProps {
  movies: MovieProps[];
  loading: boolean;
}

export function Content({ movies, loading }: ContentProps) {
  console.log(loading);

  return (
    <main>
      <div className="movies-list">
        {loading ? (
          <span className="loader">Loading...</span>
        ) : (
          movies.map((movie) => (
            <MovieCard
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))
        )}
      </div>
    </main>
  );
}
