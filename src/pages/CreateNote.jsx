import React, { useState, useEffect } from 'react';
import { CalendarDays, Filter } from 'lucide-react';
import { useSelector } from 'react-redux';

const moodColors = ['bg-green-100', 'bg-yellow-100', 'bg-gray-100', 'bg-red-100', 'bg-rose-100'];
const moods = ['😃', '🙂', '😐', '😠', '😞'];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [moodLogs, setMoodLogs] = useState([]);
  const {temp}=useSelector((state)=>state.auth)
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB'); // DD-MM-YYYY
  };

  useEffect(() => {
    const storedLogs = localStorage.getItem('moodLogs');
    if (storedLogs) {
      setMoodLogs(JSON.parse(storedLogs));
    }
  }, []);

  const handleSave = () => {
    if (selectedMood === null) {
      alert("Please select a mood.");
      return;
    }

    const moodData = {
      date: formatDate(date),
      emoji: moods[selectedMood],
      note,
      temperature: temp,
      weatherIcon: 'sunny',
    };

    const updatedLogs = [...moodLogs, moodData];
    setMoodLogs(updatedLogs);
    localStorage.setItem('moodLogs', JSON.stringify(updatedLogs));
    setNote('');
  };

  return (
    <div
      className={`rounded-xl shadow-xl p-6 w-full max-w-2xl h-[520px] mx-auto flex flex-col md:flex-row gap-6 transition-colors duration-500 ${
        selectedMood !== null ? moodColors[selectedMood] : 'bg-orange-100'
      }`}
    >
      {/* Left Side */}
      <div className="flex-1">
        <div className="text-center md:text-left">
          <input
            type="date"
            className="text-xl font-semibold text-gray-700 bg-transparent mb-1 outline-none"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>

        <p className="text-gray-600 mb-4 text-center md:text-left">How are you feeling today?</p>

        <div className="flex justify-between max-w-xs mx-auto md:mx-0">
          {moods.map((mood, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMood(idx)}
              className={`text-2xl hover:scale-110 transition-transform ${
                selectedMood === idx ? 'border-2 border-gray-400 rounded-full' : ''
              }`}
            >
              {mood}
            </button>
          ))}
        </div>

        <textarea
          className="mt-4 w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
          rows="2"
          placeholder="Add a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          className="mt-4 w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg transition"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      {/* Calendar */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-gray-700 font-semibold mb-3">
          <span className="flex items-center gap-1">
            <CalendarDays size={20} /> {date.toLocaleString('default', { month: 'long' })}
          </span>
          <Filter size={20} />
        </div>

        <div className="grid grid-cols-7 gap-2 text-sm text-center text-gray-600">
          {['S','M','T','W','T','F','S'].map(day => (
            <div key={day} className="font-bold">{day}</div>
          ))}

          {[...Array(30)].map((_, i) => {
            const dayNum = i + 1;
            const log = moodLogs.find(log => parseInt(log.date.split('-')[0]) === dayNum);

            return (
              <div key={i} className="relative">
                {dayNum}
                {log && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-lg">
                    {log.emoji}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
