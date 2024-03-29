import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink} from "react-router-dom";
import { mySpots, DeleteASpot } from "../../store/spots";
import { UpdateSpot } from "../../store/spots";

import "./EditFormSpot.css";

export default function UpdateASpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(mySpots());
    }, [dispatch]);

    const editThisSpot = useSelector((state) => state.spots[spotId]);



     const [address, setAddress] = useState(editThisSpot?.address);
     const [city, setCity] = useState(editThisSpot?.city);
     const [state, setState] = useState(editThisSpot?.state);
     const [country, setCountry] = useState(editThisSpot?.country);
     const [lat, setLat] = useState(editThisSpot?.lat);
     const [lng, setLng] = useState(editThisSpot?.lng);
     const [name, setName] = useState(editThisSpot?.name);
     const [description, setDescription] = useState(editThisSpot?.description);
     const [price, setPrice] = useState(editThisSpot?.price);
     const [errors, setErrors] = useState([]);

    const handleSumbit = async (e) => {
        e.preventDefault();

        let payload = {
        id: spotId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        };

     try {
        await dispatch(UpdateSpot(payload));
        history.push(`/user/spots`)
     } catch (res) {
        setErrors([]);
        const data = await res.json();
     }


}

 const onClick = async (e) => {
        e.preventDefault();
        await dispatch(DeleteASpot(spotId));
        history.push(`/user/spots`);
     };

    return (
     <div className="edit-spot-container">
       <form className="edit-spot-form" onSubmit={handleSumbit}>
            <h2>Edit Spot</h2>
            <label className="address-spot">
             Address
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
             <p className="errors">{errors.address}</p>
            </label>
            <label className="city-spot">
              City
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
          <p className="errors">{errors.city}</p>
            </label>
            <label className="state-spot">
              State
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
              <p className="errors">{errors.state}</p>
            </label>
            <label className="country-spot">
              Country
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <p className="errors">{errors.country}</p>
            </label>
            <label className="lat-spot">
              Lat
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
              />
              <p className="errors">{errors.lat}</p>
            </label>
            <label className="lng-spot">
              Lng
              <input
                type="text"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
              />
              <p className="errors">{errors.lng}</p>
            </label>
            <label className="name-spot">
              Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <p className="errors">{errors.name}</p>
            </label>
            <label className="description-spot">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <p className="errors">{errors.description}</p>
            </label>
            <label className="price-spot">
              Price
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <p className="errors">{errors.price}</p>
            </label>
            <input type="submit" className="edit-spot-submit"/>

            <NavLink to="/users/spots">
            <button className="spot-delete-btn" onClick={onClick}>
              Delete
            </button>
            </NavLink>
        </form>
        </div>

    );
    }
