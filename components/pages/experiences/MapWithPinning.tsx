"use client";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component integrates Google Maps into the application, allowing users to pin locations 
 * on the map and retrieve detailed location data through reverse geocoding. The `MapWithPinning` component 
 * provides an interactive map for selecting a location, capturing latitude, longitude, country, region, and 
 * city information, and passing the selected location to a callback function. It also demonstrates the use 
 * of Google's AdvancedMarkerElement for custom map markers.
 */

import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

type Pin = {
  lat: number;
  lng: number;
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

// Define libraries and Map ID as constants
const LIBRARIES: ["marker"] = ["marker"];
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string;

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
  const [pin, setPin] = useState<Pin | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 }); // Initial map center
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null); // Store map instance

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: LIBRARIES, // Use the static LIBRARIES constant
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
        components.forEach((component: AddressComponent) => {
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

      onLocationSelect({ lat, lng, country, region, city });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "250px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter}
        zoom={2}
        onClick={handleMapClick}
        onLoad={(map) => setMapInstance(map)} // Capture map instance
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapId: MAP_ID, // Use your Map ID
        }}
      >
        {pin && mapInstance && (
          <AdvancedMarker position={pin} mapInstance={mapInstance} />
        )}
      </GoogleMap>
    </div>
  );
}

function AdvancedMarker({
  position,
  mapInstance,
}: {
  position: Pin;
  mapInstance: google.maps.Map;
}) {
  React.useEffect(() => {
    if (!mapInstance) return;

    const { AdvancedMarkerElement } = google.maps.marker;

    // Create and add AdvancedMarkerElement to the map
    const marker = new AdvancedMarkerElement({
      position,
      map: mapInstance, // Pass the existing map instance
      title: "Custom Marker",
    });

    return () => {
      marker.map = null; // Clean up the marker
    };
  }, [position, mapInstance]);

  return null;
}
