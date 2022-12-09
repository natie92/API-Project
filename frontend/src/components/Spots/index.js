import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";

import "./spot.css";

const FrontPageSpots = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    const allAirBnbSpots = useSelector((state) => Object.values(state.spots));

    return (
       <div className='front-page-container'>
        {allAirBnbSpots.map((spot) => {
        return (
        <NavLink to={`/spots/${spot.id}`} >
         <div className="spot" key={spot.id}>
                <img src={spot.previewImage} alt={spot.name}/>
                <div className="info-on-spot">
                    <div className="country-and-city">
                        {spot.city},{spot.country}
                    </div>
                    <div className="updated-at">{spot.updatedAt}</div>
                    <div className="price">${spot.price}</div>

                </div>

         </div>
         </NavLink>

        )

        })}

       </div>
    )
};

export default FrontPageSpots
