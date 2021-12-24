import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

const City = (props) => {
  // const cityId = "61a7603dbb53f131584de9b3";

  const [selectedCity, setSelectedCity] = useState();
  const [cities, setCities] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveHandler = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);
    console.log([{ propName: "city", value: selectedCity }]);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${props.userId}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: "Bearer " + context.token,
          },
          body: JSON.stringify([{ propName: "city", value: selectedCity }]),
        }
      );
      // console.log("data");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCities = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/cities`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // Authorization: "Bearer " + context.token,
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setCities(data.cities);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getCities();

    const getCurrentCity = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/cities/${props.currentCity}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // Authorization: "Bearer " + context.token,
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        setSelectedCity(data.city._id);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getCurrentCity();
  }, []);

  return (
    <>
      <h4>Stad</h4>
      <form onSubmit={saveHandler}>
        <select
          className="form-select"
          aria-label="Available bikes"
          onChange={(event) => setSelectedCity(event.target.value)}
        >
          {cities &&
            cities.length > 0 &&
            cities.map((city) => (
              <option selected={selectedCity === city._id} value={city._id}>
                {city.name}
              </option>
            ))}
        </select>
        <Button>Spara</Button>
      </form>
    </>
  );
};

export default City;
