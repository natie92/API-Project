import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MyReviews } from "../../store/reviews";


export default function GetMyReviews() {
  const dispatch = useDispatch();
  useEffect(() => {
    const allReviews = async () => await dispatch(MyReviews());
    allReviews();
  }, [dispatch]);


   const reviews = useSelector((state) => Object.values(state.reviews));

console.log(reviews)

  return (

    <div className="outer-div">
      <div className="my-reviews-header">
        <h1>My Reviews</h1>
      </div>
      <div className="my-reviews-container">
        <div className="myReviews" key="myreviews">
          {reviews.map((review) => (
            <div className="review" key={review?.id}>
              <div className="spot-name">
                <Link to={`/spots/${review?.Spot?.id}`}>
                  {review?.Spot?.name}
                </Link>
              </div>
              <div className="spot-address">{review?.Spot?.address}</div>

              <div>
                <i className="review-stars"> </i>
                {review?.stars}
              </div>
              <div className="updated">
                Updated: {review?.updatedAt?.slice(0, 10)}
              </div>

              <div>{review?.review}</div>
              <div className="edit-and-delete-container">
                <Link to={`/user/review/edit/${review?.id}`}>
                  <button>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
   );

};
