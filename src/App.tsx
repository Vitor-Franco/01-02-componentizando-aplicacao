import { useEffect, useState } from 'react';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { Header } from './components/Header';

import { api } from './services/api';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    try {
      setLoading(!loading);
      api.get<GenreResponseProps[]>('genres').then((response) => {
        setGenres(response.data);
      });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(!loading);
    }
  }, []);

  useEffect(() => {
    try {
      setLoading(!loading);
      api
        .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
        .then((response) => {
          setMovies(response.data);
        });

      api
        .get<GenreResponseProps>(`genres/${selectedGenreId}`)
        .then((response) => {
          setSelectedGenre(response.data);
        });
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(!loading);
    }
  }, [selectedGenreId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        loading={loading}
        genres={genres}
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />

      <div className="container">
        <Header>{selectedGenre.title}</Header>

        <Content movies={movies} loading={loading} />
      </div>
    </div>
  );
}
