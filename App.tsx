
import React, { useState, useMemo, useCallback } from 'react';
import { Transaction, TransactionType } from './types';
import Header from './components/Header';
import Summary from './components/Summary';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import ExpenseChart from './components/ExpenseChart';
import SavingsTips from './components/SavingsTips';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const { income, expenses, savings } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.Income)
      .reduce((acc, t) => acc + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === TransactionType.Expense)
      .reduce((acc, t) => acc + t.amount, 0);

    const savings = income - expenses;
    return { income, expenses, savings };
  }, [transactions]);
  
  const expenseTransactions = useMemo(() => 
    transactions.filter(t => t.type === TransactionType.Expense),
  [transactions]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <Summary income={income} expenses={expenses} savings={savings} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TransactionForm onAddTransaction={addTransaction} />
            <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
          </div>
          <div className="space-y-8">
            <ExpenseChart transactions={expenseTransactions} />
            <SavingsTips expenses={expenseTransactions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
