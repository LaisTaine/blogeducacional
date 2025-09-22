import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Merriweather Sans', sans-serif;
    background-color: #1260d6ff; 
    color: #1c1e21; 
  }

    h1, h2, h3, h4, h5, h6 {
    font-family: 'Merriweather', serif;
    font-weight: 700; 
    }

  a {
    text-decoration: none;
    color: inherit;
  }
`;