import { useEffect } from 'react';
import { LayersControl, MapContainer, Polygon, TileLayer, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LocateFixed, Maximize2 } from 'lucide-react';
import { PARCEL_STATUS_COLORS } from '../../data/parcels';

const PUNE_CENTER = [18.672, 73.89];

function MapFocus({ parcel }) {
  const map = useMap();
  useEffect(() => {
    if (parcel?.geojson?.geometry?.coordinates?.[0]) {
      map.fitBounds(parcel.geojson.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]), { padding: [40, 40], maxZoom: 16 });
    }
  }, [map, parcel]);
  return null;
}

function MapActions({ parcels }) {
  const map = useMap();
  const fitAll = () => {
    if (parcels.length) map.fitBounds(parcels.flatMap((p) => p.geojson.geometry.coordinates[0].map(([lng, lat]) => [lat, lng])), { padding: [30, 30] });
  };
  const toggleFullscreen = () => {
    const container = map.getContainer();
    if (document.fullscreenElement) document.exitFullscreen?.();
    else container.requestFullscreen?.();
  };
  return (
    <div className="absolute right-3 top-3 z-[500] flex flex-col gap-2">
      <button type="button" title="Show displayed parcels" onClick={fitAll} className="rounded-md bg-white p-2 shadow-md hover:bg-gray-50"><LocateFixed size={17} /></button>
      <button type="button" title="Full screen" onClick={toggleFullscreen} className="rounded-md bg-white p-2 shadow-md hover:bg-gray-50"><Maximize2 size={17} /></button>
    </div>
  );
}

export default function ParcelMap({ parcels, selectedParcel, onSelect }) {
  return (
    <MapContainer center={PUNE_CENTER} zoom={10} className="gis-map h-[440px] w-full rounded-lg sm:h-[560px]" scrollWheelZoom>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenTopoMap">
          <TileLayer attribution="Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap" url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
      </LayersControl>
      {parcels.map((parcel) => {
        const positions = parcel.geojson.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]);
        const color = PARCEL_STATUS_COLORS[parcel.acquisitionStatus];
        const active = selectedParcel?.id === parcel.id;
        return (
          <Polygon
            key={parcel.id}
            positions={positions}
            pathOptions={{ color, fillColor: color, fillOpacity: active ? 0.68 : 0.42, weight: active ? 4 : 2 }}
            eventHandlers={{ click: () => onSelect(parcel) }}
          >
            <Tooltip sticky>{parcel.id} · Survey {parcel.surveyNumber}</Tooltip>
          </Polygon>
        );
      })}
      <MapFocus parcel={selectedParcel} />
      <MapActions parcels={parcels} />
    </MapContainer>
  );
}
