
import React from 'react';

interface SummaryProps {
  income: number;
  expenses: number;
  savings: number;
}

const SummaryCard: React.FC<{ title: string; amount: number; colorClass: string; icon: React.ReactNode }> = ({ title, amount, colorClass, icon }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
      <div className={`p-3 rounded-full ${colorClass.replace('text-', 'bg-').replace('400', '400/20')}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <p className={`text-2xl font-bold ${colorClass}`}>${amount.toFixed(2)}</p>
      </div>
    </div>
  );
};


const Summary: React.FC<SummaryProps> = ({ income, expenses, savings }) => {
  const savingsColor = savings >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
      <SummaryCard 
        title="Total Income" 
        amount={income} 
        colorClass="text-green-400" 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>
        }
      />
      <SummaryCard 
        title="Total Expenses" 
        amount={expenses} 
        colorClass="text-orange-400"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
        }
      />
      <SummaryCard 
        title="Net Savings" 
        amount={savings} 
        colorClass={savingsColor}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        }
      />
    </div>
  );
};

export default Summary;
