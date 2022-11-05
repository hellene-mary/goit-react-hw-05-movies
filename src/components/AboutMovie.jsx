import { Container } from './AboutMovie.styles';
import PropTypes from 'prop-types';

export const AboutMovie = ({ movieInfo }) => {
  const {
    title,
    original_title,
    overview = 'There is no overview',
    popularity,
    genres = [],
    poster_path,
    status,
  } = movieInfo;

  return (
    <Container>
      {poster_path ? (
        <img
          src={'https://image.tmdb.org/t/p/w500' + poster_path}
          alt="poster"
        ></img>
      ) : (
        <div>No image</div>
      )}
      <div>
        <h1>
          {title}/{original_title}
        </h1>
        <p>User Scote: {Math.round(popularity)} %</p>
        <p>{status}</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        <h2>Genres</h2>
        <ul>
          {genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

AboutMovie.propTypes = {
  movieInfo: PropTypes.shape({
    title: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    genres: PropTypes.array,
    poster_path: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
