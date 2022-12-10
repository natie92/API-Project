import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { NavLink, Link } from "react-router-dom";
// import placeHolder from  "./empty-house.png";


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
            // if(spot.image === "Spot Image couldn't be found")
            // spot.image = placeHolder;

        const date = new Date(spot.updatedAt);
        let presentDate = date.toDateString();

        return (
        <NavLink to={`/spots/${spot.id}`} >
         <div className="spot" key={spot.id}>
                <img src={spot.previewImage} alt={spot.name}/>
                <div className="info-on-spot">
                    <div>
                        <i className="fa-regular fa-star"></i>
                        {Number(spot.avgRating).toFixed(1)}
                        </div>
                    <div className="country-and-city">
                        {spot.city},{spot.country}
                    </div>
                    <div>
                        <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
                    </div>
                    <div className="updated-at">{presentDate}</div>
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
