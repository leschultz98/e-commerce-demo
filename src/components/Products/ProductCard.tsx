import { BUYER } from '@/constants';
import { useStore } from '@/hooks';
import { useState } from 'react';
import { Product } from '.';

interface Interface extends Product {
  count: number;
  onChangeCart: (id: string, count: number) => void;
}

export default function ProductCard({ id, image, name, description, price, count, onChangeCart }: Interface) {
  const {
    state: { userType },
  } = useStore();

  const [value, setValue] = useState(count);

  return (
    <div className="card w-full h-full shadow-xl">
      <figure>
        <img src={image} alt={name} />
      </figure>

      <div className="card-body bg-base-100">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>

        <div className="card-actions justify-between items-center">
          <div className="text-secondary text-xl font-bold">{price} $</div>

          {userType === BUYER &&
            (value ? (
              <input
                type="number"
                className="input input-bordered w-20"
                value={value}
                onChange={(event) => {
                  const v = parseInt(event.target.value);
                  setValue(v > 0 ? v : 0);
                  value > v && console.log(`%cDecrease product: ${name} - ${id}`, 'color:red; font-size:1rem');
                  value < v && console.log(`%cIncrease product: ${name} - ${id}`, 'color:green; font-size:1rem');
                  onChangeCart(id, v);
                }}
              />
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setValue(1);
                  console.log(`%cIncrease product: ${name} - ${id}`, 'color:green; font-size:1rem');
                  onChangeCart(id, 1);
                }}
              >
                Buy Now
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
