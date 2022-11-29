import { csrfFetch } from "./csrf";

const GET = 'spots/get';
const ADD = 'spots/add';
const DELETE = '/spots/delete';
const EDIT = '/spots/edit';
const USERSPOTS = '/user/spots';

const getSpots = (spots) => ({
  type: GET,
  payload: spots,
});

const addSpot = (newSpot) => ({
    type: ADD,
    payload: newSpot,
});

const deleteSpot = (spot) => ({
    type: DELETE,
    payload: spot,
});

const editSpot = (spot) => ({
    type: EDIT,
    payload: spot,
});

const mySpots = (spots) => ({
    type: USERSPOTS,
    payload: spots,
});

export const getAllSpots = () => async (dispatch) => {
    const res = await fetch ('api/spots');
    const data = await res.json();
    dispatch(getSpots(data))
    return res
};


const spotReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case GET: {
            const spots = {};
            action.payload.forEach((spot) => {
                spots[spot.id] = spot;
            });

            return {
                ...spots,
                ...newState,
            };
        }
        default:
        return state;
    }
};

export default spotReducer
