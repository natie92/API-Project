import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { NavLink, Link } from "react-router-dom";
// import placeHolder from  "./empty-house.png";


import "./frontpage.css";

const FrontPageSpots = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    const allAirBnbSpots = useSelector((state) => Object.values(state.spots));

    return (
       <div className='front-page-container'>
        {allAirBnbSpots.map((spot) => {


        const date = new Date(spot.updatedAt);
        let presentDate = date.toDateString();

        return (
            <NavLink className="nav-link" to={`/spots/${spot.id}`} >
                <div className="spot" key={spot.id}>
                    <img className="spot-images" src={spot.previewImage} alt={spot.name}/>
                    <div className="info-on-spot">
                        <div className="rating-div">
                            <i class="fa-solid fa-star"></i>
                            {Number(spot.avgRating).toFixed(1)}
                        </div>
                        <div className="city-state">{spot.city + "," + " " + spot.state}</div>
                        <div className="spot-description">{spot.description}</div>
                        <div className="updated-at">{presentDate}</div>
                        <div className="price">${spot.price} night</div>

                    </div>

                </div>
            </NavLink>

        )

        })}
       </div>
    )
};

export default FrontPageSpots
