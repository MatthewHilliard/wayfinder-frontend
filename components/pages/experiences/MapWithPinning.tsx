"use client";

import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type Pin = {
  lat: number;
  lng: number;
};

export default function MapWithPinning({
  onLocationSelect,
}: {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    country?: string;
    region?: string;
    city?: string;
  }) => void;
}) {
  // State to manage the pin location
  const [pin, setPin] = useState<Pin | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 }); // Initial map center

  // Load the Google Maps API using the useJsApiLoader hook
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Update pin and map center
      setPin({ lat, lng });
      setMapCenter({ lat, lng });

      // Reverse geocoding to get location details
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      let country, region, city;
      if (data.results?.[0]) {
        const components = data.results[0].address_components;
        components.forEach((component: any) => {
          if (component.types.includes("country")) {
            country = component.long_name;
          }
          if (component.types.includes("administrative_area_level_1")) {
            region = component.long_name;
          }
          if (component.types.includes("locality")) {
            city = component.long_name;
          }
        });
      }

      // Pass location details to parent
      onLocationSelect({ lat, lng, country, region, city });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "250px",
        borderRadius: "12px", // Rounded corners
        overflow: "hidden", // Ensures the map respects the border-radius
      }}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter} // Dynamically updated center
        zoom={2}
        onClick={handleMapClick}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {pin && <Marker position={pin} />}
      </GoogleMap>
    </div>
  );
}
