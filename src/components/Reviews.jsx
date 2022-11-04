import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { reviewsRequest } from '../components/api';
import { ReviewsInfoList } from './Reviews.styles';
//компонент Reviews, інформація про огляди. Рендериться на сторінці MovieDetails.

const Reviews = () => {
  const { movieId } = useParams();
  const [reviewsInfo, setReviewsInfo] = useState([]);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    (async function reviewsInfo() {
      const res = await reviewsRequest(movieId);
      setReviewsInfo(res.data.results);
    })();

    return () => {
      // second
    };
  }, [movieId]);

  return (
    <>
      {reviewsInfo.length === 0 ? (
        <div>We don`t have information for this movie</div>
      ) : (
        <ReviewsInfoList>
          {reviewsInfo.map(({ id, author, content }) => (
            <li key={id}>
              <p>
                <b>Author: </b>
                {author}
              </p>
              <p>{content}</p>
            </li>
          ))}
        </ReviewsInfoList>
      )}
    </>
  );
};

export default Reviews;
