import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { api } from '../services/api';

interface Transaction {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createdAt: string
}

interface TransactionsProviderProps {
  children: ReactNode;
}

// Formas de fazer o TransactionInput
// interface TransactionInput {
//   title: string;
//   type: string;
//   category: string;
//   amount: number;
// }

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

// precisamos forçar a tipagem para enganar o typescript
const TransactionContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);


export const TransactionProvider = ({children}: TransactionsProviderProps) => {
  const  [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(responde => setTransactions(responde.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: Date.now()
    });

    const { transaction } = response.data;
    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionContext.Provider value={
      {
        transactions,
        createTransaction
      }
    }>
      {children}

    </TransactionContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionContext);

  return context;
}
