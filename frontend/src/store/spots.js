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

const allMySpots = (spots) => ({
    type: USERSPOTS,
    spots,
});

// READ (GET)

export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch ('/api/spots');
    const data = await res.json();
    dispatch(getSpots(data.Spots))
    return res
};

//CREATE (POST)

export const MakeNewSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch ('/api/spots', {
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
};

export const mySpots = () => async (dispatch) => {
    const res = await csrfFetch ('/api/user/spots');
    const { Spots } = await res.json();

    const obj = {}
    Spots.forEach((spot) => (obj[spot.id] = spot));

    dispatch(allMySpots(obj))
};

//EDIT A SPOT

export const UpdateSpot = (spotId, spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(spot),
    });

    const updatedSpot =  await res.json();
    dispatch(editSpot(updatedSpot));
};

//DELETE A SPOT

export const DeleteASpot = (id) => async (dispatch) => {
    const res = await csrfFetch (`/api/spots/${id}`, {
        method: DELETE
    });

    const deletedSpot = await res.json()
    dispatch(deleteSpot(deletedSpot))
}


const initialState = {}

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET:{
          const newState = { ...state }
            action.spots.forEach(spot => {
                newState[spot.id] = spot
            });
            return newState;
        }
        case ADD:{
            const newState = { ...state, [action.newSpot.id]: action.spot };
            return newState
        }
        case USERSPOTS:{
            const newState = { ...action.spots };
            return newState;
        }
        case EDIT:{
            const newState = { ...state, [action.spot.id]: action.spot};
            return newState;
        }
        case DELETE: {
            const newState = {...state, [action.spot.id]: action.spot};
            delete newState[action.spot.id];
            return newState
        }

        default:
        return state;
    }
};

export default spotReducer
