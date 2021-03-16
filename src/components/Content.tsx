import { MovieCard } from './MovieCard';
import { MovieProps } from '../App';
interface ContentProps {
  movies: MovieProps[];
}

export function Content({ movies }: ContentProps) {
  return (
    <main>
      <div className="movies-list">
        {movies.map((movie) => (
          <MovieCard
            title={movie.Title}
            poster={movie.Poster}
            runtime={movie.Runtime}
            rating={movie.Ratings[0].Value}
          />
        ))}
      </div>
    </main>
  );
}
