import "./SearchBar.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const cache = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearch = JSON.parse(localStorage.getItem("searchDetails"));
    if (savedSearch) {
      setFrom(savedSearch.from || "");
      setTo(savedSearch.to || "");
      setDate(savedSearch.date || "");
      setTime(savedSearch.time || "");
      localStorage.removeItem("searchDetails");
    }
  }, []);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = useCallback(async (query, setSuggestions) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    if (cache.current[query]) {
      setSuggestions(cache.current[query]);
      return;
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}, Maharashtra, India`
      );
      const places = response.data.slice(0, 5);
      setSuggestions(places);
      cache.current[query] = places;
    } catch (error) {
      console.error("❌ Error fetching location suggestions:", error);
    }
  }, []);

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 200),
    [fetchSuggestions]
  );

  const handleSelectPlace = (place, setLocation, setSuggestions) => {
    setLocation(place.display_name);
    setSuggestions([]);
  };

  // Extracts only the first word (city name) from the location
  const extractCity = (location) => {
    return location?.split(",")[0].trim().toLowerCase() || "";
  };

  const handleSearch = () => {
    if (!from || !to) {
      alert("⚠️ Please enter both locations");
      return;
    }

    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      localStorage.setItem(
        "searchDetails",
        JSON.stringify({ from, to, date, time })
      );
      alert("🔐 Please sign up or log in to continue.");
      navigate("/signup");
      return;
    }

    // Retrieve drivers from local storage
    const storedDrivers = JSON.parse(localStorage.getItem("drivers")) || [];

    // Debugging: Log stored drivers
    console.log("🚗 All Stored Drivers:", storedDrivers);

    // Extract only the city names from search inputs
    const searchFrom = extractCity(from);
    const searchTo = extractCity(to);

    // Filter drivers based on the **city names** (not full address)
    const filteredDrivers = storedDrivers.filter(
      (driver) =>
        driver.from &&
        driver.to &&
        extractCity(driver.from) === searchFrom &&
        extractCity(driver.to) === searchTo
    );

    // Debugging: Log filtered drivers
    console.log("📌 Filtered Drivers:", filteredDrivers);

    // Store filtered drivers for use in DriverList.js
    localStorage.setItem("filteredDrivers", JSON.stringify(filteredDrivers));

    // Navigate to Driver List page
    navigate(`/driver-list?from=${searchFrom}&to=${searchTo}&date=${date}&time=${time}`);
  };

  return (
    <div className="search-container">
      <h2>Search for a Ride</h2>
      <div className="input-row">
        <div>
          <label>From:</label>
          <input
            type="text"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              debouncedFetchSuggestions(e.target.value, setFromSuggestions);
            }}
            placeholder="Enter departure location"
          />
          {fromSuggestions.length > 0 && (
            <ul className="suggestions">
              {fromSuggestions.map((place) => (
                <li key={place.place_id} onClick={() => handleSelectPlace(place, setFrom, setFromSuggestions)}>
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label>To:</label>
          <input
            type="text"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              debouncedFetchSuggestions(e.target.value, setToSuggestions);
            }}
            placeholder="Enter destination"
          />
          {toSuggestions.length > 0 && (
            <ul className="suggestions">
              {toSuggestions.map((place) => (
                <li key={place.place_id} onClick={() => handleSelectPlace(place, setTo, setToSuggestions)}>
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="date-time-row">
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="time-input">
          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <FaClock className="clock-icon" />
        </div>
      </div>

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};   

export default Search;
