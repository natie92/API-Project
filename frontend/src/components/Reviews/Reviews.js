import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allReviews } from "../../store/reviews";


export default function SpotReviews({ spotId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allReviews(spotId));

  }, [dispatch, spotId]);


   const reviews = useSelector((state) => Object.values(state.reviews));

  

  return (
    <div>
      <h2>Reviews</h2>
      <div id="spot-reviews-container">
        {reviews.map((review) => (
          <div id="review-container" key={review?.id}>
            <div id="review" key={review?.id}>
              {review?.review}

            </div>
            <div id="review-date">{review?.createdAt.slice(0, 10)}</div>
            <div>
              <i className="review-stars"> </i>
              {review?.stars}
            </div>
            <div>
              {review?.User?.firstName + " "}
              {review?.User?.lastName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
