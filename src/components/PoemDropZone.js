//src/components/PoemDropZone.js

import React from 'react';
import { useDrop } from 'react-dnd';

const PoemDropZone = ({ onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: "word",
    drop: onDrop,
  }));

  return (
    <div ref={drop} className="poem-drop-zone">
      Drop words here to create a poem.
    </div>
  );
};

export default PoemDropZone;
