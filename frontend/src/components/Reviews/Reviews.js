import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allReviews } from "../../store/reviews";
import { useParams } from "react-router-dom";

import "./SpotReviews.css";


export default function SpotReviews() {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId])
  const reviews = useSelector(state => Object.values(state.reviews));
  const spotReview = reviews.filter(review => {
    if(review.spotId === spot.id){
      return review
    }
  })


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allReviews(spotId));

  }, [dispatch, spotId]);

  return (
    <div>
      <div className="spot-reviews-container">
        {spotReview?.map((review) => (
          <div className="review-container" key={review?.id}>
            <div className="info-user">
                <div className="review-stars">
                  <i className="fa-solid fa-star"></i>
                    {review?.stars}
                </div>
                <div className="spot-user-profile">
                  <i className="fa-solid fa-circle-user"></i>
                </div>
                <div className="spot-review-names">
                {review?.User?.firstName + " "}
                {review?.User?.lastName}
                </div>
            </div>
            <div className="review-date">{review?.createdAt?.slice(0, 10)}</div>
            <div className="spot-review" key={review?.id}>
              {review?.review}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
