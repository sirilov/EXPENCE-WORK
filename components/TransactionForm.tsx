
import React, { useState } from 'react';
import { TransactionType } from '../types';
import { EXPENSE_CATEGORIES } from '../constants';

interface TransactionFormProps {
  onAddTransaction: (transaction: { description: string; amount: number; type: TransactionType; category: string; }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>(TransactionType.Expense);
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!description || !numericAmount || numericAmount <= 0) {
      alert('Please fill in all fields with valid values.');
      return;
    }
    onAddTransaction({
      description,
      amount: numericAmount,
      type,
      category: type === TransactionType.Expense ? category : 'Income',
    });
    setDescription('');
    setAmount('');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
      <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          <button type="button" onClick={() => setType(TransactionType.Expense)} className={`w-full py-2 rounded-lg font-semibold transition-colors ${type === TransactionType.Expense ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            Expense
          </button>
          <button type="button" onClick={() => setType(TransactionType.Income)} className={`w-full py-2 rounded-lg font-semibold transition-colors ${type === TransactionType.Income ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            Income
          </button>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-400">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            placeholder={type === TransactionType.Expense ? "e.g., Groceries" : "e.g., Monthly Salary"}
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-400">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            placeholder="0.00"
            step="0.01"
          />
        </div>
        {type === TransactionType.Expense && (
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-400">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            >
              {EXPENSE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        )}
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
