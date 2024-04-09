// src/App.js

import React from 'react';
import RandomWords from './components/RandomWords';
import GlobalStyle from './globalStyle';

const App = () => {
  return (
    <>
     <GlobalStyle />
    <div>
      <RandomWords includeDetails={false} />
    </div>
    </>
  );
};

export default App;