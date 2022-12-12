import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { MyReviews, deleteAReview, editAReview} from "../../store/reviews";

export default function EditReviewForm() {
    const { reviewId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(MyReviews());
    }, [dispatch]);

    const editThisReview = useSelector((state) => state.review[reviewId]);


    const [review, setReview] = useState(editThisReview.reviews);
    const [stars, setStars] = useState(editThisReview.stars);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {
        id: reviewId,
        review,
        stars,
    };
    try {
        await dispatch(editAReview(payload));
        history.push(`/user/reviews`)
     } catch (res) {
        setErrors([]);
        const data = await res.json();
     }

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
        <button id="delete-btn" onClick={onClick}>
          delete
        </button>
      </form>
    </div>
  );
}
