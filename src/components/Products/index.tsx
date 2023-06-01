import { OWNER } from '@/constants';
import { useStore } from '@/hooks';
import { getInitState, setLocalData } from '@/utils';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useEffect, useRef, useState } from 'react';
import FlipMove from 'react-flip-move';
import AddProduct from './AddProduct.tsx';
import ProductCard from './ProductCard.tsx';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

type Cart = Record<string, number>;

const initProducts = Array.from<unknown, Product>({ length: 6 }, () => ({
  id: crypto.randomUUID(),
  name: 'Shoes',
  description: 'If a dog chews shoes whose shoes does he choose?',
  image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  price: 11,
}));

const PRODUCTS = 'products';
const CART = 'cart';

const wrapperClass =
  'grid grid-cols-1 min-[840px]:grid-cols-2 min-[1180px]:grid-cols-3 min-[1520px]:grid-cols-4 gap-6 rounded-2xl p-8';
const itemClass = 'justify-self-center w-80 max-w-full h-[400px]';

export default function Products() {
  const {
    state: { userType },
  } = useStore();

  const [products, setProducts] = useState(getInitState<Product[]>(PRODUCTS, initProducts, false));
  const [cart, setCart] = useState(getInitState<Cart>(CART, {}, false));
  const [isAdd, setIsAdd] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isReOrder, setIsReOrder] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const originalItems = useRef(products);
  const dragItemIndex = useRef(-1);
  const dragOverItemIndex = useRef(-1);

  useEffect(() => {
    setLocalData(PRODUCTS, products, false);
  }, [products]);

  const reOrderProducts = () => {
    if (originalItems.current[dragItemIndex.current] === products[dragOverItemIndex.current]) return;

    const newItems = [...originalItems.current];

    newItems.splice(dragOverItemIndex.current, 0, newItems.splice(dragItemIndex.current, 1)[0]);
    setProducts(newItems);
  };

  const updateCart = (id: string, count: number) => {
    const result = { ...cart, [id]: count };
    if (!count) delete result[id];

    setCart(result);
    setLocalData(CART, result, false);

    const log: Cart = {};
    for (const [id, count] of Object.entries(result)) {
      const match = products.find((p) => p.id === id);
      if (match) log[`${match.name} - ${match.id}`] = count;
    }
    console.log('%cCart', 'color:blue; font-size:1.5rem');
    console.table(log);
  };

  return (
    <section onDragOver={(event) => event.preventDefault()}>
      {userType === OWNER && (
        <div className="flex flex-wrap gap-4 mb-4">
          <button className="btn btn-primary" type="button" onClick={() => setIsAdd(true)}>
            Add product
          </button>
          {isAdd && (
            <AddProduct
              onAdd={(product) => setProducts((items) => [...items, product])}
              onClose={() => setIsAdd(false)}
            />
          )}

          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              setIsRemove((v) => !v);
              if (isReOrder) setIsReOrder((v) => !v);
            }}
          >
            {isRemove ? 'Cancel ' : ''}Remove product
          </button>

          <button
            className="btn btn-accent"
            type="button"
            onClick={() => {
              setIsReOrder((v) => !v);
              if (isRemove) setIsRemove((v) => !v);
            }}
          >
            {isReOrder ? 'Cancel ' : ''}Re-order products
          </button>
        </div>
      )}

      <FlipMove className={`${wrapperClass} bg-gray-300`}>
        {products.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className={`${itemClass} transition-opacity delay-[5ms] ${
              isDragging && originalItems.current[dragItemIndex.current] === item ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <ProductCard {...item} count={cart[item.id] || 0} onChangeCart={updateCart} />
          </div>
        ))}

        {userType === OWNER && (
          <div className={`${wrapperClass} absolute inset-0 flex flex-wrap gap-6`}>
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`${itemClass} ${
                  isRemove
                    ? 'flex justify-center items-center cursor-pointer text-error opacity-0 hover:opacity-100 hover:bg-base-300/50'
                    : ''
                } ${isReOrder ? 'cursor-grab' : ''}`}
                draggable
                onDragStart={(event) => {
                  if (!isReOrder) {
                    event.preventDefault();
                    return;
                  }
                  originalItems.current = products;
                  dragItemIndex.current = index;

                  event.dataTransfer.effectAllowed = 'move';
                  const draggedEl = document.getElementById(product.id);
                  if (draggedEl) {
                    event.dataTransfer.setDragImage(draggedEl, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
                  }

                  setIsDragging(true);
                }}
                onDragOver={() => {
                  dragOverItemIndex.current = index;
                  reOrderProducts();
                }}
                onDragEnd={() => setIsDragging(false)}
                onClick={() => {
                  if (isRemove) setProducts((v) => v.filter((p) => p !== product));
                }}
              >
                {isRemove && <DeleteRoundedIcon fontSize="large" />}
              </div>
            ))}
          </div>
        )}
      </FlipMove>
    </section>
  );
}
