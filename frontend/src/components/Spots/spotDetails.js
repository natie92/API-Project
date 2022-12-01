import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getAllSpots } from "../../store/spots";

const SpotDetails = () => {
    const { spotId } = useParams()
    dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    const spot = useSelector((state) => state.spots[spotId]);

    return (
        <div>
            <div className="spot-container" key={spot.id}>
                <div className="spot-details">
                    <div className="name">
                        <h2>{spot.name}</h2>
                    </div>
                </div>
            </div>

        </div>
    )


}
