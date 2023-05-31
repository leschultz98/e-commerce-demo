import EditIcon from '@mui/icons-material/Edit';
import { ReactNode, useEffect, useState } from 'react';
import Modal from './Modal.tsx';

interface Interface {
  initValue: string;
  save: (value: string) => void;
  children: ReactNode;
}

export default function EditWrapper({ initValue, save, children }: Interface) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initValue);

  const handleClose = () => {
    setOpen(false);
    setValue((v) => v.trim());
  };

  useEffect(() => {
    if (!open) setValue(initValue);
  }, [open, initValue]);

  return (
    <span className="relative">
      <span>{children}</span>

      <button
        className="absolute inset-0 flex justify-center items-center text-info opacity-0 hover:opacity-100 hover:bg-base-300/50"
        type="button"
        onClick={() => setOpen(true)}
      >
        <EditIcon />
      </button>

      <Modal open={open} onClose={handleClose}>
        <>
          <input
            type="text"
            placeholder="Type here"
            className="input input-primary w-full"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />

          <div className="flex justify-center gap-6 mt-6">
            <button
              className="btn btn-primary"
              onClick={() => {
                save(value.trim());
                handleClose();
              }}
              disabled={!value}
            >
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </>
      </Modal>
    </span>
  );
}
