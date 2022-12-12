import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, NavLink, useHistory } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { UpdateSpot } from "../../store/spots";
import SpotReviews from "../Reviews/Reviews"
import { getSpotBySpotId } from "../../store/spots";

import "./spots.css"

const SpotDetails = () => {

    const currSessionUser = useSelector(state => state.session.user);
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots[spotId]);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSpotBySpotId(spotId))
    }, [dispatch])

    let content;

    if(currSessionUser){
        content = (
            spot?
        <div>
            <div className="spot-container" key={spot.id}>

                <div className="spot-details">
                    <div className="name">
                        <h2>{spot.name}</h2>
                    </div>
                    <Link to= {`/${spotId}/reviews`} >
                        <button className="spot-reviews">Reviews</button>
                    </Link>
                    <div className="average-rating">
                         <i class="fa-solid fa-star"></i>
                         {Number(spot.avgRating).toFixed(1)}
                    </div>
                    <div className="spot-detail-city-state">
                        {spot.city}, {spot.state}
                   </div>

                    {/* <div className="reviews-container">
                    <SpotReviews spotId={spotId} />
                    </div> */}
                    <img className="spot-details-img" src={spot.previewImage} alt="" />

                   <div  className="spot-detail-price"> ${spot.price} night </div>
                   <div className="description">{spot.description}</div>

                   <div className="edit-spot-container">
                        {currSessionUser && currSessionUser.id === spot.ownerId && <UpdateSpot />}
                </div>

            </div>
        </div>

    :<> </>


    )
}



    {/* return (
        <div>
             <Link to="/">
                <button className="back">Return to Spots</button>
            </Link>
            </div>

        </div>
     */}


}

export default SpotDetails
