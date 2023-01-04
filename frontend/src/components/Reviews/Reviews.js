import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allReviews } from "../../store/reviews";
import { useParams,useHistory } from "react-router-dom";
import { deleteAReview } from "../../store/reviews";


import "./SpotReviews.css";


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

  //  const createEditReviewRoute = () => {
  //     let path = `/user/review/edit/${reviewId}`
  //     history.push(path)
  //   }

     const onDelete = (e, id) => {
      e.preventDefault();
      dispatch(deleteAReview(id));
      // history.push(`/user/reviews`)

    };


  return (
    <div>
      <div className="spot-reviews-container">
         {/* <div className="edit-a-review">
          <button className="edit-review-button" onClick={createEditReviewRoute}>
            Edit This Review
          </button> */}
        {/* </div> */}
        {spotReview.map((review) => (
          <div className="review-container" key={review?.id}>
            <div>
              {review?.User?.firstName + " "}
              {review?.User?.lastName}
            </div>
            <div className="review-date">{review?.createdAt?.slice(0, 10)}</div>
            <div className="review" key={review?.id}>
              {review?.review}

            </div>
              <div className="review-stars">
                <i class="fa-solid fa-star"></i>
                {review?.stars}
               </div>
            {/* <div className="buttons">
              <input type="submit" />
              <button id="delete-btn" onClick={(e) => {onDelete(e,review.id)}}>
                Delete
              </button>
            </div> */}

          </div>
        ))}
      </div>
    </div>
  );
}
