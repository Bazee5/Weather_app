import React, { useState } from "react";
import {
  Sun,
  CloudRain,
  Cloud,
  CloudSun,
  Zap,
  Snowflake,
  LocateFixed,
  MapPin,
  Thermometer,
  Eye
} from "lucide-react";

export const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");

  function handleCity(evt) {
    setCity(evt.target.value);
  }

  function getWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3f1e43f068bc5c72dbf00c347c62b95c&units=metric`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setWeather(data.weather[0].main);
        setTemperature(data.main.feels_like);
        setDesc(data.weather[0].description);
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
      });
  }

  const getIcon = () => {
    switch (weather.toLowerCase()) {
      case "clouds":
        return <CloudSun className="text-amber-500" size={48} />;
      case "rain":
        return <CloudRain className="text-blue-500" size={48} />;
      case "clear":
        return <Sun className="text-yellow-500" size={48} />;
      case "thunderstorm":
        return <Zap className="text-purple-500" size={48} />;
      case "snow":
        return <Snowflake className="text-cyan-400" size={48} />;
      default:
        return <Cloud className="text-slate-400" size={48} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-600 mb-2">
            Weather Analytics
          </h1>
          <p className="text-slate-500 text-lg">
            Professional weather insights for any location
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Search Section */}
          <div className="p-8 border-b border-slate-100">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  onChange={handleCity}
                  type="text"
                  value={city}
                  placeholder="Enter city name..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-slate-700 placeholder-slate-400"
                />
              </div>
              <button
                onClick={getWeather}
                className="bg-gradient-to-bl from-blue-600 to bg-amber-400 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl flex items-center gap-2 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
              >
                <LocateFixed size={20} />
                <span className="hidden sm:inline">Get Weather</span>
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-8">
            {weather || temperature || desc ? (
              <div className="space-y-6">
                {/* Weather Icon and Status */}
                {weather && (
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {getIcon()}
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-800 capitalize">
                      {weather}
                    </h2>
                  </div>
                )}

                {/* Weather Details */}
                <div className="grid gap-4">
                  {temperature && (
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Thermometer className="text-red-500" size={24} />
                        <span className="text-slate-600 font-medium">Temperature</span>
                      </div>
                      <span className="text-2xl font-semibold text-slate-800">
                        {temperature}°C
                      </span>
                    </div>
                  )}
                  
                  {desc && (
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <Eye className="text-blue-500" size={24} />
                        <span className="text-slate-600 font-medium">Description</span>
                      </div>
                      <span className="text-slate-800 font-medium capitalize">
                        {desc}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Cloud className="mx-auto text-slate-300 mb-4" size={64} />
                <p className="text-slate-500 text-lg">
                  Enter a city name to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-400 text-sm">
            Powered by OpenWeatherMap API
          </p>
        </div>
      </div>
    </div>
  );
};