"use client";

import { useEffect, useRef } from "react";

// Declare global google types
declare global {
	interface Window {
		google: typeof google;
		googleMapsLoading?: boolean;
	}
}

interface MapProps {
	className?: string;
}

const Map = ({ className = "" }: MapProps) => {
	const mapRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<google.maps.Map | null>(null);

	useEffect(() => {
		const initMap = async () => {
			// Check if Google Maps is already loaded
			if (typeof google !== "undefined" && google.maps) {
				await createMap();
				return;
			}

			// Check if script is already being loaded or exists in DOM
			const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
			if (existingScript || window.googleMapsLoading) {
				// Wait for the existing script to load
				const checkGoogleLoaded = setInterval(() => {
					if (typeof google !== "undefined" && google.maps) {
						clearInterval(checkGoogleLoaded);
						createMap();
					}
				}, 100);
				return;
			}

			// Mark as loading
			window.googleMapsLoading = true;

			// Load Google Maps API
			const script = document.createElement("script");
			script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&v=weekly&libraries=maps`;
			script.async = true;
			script.defer = true;

			script.onload = async () => {
				window.googleMapsLoading = false;
				await createMap();
			};

			script.onerror = () => {
				window.googleMapsLoading = false;
				console.error("Google Maps JavaScript API could not load.");
			};

			document.head.appendChild(script);
		};

		const createMap = async () => {
			if (!mapRef.current || mapInstanceRef.current) return;

			const { Map: GoogleMap, StyledMapType } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
			const { Marker } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

			// Define the custom map style using the globals.css colors.
			const customMapStyle = [
				{
					featureType: "water",
					elementType: "geometry",
					stylers: [{ color: "#95916b" }], // foreground-light
				},
				{
					featureType: "landscape",
					elementType: "geometry",
					stylers: [{ color: "#f4f2e2" }], // background-dark
				},
				{
					featureType: "road",
					elementType: "geometry",
					stylers: [{ color: "#fffffa" }], // background
				},
				{
					featureType: "road",
					elementType: "labels.text.fill",
					stylers: [{ color: "#7a7442" }], // foreground
				},
				{
					featureType: "road",
					elementType: "labels.text.stroke",
					stylers: [{ visibility: "off" }],
				},
				{
					featureType: "poi",
					stylers: [{ visibility: "off" }],
				},
				{
					featureType: "transit",
					stylers: [{ visibility: "off" }],
				},
				{
					featureType: "administrative",
					elementType: "labels.text.fill",
					stylers: [{ color: "#7a7442" }], // foreground
				},
			];

			// Create a StyledMapType object.
			const styledMapType = new StyledMapType(customMapStyle, {
				name: "Custom Style",
			});

			// Define map options.
			const mapOptions = {
				center: { lng: -74.02801435807748, lat: 4.686403975979731 },
				zoom: 15,
				mapId: "DEMO_MAP_ID",
				// Disable ALL user interactions and controls
				gestureHandling: "none",
				zoomControl: false,
				disableDefaultUI: true,
				mapTypeControl: false,
				streetViewControl: false,
				fullscreenControl: false,
				rotateControl: false,
				scaleControl: false,
				panControl: false,
				scrollwheel: false,
				disableDoubleClickZoom: true,
				draggable: false,
				keyboardShortcuts: false,
				clickableIcons: false,
				// Set the custom map type as the default.
				mapTypeId: "styled_map",
			};

			// Create the map.
			const map = new GoogleMap(mapRef.current, mapOptions);

			// Associate the styled map with the MapTypeId and set it to display.
			map.mapTypes.set("styled_map", styledMapType);

			// Add a marker in the center of the map
			const marker = new Marker({
				position: { lng: -74.02801435807748, lat: 4.686403975979731 },
				map: map,
				title: "Center Location",
			});

			mapInstanceRef.current = map;
		};

		initMap();

		// Cleanup function
		return () => {
			// Don't destroy the map instance, just clear the reference
			mapInstanceRef.current = null;
		};
	}, []);

	return <div ref={mapRef} className={`block h-full ${className}`} style={{ height: "100%" }} />;
};

export default Map;
