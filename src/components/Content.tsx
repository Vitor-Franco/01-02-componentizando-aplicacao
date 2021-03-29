import { MovieCard } from './MovieCard';
import { MovieProps } from '../App';
interface ContentProps {
  movies: MovieProps[];
  loading: boolean;
}

export function Content({ movies, loading }: ContentProps) {
  return (
    <main>
      <div className="movies-list">
        {/* se estiver carregando, retornamos loading, se não, retornamos o conteúdo com as respectivas informações */}
        {loading ? (
          <span className="loader">Loading...</span>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.Title}
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
