// src/components/YourComponent.js
import React, { useEffect, useState } from 'react';
import api from '../components/api'; // Adjust the path as needed

const YourComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    api.get('/your-endpoint') // Replace '/your-endpoint' with your actual endpoint
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {/* Render your data here */}
      {data.map(item => (
        <div key={item.id}>{item.name}</div> // Adjust rendering based on your data structure
      ))}
    </div>
  );
};

export default YourComponent;
