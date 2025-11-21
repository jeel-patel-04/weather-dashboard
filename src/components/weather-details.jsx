import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Sunrise,
  Sunset,
  Compass,
  Gauge,
  CloudRain,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";
import React from "react";

const WeatherDetails = ({ data, air, forecast }) => {
  const { wind, main, sys } = data;

  // Format time safely
  const formatTime = (timestamp) =>
    timestamp ? format(new Date(timestamp * 1000), "h:mm a") : "--";

  // Wind degree → direction
  const getWindDirection = (degree) => {
    if (degree === undefined || degree === null) return "--";
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round((degree % 360) / 45) % 8];
  };

  // -----------------------------
  // ⭐ AQI (with full safety)
  // -----------------------------
  const aqiValue = air?.list?.[0]?.main?.aqi ?? null;

  const AQI_LEVELS = {
    1: { label: "Good", color: "text-green-500" },
    2: { label: "Fair", color: "text-lime-500" },
    3: { label: "Moderate", color: "text-yellow-500" },
    4: { label: "Poor", color: "text-orange-500" },
    5: { label: "Very Poor", color: "text-red-500" },
  };

  const aqi = aqiValue ? AQI_LEVELS[aqiValue] : null;

  // -----------------------------
  // ⭐ Rain probability (POP)
  // -----------------------------
  const firstSlot = forecast?.list?.[0];
  const rainPop = firstSlot?.pop != null ? Math.round(firstSlot.pop * 100) : 0;

  // -----------------------------
  // ⭐ Details list
  // -----------------------------
  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value:
        wind?.deg !== undefined
          ? `${getWindDirection(wind.deg)} (${wind.deg}°)`
          : "--",
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },

    // ⭐ AQI (show only if available)
    aqi && {
      title: "Air Quality",
      value: `${aqi.label} (AQI ${aqiValue})`,
      icon: AlertTriangle,
      color: aqi.color,
    },

    // ⭐ Rain POP
    {
      title: "Rain/Snow Probability",
      value: `${rainPop}%`,
      icon: CloudRain,
      color: "text-blue-600",
    },
  ].filter(Boolean); // remove null entries

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <detail.icon className={`h-5 w-5 ${detail.color}`} />

              <div>
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
