import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allReviews } from "../../store/reviews";
import { useParams,useHistory } from "react-router-dom";




export default function SpotReviews() {
  const { spotId } = useParams();
  const { reviewId } = useParams();
  const history = useHistory();
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

   const createEditReviewRoute = () => {
      let path = `/user/review/edit/${reviewId}`
      history.push(path)
    }

  return (
    <div>
      <div id="spot-reviews-container">
         <div className="edit-a-review">
          <button className="edit-review-button" onClick={createEditReviewRoute}>
            Edit This Review
          </button>
        </div>
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
