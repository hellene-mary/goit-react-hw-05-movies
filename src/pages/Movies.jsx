import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

import { Container, Form, MoviesList } from '../components/Layout.styles';
import { moviesQueryRequest } from '../components/api';

// сторінка пошуку кінофільмів за ключовим словом.

const Movies = () => {
  // const [query, setQuery] = useState('');
  const [moviesFound, setMoviesFound] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search');
  const location = useLocation();

  function handlerQuery(evt) {
    evt.preventDefault();

    const form = evt.currentTarget;
    const searchQuery = form.elements.search.value;

    setSearchParams({ search: searchQuery });

    form.reset();
  }

  useEffect(() => {
    if (!query) {
      return;
    }
    (async function searchMovies() {
      const res = await moviesQueryRequest(query);
      const movies = res.data.results;
      if (movies.length === 0) {
        console.log('Not result');
        return;
      }
      setMoviesFound(movies);
    })(query);
    return () => {
      // second
    };
  }, [query]);

  return (
    <Container>
      <Form onSubmit={handlerQuery}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        ></input>
        <button type="submit">Search</button>
      </Form>
      {query && (
        <MoviesList>
          {moviesFound.map(({ id, name, title }) => (
            <li key={id}>
              <Link to={`${id}`} state={{ from: location }} key={id}>
                {title} {name}
              </Link>
            </li>
          ))}
        </MoviesList>
      )}
    </Container>
  );
};

export default Movies;
