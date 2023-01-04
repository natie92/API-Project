import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { MyReviews, deleteAReview, editAReview} from "../../store/reviews";

export default function EditReviewForm() {
    const dispatch = useDispatch();
    const { reviewId } = useParams();
    const history = useHistory();


    useEffect(() => {
        dispatch(MyReviews());
    }, [dispatch]);

    

    const editThisReview = useSelector((state) => state.reviews[reviewId]);


    const [review, setReview] = useState(editThisReview.review);
    const [stars, setStars] = useState(editThisReview.stars);
    const [errors, setErrors] = useState([]);

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
    <div id="edit-spot-container">

      <form className="edit-spot-form" onSubmit={handleSubmit}>
        <h2>Edit Review</h2>
        <label>
          Review
          <textarea
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label>
          Stars
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
            max="5"
            min="1"
          />
        </label>
        <input type="submit" />

        <NavLink to="/user/reviews">
        <button id="delete-btn" onClick={onClick}>
          Delete
        </button>
        </NavLink>
      </form>
    </div>
  );
}
