import { useState } from 'react';
import { TransactionStatus } from '../types/swap.types';

/**
 * useSwapModal Hook
 * Manages transaction modal state and helpers
 */
export function useSwapModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<TransactionStatus>('loading');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalTxHash, setModalTxHash] = useState<string | undefined>(undefined);
  
  const showSuccessModal = (title: string, message?: string, txHash?: string) => {
    setModalStatus('success');
    setModalTitle(title);
    setModalMessage(message || '');
    setModalTxHash(txHash);
    setModalOpen(true);
  };

  const showErrorModal = (title: string, message: string) => {
    setModalStatus('error');
    setModalTitle(title);
    setModalMessage(message);
    setModalTxHash(undefined);
    setModalOpen(true);
  };

  const showLoadingModal = (title: string, message?: string) => {
    setModalStatus('loading');
    setModalTitle(title);
    setModalMessage(message || '');
    setModalTxHash(undefined);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalTxHash(undefined);
  };
  
  return {
    modalOpen,
    modalStatus,
    modalTitle,
    modalMessage,
    modalTxHash,
    showSuccessModal,
    showErrorModal,
    showLoadingModal,
    closeModal,
  };
}
