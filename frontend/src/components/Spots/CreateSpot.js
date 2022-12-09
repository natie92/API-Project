import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MakeNewSpot } from "../../store/spots";

const MakeFormForSpot = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState("");

    const handleSumbit = async (e) => {
        e.preventDefault();

        let payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        }

        try {
            await dispatch(MakeNewSpot(payload))
            history.push("/user/spots");
        } catch (res) {
            setErrors([]);
            const data = await res.json()

            if(data && data.message) setErrors(data.errors)
        }
    };

    return (
        <div className="outer-container">
            <div className="make-a-new-spot-container">
                <form className="spots-form" onSubmit={handleSumbit}>
                    <h2> Create A New Spot</h2>

                    <label>
                        Address
                        <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder="Address"
                        />
                        <p className="errors">{errors.address}</p>
                    </label>
                    <label>
                        City
                        <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder="City"
                        />
                        <p className="errors">{errors.city}</p>
                    </label>
                    <label>
            State
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="State"
            />
            <p className="errors">{errors.state}</p>
          </label>
          <label>
            Country
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder="Country"
            />
            <p className="errors">{errors.country}</p>
          </label>
          <label>
            lat
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              placeholder="Latitude"
            />
            <p className="errors">{errors.lat}</p>
          </label>
          <label>
            lng
            <input
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
              placeholder="Longtitude"
            />
            <p className="errors">{errors.lng}</p>
          </label>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Name"
            />
            <p className="errors">{errors.name}</p>
          </label>
          <label>
            Description
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Description Here"
            />
            <p className="errors">{errors.description}</p>
          </label>
          <label>
            Price
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Price"
            />
            <p className="errors">{errors.price}</p>
          </label>
          <input type="submit" />
                </form>
            </div>
        </div>
    )

};


export default MakeFormForSpot;
