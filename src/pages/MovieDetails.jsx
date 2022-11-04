import { Suspense, useState, useEffect, useRef } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi';

import {
  Container,
  MoreInfoLink,
  MoreInfoList,
  Box,
  GoBack,
} from './../components/Layout.styles';
import { movieInfoRequest } from '../components/api';
import { AboutMovie } from '../components/AboutMovie';

// /сторінка з детальною інформацією про кінофільм
// !add spiner
const MovieDetails = () => {
  const [movieInfo, setMovieInfo] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  // const backLinkHref = location.state?.from ?? '/';
  const backLinkHref = useRef(location.state?.from);
  console.log('backLinkHref', backLinkHref);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    (async function aboutMovie() {
      const res = await movieInfoRequest(movieId);
      if (res.data.length === 0) {
        return;
      }
      setMovieInfo(res.data);
    })();

    return () => {
      // second
    };
  }, [movieId]);

  return (
    <Container>
      <GoBack to={backLinkHref.current ?? '/'}>
        <HiChevronLeft />
        Go back
      </GoBack>

      <AboutMovie movieInfo={movieInfo} />

      <Box>
        <p>Additional information</p>
        <MoreInfoList>
          <li>
            <MoreInfoLink to={'cast'}>Cast</MoreInfoLink>
          </li>
          <li>
            <MoreInfoLink to={'reviews'}>Reviews</MoreInfoLink>
          </li>
        </MoreInfoList>
      </Box>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default MovieDetails;
