import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { reviewsRequest } from '../components/api';
import { ReviewsInfoList } from './Reviews.styles';
import { DataTable } from 'components/Loader';
//компонент Reviews, інформація про огляди. Рендериться на сторінці MovieDetails.

const Reviews = () => {
  const { movieId } = useParams();
  const [reviewsInfo, setReviewsInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    (async function reviewsInfo() {
      const res = await reviewsRequest(movieId);
      setReviewsInfo(res.data.results);
      setIsLoading(false);
    })();

    return () => {
      // second
    };
  }, [movieId]);

  return (
    <>
      {isLoading && <DataTable />}
      {!isLoading && (
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
      {!isLoading && reviewsInfo.length === 0 && (
        <div>We don`t have information for this movie</div>
      )}
    </>
  );
};

export default Reviews;
