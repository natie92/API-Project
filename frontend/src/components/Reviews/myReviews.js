import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { MyReviews, deleteAReview } from "../../store/reviews";

import "./myReviews.css";


export default function GetMyReviews() {

  const dispatch = useDispatch();
  const history = useHistory();

  const reviews = useSelector((state) => Object.values(state.reviews));

  useEffect(() => {
    const allReviews = async () => await dispatch(MyReviews());
    allReviews();
  }, [dispatch]);


  return (

    <div className="outer-div">
      <div className="my-reviews-header">
        <h1>My Reviews</h1>
      </div>

      <div className="my-reviews-container">
        <div className="myReviews" key="myreviews">
          {reviews.map((review) => (
            <div className="review" key={review?.id}>
              <div className="review-info-container">
              <div className="spot-title">
                <Link to={`/spots/${review?.Spot?.id}`}>
                  <div className="spot-name">
                  {review?.Spot?.name}
                  </div>
                </Link>
              </div>
              <div className="spot-address">{review?.Spot?.address}</div>

              <div className="review-stars">
                <i className="fa-solid fa-star"></i>
                <div className="number-stars">
                {review?.stars}
                </div>
              </div>
              <div className="updated">
                Updated: {review?.updatedAt?.slice(0, 10)}
              </div>
              <div className="the-review">{review?.review}</div>
              <div className="edit-and-delete-container">
                <Link to={`/user/review/edit/${review?.id}`}>
                  <button>Edit</button>
                </Link>
              </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
   );

};
