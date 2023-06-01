import { getInitState } from '@/utils';
import { useRef, useState } from 'react';
import FlipMove from 'react-flip-move';
import ProductCard from './ProductCard.tsx';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

const initProducts = Array.from<unknown, Product>({ length: 6 }, () => ({
  id: crypto.randomUUID(),
  name: 'Shoes',
  description: 'If a dog chews shoes whose shoes does he choose?',
  image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  price: 11,
}));

const PRODUCTS = 'products';

const wrapperClass =
  'grid grid-cols-1 min-[840px]:grid-cols-2 min-[1180px]:grid-cols-3 min-[1520px]:grid-cols-4 gap-6 rounded-2xl p-8';
const itemClass = 'justify-self-center w-80 h-[400px]';

export default function Products() {
  const [items, setItems] = useState(getInitState<Product[]>(PRODUCTS, initProducts, false));
  const [isDragging, setIsDragging] = useState(false);

  const originalItems = useRef(items);
  const dragItemIndex = useRef(-1);
  const dragOverItemIndex = useRef(-1);

  const updateItems = () => {
    if (originalItems.current[dragItemIndex.current] === items[dragOverItemIndex.current]) return;

    const newItems = [...originalItems.current];

    newItems.splice(dragOverItemIndex.current, 0, newItems.splice(dragItemIndex.current, 1)[0]);
    setItems(newItems);
  };

  return (
    <section onDragOver={(event) => event.preventDefault()}>
      <FlipMove className={`${wrapperClass} bg-gray-300`}>
        {items.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className={`${itemClass} transition-opacity delay-[5ms] ${
              isDragging && originalItems.current[dragItemIndex.current] === item ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <ProductCard {...item} />
          </div>
        ))}

        <div className={`${wrapperClass} absolute inset-0 flex flex-wrap gap-6`}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={itemClass}
              draggable
              onDragStart={(event) => {
                originalItems.current = items;
                dragItemIndex.current = index;

                event.dataTransfer.effectAllowed = 'move';
                const draggedEl = document.getElementById(item.id);
                if (draggedEl) {
                  event.dataTransfer.setDragImage(draggedEl, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
                }

                setIsDragging(true);
              }}
              onDragOver={() => {
                dragOverItemIndex.current = index;
                updateItems();
              }}
              onDragEnd={() => setIsDragging(false)}
            />
          ))}
        </div>
      </FlipMove>
    </section>
  );
}
