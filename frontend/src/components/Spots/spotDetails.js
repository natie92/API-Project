import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { UpdateSpot } from "../../store/spots";

const SpotDetails = () => {
    const currSessionUser = useSelector((state) => state.session.user);
    const { spotId } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    const spot = useSelector((state) => state.spots[spotId]);

    let url;
  (() => {
    let currPreview = spot?.SpotImages?.find(
      (spotImg) => spotImg.preview === true
    );
    if (currPreview) {
      url = currPreview.url;
    }
    // else {
    // //   url = defaultImage;
    // // }
  })();

    return (
        <div>

            <div className="spot-container" key={spot?.id}>

                <div className="spot-details">
                    <div className="name">
                        <h2>{spot?.name}</h2>
                    </div>
                    <img className="spot-details-img" src={spot?.previewImage} alt={spot?.name}></img>
                    <div>
                        <i className="average-rating"> </i>
                        {spot?.avgRating}
                    </div>
                <div>
                   {spot?.address}
                </div>
                <div>
                    {spot?.city}, {spot?.state}
                </div>
                <div> ${spot?.price} night </div>
                <div className="description">{spot?.description}</div>

                <div className="edit-spot-container">
                    {currSessionUser && currSessionUser.id === spot.ownerId && <UpdateSpot />}
                </div>

                </div>
                <div className="reviews-container">

                </div>
            </div>
             <Link to="/">
                <button className="back">Return to Spots</button>
            </Link>
        </div>
    )


}

export default SpotDetails
