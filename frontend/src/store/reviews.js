import { csrfFetch } from "./csrf";

const GET_REVIEW = "reviews/get";
const GET_REVIEW_BY_SPOT = "reviews/by-spot-id"
const ADD_REVIEW = "reviews/add";
const MY_REVIEWS = "/user/reviews";
const EDIT_REVIEW = "/reviews/edit";
const DELETE_REVIEW = "/reviews/delete";


const getReviews = (reviews) => ({
  type: GET_REVIEW,
  reviews,
});
const addReview = (newReview) => ({
  type: ADD_REVIEW,
  newReview,
});

const getReviewBySpot = (reviews) => ({
  type: GET_REVIEW_BY_SPOT,
  reviews
})

const myReviews = (reviews) => ({
  type: MY_REVIEWS,
  reviews,
});

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review,
});

const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review,
});

//GET ALL REVIEWS

export const allReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const data = await response.json();

  if (response.ok) {
    dispatch(getReviews(data.Reviews, spotId))
  }
  return response
};

//CREATE NEW REVIEW

export const AddNewReview = (review) => async (dispatch) => {
  const { spotId } = review;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const newReview = await response.json();
    dispatch(addReview(newReview));
  } else {
    throw response;
  }
};


//GET YOUR REVIEWS

export const MyReviews = () => async (dispatch) => {

  const response = await csrfFetch("/api/reviews/current");
  const { Reviews } = await response.json();

  if (response.ok) {
    const obj = {};
    if (Reviews) Reviews.forEach((review) => (obj[review.id] = review))

    dispatch(myReviews(obj));
  }
};


//GET REVIEW BY SPOT ID

export const GetReviewBySpotId = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`)

  if(res.ok){
    const data = await res.json()
    dispatch(getReviewBySpot(data, spotId))

    return res
  }

}

//EDIT A REVIEW


export const editAReview = (review) => async (dispatch) => {
  const { id } = review;
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  const editedreview = await response.json();
  if (response.ok) {
    dispatch(editReview(editedreview));
  } else {
    throw response;
  }
};

//DELETE REVIEW

export const deleteAReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(id));
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEW:{
      const newState = {...state}
      action.reviews.forEach(review => {
        newState[review.id] = review
      })
      return newState;
    }
    case ADD_REVIEW:{
      const newState = { ...state, [action.newReview.id]: action.newReview };
      return newState;
    }
    case MY_REVIEWS:{
      const newState = { ...action.reviews };
      return newState;
    }

    case GET_REVIEW_BY_SPOT: {
      const newState = { ...action.reviews}
      return newState
    }
    case EDIT_REVIEW:{
      const newState = { ...state, [action.review.id]: action.review };
      return newState;
    }
    case DELETE_REVIEW:{
      const newState = {...state}
      delete newState[action.review];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
