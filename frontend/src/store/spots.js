import { csrfFetch } from "./csrf";

const GET = 'spots/get';
const GET_A_SPOT = 'spots/GET_A_SPOT'
const ADD = 'spots/add';
const DELETE = '/spots/delete';
const EDIT = '/spots/edit';
const USERSPOTS = '/user/spots';

const getSpots = (spots) => ({
  type: GET,
  spots,
});

const getASpot = (spot) => ({
    type: GET_A_SPOT,
    spot
});

const addSpot = (spot) => ({
    type: ADD,
    spot,
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

// GET ALL SPOTS

export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch ('/api/spots');
    const data = await res.json();
    dispatch(getSpots(data.Spots))
    return res
};

//GET SPOT BY SPOT ID

export const getSpotBySpotId = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);

    if(res.ok) {
        const data = await res.json();
        dispatch(getASpot(data))
        return res
    }
}

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
        return newSpot
    }
    return res
};

export const mySpots = () => async (dispatch) => {
    const res = await csrfFetch ('/api/spots/current');
    const { Spots } = await res.json();

    const obj = {}
    Spots.forEach((spot) => (obj[spot.id] = spot));

    dispatch(allMySpots(obj))
};

//EDIT A SPOT

export const UpdateSpot = (spot) => async (dispatch) => {
    const { id } = spot;
    const res = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(spot),
    });

    if(res.ok) {
    const updatedSpot =  await res.json();
    dispatch(editSpot(updatedSpot));
    } else {
        throw res
    }
};

//DELETE A SPOT

export const DeleteASpot = (spotId) => async (dispatch) => {

    const res = await csrfFetch (`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if(res.ok) {
         const deletedSpot = await res.json();
         dispatch(deleteSpot(spotId));
         return deletedSpot
    }


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
            return {
                ...state, [action.spot.id]: action.spot
            }
        //     console.log(action.newSpot)
        //     const newState = { ...state, [action.newSpot.id]: action.newSpot };
        //     return newState
        // }
        }
        case GET_A_SPOT: {
            return {
                ...state, [action.spot.id]: action.spot
            }
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
