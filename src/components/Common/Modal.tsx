import { Modal } from '@mui/material';
import { ReactNode } from 'react';

interface Interface {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalCustom({ open, onClose, children }: Interface) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] mx-auto rounded-2xl p-6 bg-base-100">
        {children}
      </div>
    </Modal>
  );
}
