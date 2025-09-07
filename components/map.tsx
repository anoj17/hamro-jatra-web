"use client";

import { divIcon, PointExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import { FaLocationDot } from "react-icons/fa6";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const Map = () => {
  const markers = [
    { geocode: [27.7104, 85.3486], title: "Pashupatinath Temple" },
    { geocode: [27.67, 85.32], title: "Patan Temple" },
    { geocode: [27.67, 85.43], title: "Bhaktapur Temple" },
  ];

  const customIcon = divIcon({
    html: ReactDOMServer.renderToString(
      <div style={{ color: "red", fontSize: "24px" }}>
        <FaLocationDot />
      </div>
    ),
    className: "",
    iconSize: [24, 24],
  });

  const createClusterIcons = (cluster: any) => {
    return divIcon({
      html: `<div class="marker-cluster">${cluster.getChildCount()}</div>`,
      className: "", // Leaflet default class हटाउनुहोस्
      iconSize: [48, 48] as PointExpression,
      iconAnchor: [24, 24], // <-- icon center alignment
    });
  };

  return (
    <div className="h-[90vh]">
      <MapContainer center={[27.7153, 85.4347]} zoom={13} className="h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterIcons}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.geocode as [number, number]}
              icon={customIcon}
            >
              <Popup className="cursor-pointer">{marker.title}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
