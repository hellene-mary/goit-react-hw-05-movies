import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

import { Container, Form, MoviesList } from '../components/Layout.styles';
import { moviesQueryRequest } from '../components/api';

// сторінка пошуку кінофільмів за ключовим словом.

const Movies = () => {
  const [moviesFound, setMoviesFound] = useState([]);
  const [noResult, setNoResult] = useState(false);
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
    setNoResult(false);
    if (!query) {
      return;
    }
    (async function searchMovies() {
      const res = await moviesQueryRequest(query);
      const movies = res.data.results;
      if (movies.length === 0) {
        // console.log('Not result');
        setNoResult(true);
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
      {query && !noResult && (
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
      {noResult && <div>Sorry, there are no results for your query!</div>}
    </Container>
  );
};

export default Movies;
