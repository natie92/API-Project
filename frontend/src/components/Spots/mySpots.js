import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mySpots } from "../../store/spots";
import { Link, NavLink, useHistory } from "react-router-dom";

import "./mySpots.css"


const MySpots = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const spots = useSelector((state) => Object.values(state.spots));

    useEffect(() => {
        dispatch(mySpots())
    }, [dispatch]);

    const newRoute = () => {
        let path = `/spots/new`;
        history.push(path)
    };


    const defaultImage = "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg";


    return (
        <>

        <div className="my-spots-container">
            <div className="my-spots-header">
                <h1>My Spots</h1>
            </div>

            <div className="mySpots">
                {spots.map((spot) => (
              <NavLink to={`/spots/${spot.id}`} >
              <div className="spot" key={spot?.id}>
                <img src={spot?.previewImage || defaultImage} alt="spot.name"></img>
                <div className="rating-container">
                  <i class="fa-solid fa-star"></i>
                  {Number(spot.avgRating).toFixed(1)}
              </div>

              <div className="my-spot-name-container">
                <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
              </div>
              <div className="my-spot-address-container">{spot?.address}</div>
              <div className="my-spot-price-container">${spot?.price}/night</div>
              <div className="add-a-new-spot">
                <button className="add-a-new-spot" onClick={newRoute}>
                    Add A New Spot
                </button>
              </div>
               <div className="delete-and-edit-container">
                  <Link to={`/user/edit/${spot.id}`}>
                    <button>Edit Spot</button>
                  </Link>
                </div>

                </div>
            </NavLink>

            ))}
            </div>
        </div>

        </>
    )
}


export default MySpots;
