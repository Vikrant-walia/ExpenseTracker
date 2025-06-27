import React, { createContext, useContext, useState } from 'react';

export type Transaction = {
  id: string;
  date: string;
  amount: string;
  description: string;
  location: string;
  type: string;
  category: string;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
};

const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  addTransaction: () => {},
});

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (tx: Transaction) => {
    setTransactions((prev) => [...prev, { ...tx, id: Date.now().toString() }]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};