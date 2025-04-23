import React, { useEffect, useState } from 'react';

// Mood to Tailwind color mapping
const moodColors = {
  "😊": "bg-green-100",
  "😌": "bg-yellow-100",
  "😟": "bg-blue-100",
  "😠": "bg-red-100",
  "😞": "bg-gray-200",
  "😃": "bg-teal-100",
  "🙂": "bg-yellow-100",
  "😐": "bg-gray-100"
};

// Fallback static data (only used if localStorage is empty)
const fallbackMoodData = [
  { emoji: "😊", text: "Felt great after my morning jog", date: "April 24, 2024" },
  { emoji: "😌", text: "Tired after a long day at work", date: "April 22, 2024", temp: "20°C" },
  { emoji: "😟", text: "A bit of a rough day", date: "April 23, 2024" },
  { emoji: "😠", text: "Traffic was terrible on the way home", date: "April 21, 2024", temp: "24°C" },
  { emoji: "😞", text: "Feeling down today", date: "April 20, 2024" },
  { emoji: "😃", text: "Had a nice time with friends", date: "April 19, 2024", temp: "22°C" }
];

const MoodCards = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedLogs = localStorage.getItem("moodLogs");
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs).reverse()); // Show latest first
    } else {
      setLogs(fallbackMoodData);
    }
  }, []);
console.log(logs)
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-300 p-4">
      <div className="max-w-6xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {logs.map((mood, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl shadow-md flex flex-col justify-between ${
              moodColors[mood.emoji] || "bg-white"
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-2xl">{mood.emoji}</span>
              <p className="font-semibold text-gray-800">{mood?.note}</p>
            </div>
            <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
              <span>{mood.date}</span>
              {mood.temperature && (
                <div className="flex items-center gap-1">
                  <span>🌤️</span>
                  <span>{mood.temperature}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodCards;
