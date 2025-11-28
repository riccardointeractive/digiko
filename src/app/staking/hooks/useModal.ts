import { useState } from 'react';
import { TransactionStatus } from '@/components/TransactionModal';
import { ErrorLog } from '@/types/errorLog';

/**
 * Custom hook for managing transaction modal state
 */
export function useModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<TransactionStatus>('loading');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalTxHash, setModalTxHash] = useState<string | undefined>(undefined);
  const [modalErrorLog, setModalErrorLog] = useState<ErrorLog | undefined>(undefined);

  const showSuccessModal = (title: string, message?: string, txHash?: string) => {
    setModalStatus('success');
    setModalTitle(title);
    setModalMessage(message || '');
    setModalTxHash(txHash);
    setModalErrorLog(undefined);
    setModalOpen(true);
  };

  const showErrorModal = (title: string, message: string, errorLog?: ErrorLog) => {
    setModalStatus('error');
    setModalTitle(title);
    setModalMessage(message);
    setModalTxHash(undefined);
    setModalErrorLog(errorLog);
    setModalOpen(true);
  };

  const showLoadingModal = (title: string, message?: string) => {
    setModalStatus('loading');
    setModalTitle(title);
    setModalMessage(message || '');
    setModalTxHash(undefined);
    setModalErrorLog(undefined);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalTxHash(undefined);
    setModalErrorLog(undefined);
  };

  return {
    modalOpen,
    modalStatus,
    modalTitle,
    modalMessage,
    modalTxHash,
    modalErrorLog,
    showSuccessModal,
    showErrorModal,
    showLoadingModal,
    closeModal,
  };
}
