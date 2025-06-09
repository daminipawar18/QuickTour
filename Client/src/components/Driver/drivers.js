const drivers = [
    { id: 1, name: "Damini Prakash Pawar", from: "Pune", to: "Nashik", route: "pune-nashik", vehicle: "Toyota Innova - MH12 AB 1234", price: 1200, rating: 4.7 },

    { id: 6, name: "Sameesh", from: "Mumbai", to: "Pune", route: "mumbai-pune", vehicle: "Hyundai i20 - MH14 XY 5678", price: 1500, rating: 4.8 },

    { id: 7, name: "Rushab", from: "Delhi", to: "Agra", route: "delhi-agra", vehicle: "Honda City - DL8C Z 9999", price: 1800, rating: 4.6 },
    
    { id: 16, name: "Ritika", from: "Pune", to: "Nashik", route: "pune-nashik", vehicle: "Maruti Swift - MH01 AB 4321", price: 1300, rating: 4.5 },

    { id: 16, name: "Ritika", from: "Nashik", to: "Mumbai", route: "Nashik-Mumbai", vehicle: "Maruti Swift - MH01 AB 4321", price: 1500, rating: 4.5 },

    { id: 16, name: "Ritika", from: "Hydrabad", to: "Mumbai", route: "Hydrabad-Mumbai", vehicle: "Maruti Swift - MH01 AB 4321", price: 1800, rating: 4.3 },
];




// Store drivers in local storage for use in other components
localStorage.setItem("drivers", JSON.stringify(drivers));

export default drivers;
