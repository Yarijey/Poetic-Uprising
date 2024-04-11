//src/components/PoemDropZone.js

import React from 'react';
import { useDrop } from 'react-dnd';

const PoemDropZone = ({ onDrop, children }) => {
  const [, drop] = useDrop({
    accept: "word",
    drop: (item, monitor) => onDrop(item),
  });

  return (
    <div ref={drop} className="poem-drop-zone">
      {children}
      Drop words here to create a poem.
    </div>
  );
};

export default PoemDropZone;
