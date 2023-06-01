import { BUYER } from '@/constants';
import { useStore } from '@/hooks';
import { Product } from '.';

export default function ProductCard({ image, name, description, price }: Product) {
  const {
    state: { userType },
  } = useStore();

  return (
    <div className="card w-full h-full shadow-xl">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <div className="card-body bg-base-100">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between">
          <div className="text-secondary text-xl font-bold">{price} $</div>
          {userType === BUYER && <button className="btn btn-primary btn-sm">Buy Now</button>}
        </div>
      </div>
    </div>
  );
}
