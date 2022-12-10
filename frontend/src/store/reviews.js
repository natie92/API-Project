import { csrfFetch } from "./csrf";

const GET_REVIEW = "reviews/get";
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

export const allReviews = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`);
  const { Reviews } = await response.json();

  if (response.ok) {
    const obj = {};
    Reviews.forEach((review) => (obj[review.id] = review));
    dispatch(getReviews(obj));
  }
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
    Reviews.forEach((review) => (obj[review.id] = review));

    dispatch(myReviews(obj));
  }
};

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
  let newState = { ...state };
  switch (action.type) {
    case GET_REVIEW:
      newState = { ...action.reviews };
      return newState;
    case ADD_REVIEW:
      newState = { ...state, [action.newReview.id]: action.newReview };
      return newState;
    case MY_REVIEWS:
      newState = { ...action.reviews };
      return newState;
    case EDIT_REVIEW:
      newState = { ...state, [action.review.id]: action.review };
      return newState;
    case DELETE_REVIEW:
      delete newState[action.review.id];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
