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
    font-size:6rem;
    padding-left: 20px;
  }

  h2 {
    font-family: 'Sunflower', sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 5rem;
    padding-left: 20px;
  }

  h3 {
    font-family: 'Sunflower', sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 2 rem;
    padding-left: 20px;
  }

/* Tablet (devices with width between 768px and 1024px) */
@media (max-width: 1024px) {
  body {
    font-size: 16px; /* adjust font size for tablets */
  }

  h1 {
    font-size: 4.5rem; /* Smaller heading size for better readability on tablets */
  }

  h2 {
    font-size: 3.5rem;
  }

  h3 {
    font-size: 1.8rem;
  }
}

/* Phone (devices with width less than 768px) */
@media (max-width: 768px) {
  body {
    font-size: 14px; /* Even smaller font size for phones */
  }

  h1 {
    font-size: 5rem; /* Much smaller heading size for phone screens */
    padding-left: 10px; /* Adjust padding for smaller screen */
  }

  h2 {
    font-size: 4rem;
    padding-left: 10px;
  }

  h3 {
    font-size: 1.5rem;
    padding-left: 10px;
  }
}



`;





export default GlobalStyle;
