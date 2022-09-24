import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";

import { GlobalStyle } from "./styles/global";
import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root');

export function App() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  function handleOpenTranctionModal() {
    setIsTransactionModalOpen(true);
  }

  function handleCloseTranctionModal() {
    setIsTransactionModalOpen(false);
  }

  return (
    <TransactionProvider>

      <Header onOpenTransactionModal={handleOpenTranctionModal}/>
      <Dashboard />

      <NewTransactionModal
        isOpen={isTransactionModalOpen}
        onRequestClose={handleCloseTranctionModal}
      />

      <GlobalStyle/>
    </TransactionProvider>
  );
}
