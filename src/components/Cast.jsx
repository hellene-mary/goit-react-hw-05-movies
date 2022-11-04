import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { castRequest } from '../components/api';
import { CastList, NoImage } from './Cast.styles';

//  компонент Cast, інформація про акторський склад. Рендериться на сторінці MovieDetails.

const Cast = () => {
  const { movieId } = useParams();
  const [castInfo, setCastInfo] = useState([]);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    (async function castInfo() {
      const res = await castRequest(movieId);
      setCastInfo(res.data.cast);
    })();

    return () => {
      // second
    };
  }, [movieId]);

  // const { character, name, profile_path } = castInfo;

  return (
    <>
      {castInfo.length === 0 ? (
        <div>We don`t have information for this movie</div>
      ) : (
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
    </>
  );
};

export default Cast;
