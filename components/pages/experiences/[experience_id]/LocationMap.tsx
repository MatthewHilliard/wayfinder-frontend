"use client";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component renders a Google Map centered on a specific location, using the 
 * Google Maps JavaScript API. It displays a static marker at the provided latitude and longitude. 
 * The map integrates with the Google Maps API via the `@react-google-maps/api` library, with 
 * configuration options for a customized map style and UI controls. The component also includes 
 * error handling and loading states for seamless user experience.
 */

import React, { useRef } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { Location } from "@/types/Location";

type Pin = {
  lat: number;
  lng: number;
};

// Define libraries and Map ID as constants
const LIBRARIES: ["marker"] = ["marker"];
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID as string;

export default function LocationMap({ location }: { location: Location }) {
  const mapCenter = { lat: location.latitude, lng: location.longitude }; // Set map center from location
  const mapRef = useRef<google.maps.Map | null>(null); // Reference to the map instance

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: LIBRARIES, // Use static reference
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter}
        zoom={14}
        onLoad={handleMapLoad}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          mapId: MAP_ID,
        }}
      >
        <StaticMarker position={mapCenter} />
      </GoogleMap>
    </div>
  );
}

function StaticMarker({ position }: { position: Pin }) {
  return <MarkerF position={position} title="Pinned Location" />;
}
