import { Button } from './Button';
import { GenreResponseProps } from '../App';
interface PropsSideBar {
  genres: GenreResponseProps[];
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({
  genres,
  handleClickButton,
  selectedGenreId,
}: PropsSideBar) {
  return (
    <div className="cover-sidebar">
      <nav className="sidebar">
        <span>
          Watch<p>Me</p>
        </span>

        <div className="buttons-container">
          {genres.map((genre) => (
            <Button
              id={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}
