import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapComponent = () => {
  const mapContainerStyle = {
    width: '100%',
    height: 'auto' 
  };

  const center = {
    lat: 21.028511, // Vĩ độ
    lng: 105.804817 // Kinh độ
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      />
    </LoadScript>
  );
};

export default MapComponent;
