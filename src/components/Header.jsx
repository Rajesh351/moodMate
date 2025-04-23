import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Cloud, Menu, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { setTemp } from "../redux/userSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [weather, setWeather] = useState({
    location: "Loading...",
    temp: "--°C",
    condition: "sunny",
  });
  const dispatch=useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "4d61e766bc3a46bccdc39374330c6067"; // Replace this

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();
        setWeather({
          location: data.name,
          temp: Math.round(data.main.temp) + "°C",
          condition: data.weather[0].main.toLowerCase(),
        });
        dispatch(setTemp(Math.round(data.main.temp) + "°C"));
      },
      () => {
        setWeather((prev) => ({ ...prev, location: "Permission denied" }));
      }
    );
  }, []);

  const getWeatherIcon = () => {
    return weather.condition.includes("cloud")
      ? <Cloud className="text-blue-400" />
      : <Sun className="text-yellow-500" />;
  };

  return (
    <header className="bg-orange-400 shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-orange-600">ModeMate</Link>

      <nav className="hidden md:flex space-x-6 items-center">
        <Link to="/showall" className="text-gray-700 hover:text-blue-500">All Notes</Link>
        <Link to="/create" className="text-gray-700 hover:text-blue-500">Create Note</Link>
        <div className="flex items-center space-x-1">
          {getWeatherIcon()}
          <span className="text-gray-600 text-sm">{weather.temp} | {weather.location}</span>
        </div>
      </nav>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md flex flex-col space-y-4 px-4 py-3 md:hidden z-50">
          <Link to="/showall" className="text-gray-700 hover:text-blue-500">All Notes</Link>
          <Link to="/create" className="text-gray-700 hover:text-blue-500">Create Note</Link>
          <div className="flex items-center space-x-1">
            {getWeatherIcon()}
            <span className="text-gray-600 text-sm">{weather.temp} | {weather.location}</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
