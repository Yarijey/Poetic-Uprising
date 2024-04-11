//src/components/DraggableWordBox.js

import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableWordBox = ({ item, includeDetails }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "word",
    item: { word: item }, // Ensure 'item' is an object with the 'word' property
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Determine what to display based on includeDetails
  const displayContent = includeDetails && item ? `${item.word} (from "${item.title}" by ${item.author})` : item;

  return (
    <span ref={drag} className="word-box" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {displayContent}
    </span>
  );
};

export default DraggableWordBox;
