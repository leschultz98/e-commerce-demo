import { OWNER } from '@/constants';
import { useStore } from '@/hooks';
import EditIcon from '@mui/icons-material/Edit';
import { ReactNode, useState } from 'react';
import Modal from '../Common/Modal.tsx';

interface EditorI {
  title: string;
  initValue: string;
  save: (value: string) => void;
}

interface EditWrapperInterface extends EditorI {
  children: ReactNode;
}

interface EditorInterface extends EditorI {
  onClose: () => void;
}

function Editor({ title, initValue, save, onClose }: EditorInterface) {
  const [value, setValue] = useState(initValue);

  return (
    <>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{title}</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-primary w-full"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <button
          className="btn btn-primary"
          onClick={() => {
            save(value.trim());
            onClose();
          }}
          disabled={!value}
        >
          Save
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default function EditWrapper({ children, ...props }: EditWrapperInterface) {
  const {
    state: { userType },
  } = useStore();

  const [open, setOpen] = useState(false);

  return (
    <span className="relative">
      <span>{children}</span>

      {userType === OWNER && (
        <button
          className="absolute inset-0 flex justify-center items-center text-info opacity-0 hover:opacity-100 hover:bg-base-300/50"
          type="button"
          onClick={() => setOpen(true)}
        >
          <EditIcon />
        </button>
      )}

      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <Editor {...props} onClose={() => setOpen(false)} />
        </Modal>
      )}
    </span>
  );
}
