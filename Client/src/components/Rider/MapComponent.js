import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({ ride }) => {
    const position = [19.9975, 73.7898]; // Default position (can be updated dynamically)

    return (
        <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>Driver's Live Location</Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
