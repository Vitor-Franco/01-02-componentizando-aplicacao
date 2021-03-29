import { useEffect, useState } from 'react';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { Header } from './components/Header';

import { api } from './services/api';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';

// Interface com as Informações de cada genêro
export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

// Interface com as Informações de cada Filme
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
  // Inicia um estado para o genêro de filme selecionado, iniciando com o 1
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  // Seleciona o genero conforme clicamos nos botões
  // Salva no estado o genero clicado
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    try {
      // Solicita via axios os 'genres' da nossa Fake API.
      // Salva os dados no estado de *Genres.
      api.get<GenreResponseProps[]>('genres').then((response) => {
        setGenres(response.data);
      });
    } catch (err) {
      // Se houver algum problema com a solicitação, dispara um erro
      throw new Error(err);
    }
  }, []);

  useEffect(() => {
    try {
      setLoading(true);

      // Solicita via axios os dados de Generos e Filmes conforme o nosso estado de "Genero Selecionado" muda.
      // Porém dessa vez, utilizando parametros nas requisições
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
      // Se houver algum problema com a solicitação, dispara um erro
      throw new Error(err);
    } finally {
      // Por fim, o estado de carregamento recebe false
      setLoading(false);
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
