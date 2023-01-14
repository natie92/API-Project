import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";


import "./frontpage.css";


const FrontPageSpots = () => {
    const dispatch = useDispatch();


    const allAirBnbSpots = useSelector((state) => Object.values(state.spots));

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    const defaultImage = "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg";

    return (
       <div className='front-page-container'>
        {allAirBnbSpots.map((spot) => {


        const date = new Date(spot.updatedAt);
        let presentDate = date.toDateString();

        return (
            <NavLink className="nav-link" to={`/spots/${spot.id}`} >
                <div className="spot" key={spot.id}>
                    <div className="spot-images">
                        <i className="fa-regular fa-heart"></i>
                        <img className="images" src={spot.previewImage || defaultImage } alt={spot.name}/>
                    </div>
                    <div className="info-on-spot">
                        <div className="rating-div">
                            <i className="fa-solid fa-star"></i>
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
