import './Search.css'; 
import React, { useState, useEffect, useCallback } from "react";
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
  const [cache, setCache] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Restore search details if redirected
    const savedSearch = JSON.parse(localStorage.getItem("searchDetails"));
    if (savedSearch) {
      setFrom(savedSearch.from);
      setTo(savedSearch.to);
      setDate(savedSearch.date);
      setTime(savedSearch.time);
      localStorage.removeItem("searchDetails"); // Remove after restoring
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
    if (cache[query]) {
      setSuggestions(cache[query]);
      return;
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}, Maharashtra, India`
      );
      const places = response.data.slice(0, 5);
      setSuggestions(places);
      setCache((prevCache) => ({ ...prevCache, [query]: places }));
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  }, [cache]);

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleSelectPlace = (place, setLocation, setSuggestions) => {
    setLocation(place.display_name);
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (!from || !to || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }

    const isAuthenticated = localStorage.getItem("token"); // Check login token

    if (!isAuthenticated) {
      // Save search details before redirecting
      localStorage.setItem("searchDetails", JSON.stringify({ from, to, date, time }));
      alert("Please sign up or log in to continue.");
      navigate("/signup"); // Redirect to signup/login
      return;
    }

    const queryParams = new URLSearchParams({ from, to, date, time }).toString();
    navigate(`/driver-list?${queryParams}`);
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
                <li
                  key={place.place_id}
                  onClick={() => handleSelectPlace(place, setFrom, setFromSuggestions)}
                >
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
                <li
                  key={place.place_id}
                  onClick={() => handleSelectPlace(place, setTo, setToSuggestions)}
                >
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
