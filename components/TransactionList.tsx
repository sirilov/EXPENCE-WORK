
import React from 'react';
import { Transaction, TransactionType } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionItem: React.FC<{ transaction: Transaction; onDelete: (id: string) => void }> = ({ transaction, onDelete }) => {
  const isIncome = transaction.type === TransactionType.Income;
  const amountColor = isIncome ? 'text-green-400' : 'text-orange-400';
  const sign = isIncome ? '+' : '-';

  return (
    <li className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
      <div className="flex-1">
        <p className="font-semibold text-white">{transaction.description}</p>
        <p className="text-sm text-gray-400">{transaction.category}</p>
      </div>
      <div className="flex items-center space-x-4">
        <p className={`font-bold ${amountColor}`}>{sign}${transaction.amount.toFixed(2)}</p>
        <button onClick={() => onDelete(transaction.id)} className="text-gray-500 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </li>
  );
};


const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No transactions yet. Add one above to get started!</p>
      ) : (
        <ul className="space-y-3">
          {transactions.slice().reverse().map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDeleteTransaction} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
