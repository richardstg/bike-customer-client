import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const City = (props) => {
  const [selectedCity, setSelectedCity] = useState(props.currentCity);
  const [cities, setCities] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveHandler = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    setSuccess(false);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${props.userId}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            headers: { "x-access-token": props.token },
          },
          body: JSON.stringify([{ propName: "city", value: selectedCity }]),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    } catch (err) {
      setError(true);
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 1000);
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
              headers: { "x-access-token": props.token },
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
        setError(true);
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
              headers: { "x-access-token": props.token },
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
        setError(true);
        setLoading(false);
      }
    };
    props.currentCity === "unknown"
      ? setSelectedCity("61a7603dbb53f131584de9b3")
      : getCurrentCity();
  }, [props.currentCity]);

  return (
    <>
      <div className="card bg-light border-light shadow-sm mb-3">
        <div className="card-body">
          <h5 className="card-title font-signature color-signature">Stad</h5>
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
            <button className="mt-2 mb-2 button-3 full-width">
              Spara{" "}
              {loading && (
                <ClipLoader
                  color={"#fffff"}
                  loading={loading}
                  // css={override}
                  size={20}
                />
              )}
            </button>
            {success && <p className="text-success">Stad sparad.</p>}
            {error && (
              <p className="text-danger">
                Ett fel uppstod. Försök igen senare.
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default City;
