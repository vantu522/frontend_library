import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const mapStyles = {
    height: "400px",
    width: "100%"
  };
  
  // Tọa độ mới (ví dụ: Hà Nội)
  const defaultCenter = {
    lat: 21.04639,
    lng: 105.79221 
  };

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter} // Vị trí bản đồ
      >
        <Marker position={defaultCenter} /> {/* Vị trí Marker */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
