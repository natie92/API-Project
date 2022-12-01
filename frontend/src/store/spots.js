import { csrfFetch } from "./csrf";

const GET = 'spots/get';
const ADD = 'spots/add';
const DELETE = '/spots/delete';
const EDIT = '/spots/edit';
const USERSPOTS = '/user/spots';

const getSpots = (spots) => ({
  type: GET,
  spots,
});

const addSpot = (newSpot) => ({
    type: ADD,
    newSpot,
});

const deleteSpot = (spot) => ({
    type: DELETE,
    spot,
});

const editSpot = (spot) => ({
    type: EDIT,
    spot,
});

const mySpots = (spots) => ({
    type: USERSPOTS,
    spots,
});

export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch ('api/spots');
    const data = await res.json();
    dispatch(getSpots(data.Spots))
    return res
};

export const MakeNewSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch ('api/spots', {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(spot),
    })
    if(res.ok) {
        const newSpot = await res.json()
        dispatch(addSpot(newSpot));
    } else {
        throw res
    }
}


const initialState = {}

const spotReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET:
            newState = { ...state}
            action.spots.forEach(spot => {
                newState[spot.id] = spot
            });
            return newState;
        case ADD:
            newState = { ...state, [action.newSpot.id]: action.spot };
            return newState
        default:
        return state;
    }
};

export default spotReducer
