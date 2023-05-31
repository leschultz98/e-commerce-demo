import { useRef, useState } from 'react';
import FlipMove from 'react-flip-move';

const wrapperClass = 'flex flex-wrap gap-6 rounded-2xl p-8';
const itemClass = 'w-[400px] h-[400px]';

export default function Products() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);
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
            key={item}
            id={item}
            className={`${itemClass} bg-red-500 flex justify-center items-center transition-opacity delay-[5ms] ${
              isDragging && originalItems.current[dragItemIndex.current] === item ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {item}
          </div>
        ))}

        <div className={`${wrapperClass} absolute inset-0 flex flex-wrap gap-6`}>
          {items.map((item, index) => (
            <div
              key={item}
              className={itemClass}
              draggable
              onDragStart={(event) => {
                originalItems.current = items;
                dragItemIndex.current = index;

                event.dataTransfer.effectAllowed = 'move';
                const draggedEl = document.getElementById(item);
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
