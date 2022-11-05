import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { castRequest } from '../components/api';
import { CastList, NoImage } from './Cast.styles';
import { Catalog } from 'components/Loader';

//  компонент Cast, інформація про акторський склад. Рендериться на сторінці MovieDetails.

const Cast = () => {
  const { movieId } = useParams();
  const [castInfo, setCastInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    (async function castInfo() {
      const res = await castRequest(movieId);
      setCastInfo(res.data.cast);
      setIsLoading(false);
    })();

    return () => {
      // second
    };
  }, [movieId]);

  return (
    <>
      {isLoading && <Catalog />}
      {!isLoading && (
        <CastList>
          {castInfo.map(({ id, character, name, profile_path }) => {
            return (
              <li key={id}>
                {profile_path ? (
                  <img
                    src={'https://image.tmdb.org/t/p/w500' + profile_path}
                    alt={name}
                    width={200}
                  ></img>
                ) : (
                  <NoImage>Image not find</NoImage>
                )}
                <p>
                  <b>Character: </b>
                  {character}
                </p>
                <p>
                  <b>Name:</b> {name}
                </p>
              </li>
            );
          })}
        </CastList>
      )}
      {!isLoading && castInfo.length === 0 && (
        <div>We don`t have information for this movie</div>
      )}
    </>
  );
};

export default Cast;
