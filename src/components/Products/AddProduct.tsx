import { useState } from 'react';
import { Product } from '.';
import Modal from '../Common/Modal.tsx';

interface Interface {
  onClose: () => void;
  onAdd: (p: Product) => void;
}

export default function AddProduct({ onClose, onAdd }: Interface) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);

  return (
    <Modal open={true} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAdd({ id: crypto.randomUUID(), name, description, image, price });
          onClose();
        }}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product image</span>
          </label>
          <input
            type="text"
            placeholder="product image url"
            className="input input-bordered"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
          {!!image && <img src={image} alt="product image" className="h-60 object-contain my-2" />}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Product name</span>
          </label>
          <input
            type="text"
            placeholder="product name"
            className="input input-bordered"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea input-bordered"
            placeholder="desctiption"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Product name</span>
          </label>
          <input
            type="number"
            placeholder="price"
            className="input input-bordered"
            value={price}
            onChange={(event) => setPrice(parseFloat(event.target.value))}
          />
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button type="submit" className="btn btn-primary" disabled={!name || !description || !image || !price}>
            Add
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
