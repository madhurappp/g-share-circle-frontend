import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "../lib/supabaseClient";
import L from "leaflet";

// Fix for default Leaflet marker icons not loading
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Item {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  isbn: string | null;
  image_url: string | null;
}

export default function LandingPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [position] = useState<[number, number]>([1.283, 103.851]); // Singapore CBD

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // prevent page reload when pressing Enter
    console.log("Searching nearby items for:", searchText);

    const { data, error } = await supabase.rpc("search_items_nearby", {
      lat: position[0],
      lon: position[1],
      radius_km: 5,
      search_text: searchText || null,
    });

    if (error) {
      console.error("Supabase error:", error);
      setError("Error fetching items. Try again later.");
      setItems([]);
    } else if (!data || data.length === 0) {
      setError("No items found nearby.");
      setItems([]);
    } else {
      setError(null);
      setItems(data);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-bold">Search Items Nearby</h1>

      {/* Wrap input + button inside a form */}
      <form onSubmit={handleSearch} className="flex space-x-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter item name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search Nearby
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <MapContainer
        center={position}
        zoom={14}
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg shadow"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>
              <strong>{item.title}</strong>
              <br />
              {item.description}
              {item.image_url && (
                <div className="mt-2">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              )}
              {item.isbn && <p className="text-xs mt-1">ISBN: {item.isbn}</p>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
