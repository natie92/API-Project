import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { MyReviews, deleteAReview, editAReview} from "../../store/reviews";

import "./EditReview.css";

export default function EditReviewForm() {
    const dispatch = useDispatch();
    const { reviewId } = useParams();
    const history = useHistory();


    useEffect(() => {
        dispatch(MyReviews());
    }, [dispatch]);


    const editThisReview = useSelector((state) => state.reviews[reviewId]);


    const [review, setReview] = useState(editThisReview?.review);
    const [stars, setStars] = useState(editThisReview?.stars);

    if(!editThisReview){
      history.push(`/user/reviews`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {
        id: reviewId,
        review,
        stars,
    };

        await dispatch(editAReview(payload));
        history.push(`/user/reviews`)


  };
  const onClick = async (e) => {
    e.preventDefault();

    await dispatch(deleteAReview(reviewId));
    history.push(`/user/reviews`);
  };

  return (
    <div>
      <div className="edit-review-header">
        <h2>Edit Review</h2>
      </div>
      <div className="edit-review-container">
      <form className="edit-spot-form" onSubmit={handleSubmit}>
        <div className="review-content-container">
        <label>
          Review:
        </label>
          <textarea type="text" className="text-area-edit-review" value={review} onChange={(e) => setReview(e.target.value)} required />
        </div>

        <div className="input-review-container">
        <label>
          Stars:
        </label>
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
            max="5"
            min="1"
            className="stars-input-container"
          />
        </div>

        <div className="buttons">
        <div className="submit">
        <input type="submit" className="submit-btn" />
        </div>

        <div className="delete-btn">
        <NavLink to="/user/reviews">
        <button id="delete-btn" onClick={onClick}>
          Delete
        </button>
        </NavLink>
        </div>
        </div>

      </form>
    </div>
    </div>
  );
}
