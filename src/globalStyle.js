// globalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  /* Base styles for body with Sunflower as the default font */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Sunflower', sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: 16px; /* Default font size */
  }

  /* Sunflower font styles (for app titles and paragraphs) */
  .sunflower-light {
    font-family: 'Sunflower', sans-serif;
    font-weight: 300;
    font-style: normal;
  }

  .sunflower-medium {
    font-family: 'Sunflower', sans-serif;
    font-weight: 500;
    font-style: normal;
  }

  .sunflower-bold {
    font-family: 'Sunflower', sans-serif;
    font-weight: 700;
    font-style: normal;
  }

  /* DM Mono font styles (for words and poems ) */

  .dm-mono-light {
  font-family: "DM Mono", monospace;
  font-weight: 300;
  font-style: normal;
}

.dm-mono-regular {
  font-family: "DM Mono", monospace;
  font-weight: 400;
  font-style: normal;
}

.dm-mono-medium {
  font-family: "DM Mono", monospace;
  font-weight: 500;
  font-style: normal;
}

.dm-mono-light-italic {
  font-family: "DM Mono", monospace;
  font-weight: 300;
  font-style: italic;
}

.dm-mono-regular-italic {
  font-family: "DM Mono", monospace;
  font-weight: 400;
  font-style: italic;
}

.dm-mono-medium-italic {
  font-family: "DM Mono", monospace;
  font-weight: 500;
  font-style: italic;
}

  /* Typography hierarchy */

  h1 {
    font-family: 'Sunflower', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size:5rem;
    padding-left: 20px;
  }
`;





export default GlobalStyle;
