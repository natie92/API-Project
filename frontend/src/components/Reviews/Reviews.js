import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allReviews } from "../../store/reviews";
import { useParams } from "react-router-dom";



 export default function SpotReviews() {
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots[spotId])
  const reviews = useSelector(state => Object.values(state.reviews));
  const spotReview = reviews.filter((review) => {
    if(review.spotId === spot.id){
      return review
    }
  })


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allReviews(spotId));

  }, [dispatch]);



  return (
    <div>
      <div id="spot-reviews-container">
        {spotReview.map((review) => (
          <div id="review-container" key={review?.id}>
            <div id="review" key={review?.id}>
              {review?.review}

            </div>
            
            <div id="review-date">{review?.createdAt?.slice(0, 10)}</div>
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
