import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mySpots } from "../../store/spots";
import { Link, NavLink, useHistory } from "react-router-dom";


const MySpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(mySpots())
    }, [dispatch]);

    const spots = useSelector((state) => Object.values(state.spots));

    const newRoute = () => {
        let path = `/spots/new`;
        history.push(path)
    };


    return (
        <>

        <div className="my-spots-container">
            <div className="my-spots-header">
                <div className="my-spots">
                    <h1>My Spots</h1>
                </div>
                <div className="add-a-new-spot">
                    <button className="add-a-new-spot" onClick={newRoute}>
                        Add A New Spot
                    </button>
                </div>
            </div>

            <div className="mySpots">
                {spots.map((spot) => (
              <NavLink to={`/spots/${spot.id}`} >
              <div className="spot" key={spot?.id}>
                <img src={spot?.previewImage} alt="spot.name"></img>
                <div className="rating">
                  <i class="fa-solid fa-star"></i>
                {spot.avgRating}
              </div>

              <div>
                <div className="delete-and-edit-container">
                  <Link to={`/user/edit/${spot.id}`}>
                    <button>Edit Spot</button>
                  </Link>
                </div>
                <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
              </div>
              <div>{spot?.address}</div>
              <div>${spot?.price}/night</div>

            </div>
            </NavLink>

            ))}
            </div>
        </div>

        </>
    )
}


export default MySpots;
