//src/components/PoemDropZone.js

import React from 'react';
import { useDrop } from 'react-dnd';

const PoemDropZone = ({ onDrop, children }) => {
  const [, drop] = useDrop({
    accept: "word",
    drop: (item, monitor) => onDrop(item),
  });

  return (
    <>
      <p className="drop-zone-text">DROP WORDS HERE TO CREATE A POEM</p>
      <div ref={drop} className="poem-drop-zone">
        {children}
      </div>
    </>
  );
};

export default PoemDropZone;
