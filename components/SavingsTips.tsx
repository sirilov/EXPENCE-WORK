
import React, { useState, useCallback } from 'react';
import { Transaction } from '../types';
import getSavingsTips from '../services/geminiService';

interface SavingsTipsProps {
  expenses: Transaction[];
}

const SavingsTips: React.FC<SavingsTipsProps> = ({ expenses }) => {
  const [tips, setTips] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFetchTips = useCallback(async () => {
    setLoading(true);
    setError('');
    setTips('');
    try {
      const generatedTips = await getSavingsTips(expenses);
      setTips(generatedTips);
    } catch (err) {
      setError('Failed to fetch savings tips. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [expenses]);

  const formattedTips = tips.split('\n').map(line => line.replace(/^\* ?/, '')).filter(line => line.trim() !== '');

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Gemini Savings Tips</h2>
      {tips && (
        <ul className="space-y-3 text-gray-300 list-disc list-inside mb-4">
          {formattedTips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      )}
      {loading && (
        <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <p className="ml-3 text-gray-400">Generating personalized tips...</p>
        </div>
      )}
       {error && <p className="text-red-400 text-sm">{error}</p>}
      
      <button
        onClick={handleFetchTips}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {loading ? 'Analyzing...' : 'Get Smart Savings Tips'}
      </button>
    </div>
  );
};

export default SavingsTips;
