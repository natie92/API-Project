import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";

const frontPageSpots = () => {
    const dispatch = useDispatch();

    const allAirBnbSpots = useSelector((state) => Object.values(state.spot));

    useEffect(() => {
        dispatch(getAllSpots())
    }, []);

    return (
       <div className='front-page-container'>
        {allAirBnbSpots.map((spot) => {
         <div className="spot">
            <NavLink key={spot.id} to={`/api/spots/${spot.id}`}>
                <img src={spot.previewImage} alt={spot.name}/>
                <div className="info-on-spot">
                    <div className="country-and-city">
                        {spot.city},{spot.country}
                    </div>
                    <div className="updated-at">{spot.updatedAt}</div>
                    <div className="price">${spot.price}</div>
                </div>
            </NavLink>
         </div>
        })}

       </div>
    )
};

export default frontPageSpots
