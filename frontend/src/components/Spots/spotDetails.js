import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getAllSpots } from "../../store/spots";

const SpotDetails = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    const spot = useSelector((state) => state.spots[spotId]);

    console.log(spot)

    return (
        <div>

            <div className="spot-container" key={spot?.id}>

                <div className="spot-details">
                    <div className="name">
                        <h2>{spot?.name}</h2>
                    </div>
                    <div>
                        <i className="average-rating"> </i>
                        {spot?.avgRating}
                    </div>
                <div>
                   {spot?.address}
                </div>
                </div>
            </div>

        </div>
    )


}

export default SpotDetails
