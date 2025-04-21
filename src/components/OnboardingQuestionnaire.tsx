import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

interface OnboardingData {
  name: string;
  mood: string;
  favoriteGenre: string;
  readingGoal: string;
}

interface OnboardingQuestionnaireProps {
  onComplete: (data: OnboardingData) => void;
}

const moods = ['Happy', 'Curious', 'Relaxed', 'Excited', 'Thoughtful'];

const genres = ['Classic', 'Fantasy', 'Science Fiction', 'Romance', 'Dystopian', 'Non-fiction'];

const OnboardingQuestionnaire: React.FC<OnboardingQuestionnaireProps> = ({ onComplete }) => {
  const { setUserInfo, addPoints, addBadge } = useUser();

  const [name, setName] = useState('');
  const [mood, setMood] = useState(moods[0]);
  const [favoriteGenre, setFavoriteGenre] = useState(genres[0]);
  const [readingGoal, setReadingGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserInfo({ name, mood, favoriteGenre, readingGoal });
    addPoints(10); // Reward points for completing onboarding
    addBadge('Getting Started');
    onComplete({ name, mood, favoriteGenre, readingGoal });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome! Let's get to know you</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">What's your name?</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="mood" className="block font-medium mb-1">How are you feeling today?</label>
            <select
              id="mood"
              value={mood}
              onChange={e => setMood(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {moods.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="favoriteGenre" className="block font-medium mb-1">What's your favorite genre?</label>
            <select
              id="favoriteGenre"
              value={favoriteGenre}
              onChange={e => setFavoriteGenre(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="readingGoal" className="block font-medium mb-1">What's your reading goal?</label>
            <input
              id="readingGoal"
              type="text"
              value={readingGoal}
              onChange={e => setReadingGoal(e.target.value)}
              placeholder="E.g., Read 10 books this year"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-2 rounded hover:bg-pink-600 transition"
          >
            Start Reading
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;
