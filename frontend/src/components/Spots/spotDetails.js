import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, NavLink, useHistory } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { UpdateSpot } from "../../store/spots";
import { getSpotBySpotId } from "../../store/spots";

import "./spots.css"

const SpotDetails = () => {

    const currSessionUser = useSelector(state => state.session.user);
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots[spotId]);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    const createReviewRoute = () => {
      let path = `/reviews/${spot.id}`
      history.push(path)
    }


    return (
        <div>

            <div className="spot-container" key={spot?.id}>

                <div className="spot-details">
                    <div className="name">
                        <h1>{spot?.name}</h1>
                    </div>

                <div className="spot-info">
                    <div>
                    <Link to= {`${spotId}/reviews`} >
                        <div className="spot-reviews"> Spot Reviews </div>
                    </Link>
                    </div>
                    <div className="average-rating">
                         <i className="fa-solid fa-star"></i>
                         {Number(spot?.avgRating).toFixed(1)}
                    </div>
                    <div className="spot-detail-city-state">
                        {spot?.city}, {spot?.state}
                   </div>
                </div>

                <img className="spot-details-img" src={spot?.previewImage} alt={spot?.name}></img>

                <div  className="spot-detail-price"> ${spot?.price} night </div>
                <div className="description">{spot?.description}</div>

                <div className="edit-spot-container">
                    {currSessionUser && currSessionUser.id === spot?.ownerId && <UpdateSpot />}
                </div>

                </div>
            </div>
            <div className="bottom-buttons-container">
                <Link to="/">
                    <button className="back">Return to Spots</button>
                </Link>

                <div className="add-a-new-review">
                    <button className="add-a-new-review" onClick={createReviewRoute}>
                    Add Review
                    </button>
                </div>
            </div>


        </div>
    )


}

export default SpotDetails
