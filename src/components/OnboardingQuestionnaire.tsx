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
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-10 max-w-md w-full shadow-2xl ring-1 ring-gray-300 dark:ring-gray-700">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-pink-600 dark:text-pink-400">Welcome! Let's get to know you</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">What's your name?</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="mood" className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">How are you feeling today?</label>
            <select
              id="mood"
              value={mood}
              onChange={e => setMood(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            >
              {moods.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="favoriteGenre" className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">What's your favorite genre?</label>
            <select
              id="favoriteGenre"
              value={favoriteGenre}
              onChange={e => setFavoriteGenre(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            >
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="readingGoal" className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">What's your reading goal?</label>
            <input
              id="readingGoal"
              type="text"
              value={readingGoal}
              onChange={e => setReadingGoal(e.target.value)}
              placeholder="E.g., Read 10 books this year"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-4 focus:ring-pink-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-extrabold py-3 rounded-lg hover:bg-pink-700 transition duration-300"
          >
            Start Reading
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingQuestionnaire;
