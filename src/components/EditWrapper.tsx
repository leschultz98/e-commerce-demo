import EditIcon from '@mui/icons-material/Edit';
import { ReactNode, useMemo, useState } from 'react';
import { OWNER } from '../constants';
import useStore from '../hooks/useStore.ts';
import Modal from './Modal.tsx';

interface EditWrapperInterface {
  initValue: string;
  save: (value: string) => void;
  children: ReactNode;
}

interface EditorInterface {
  initValue: string;
  save: (value: string) => void;
  onClose: () => void;
}

function Editor({ initValue, save, onClose }: EditorInterface) {
  const [value, setValue] = useState(initValue);

  return (
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

export default function EditWrapper({ initValue, save, children }: EditWrapperInterface) {
  const {
    state: { userType },
  } = useStore();

  const editable = useMemo(() => userType === OWNER, [userType]);

  const [open, setOpen] = useState(false);

  return (
    <span className="relative">
      <span>{children}</span>

      {editable && (
        <button
          className="absolute inset-0 flex justify-center items-center text-info opacity-0 hover:opacity-100 hover:bg-base-300/50"
          type="button"
          onClick={() => setOpen(true)}
        >
          <EditIcon />
        </button>
      )}

      {open && (
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Editor
            initValue={initValue}
            save={save}
            onClose={() => {
              setOpen(false);
            }}
          />
        </Modal>
      )}
    </span>
  );
}
