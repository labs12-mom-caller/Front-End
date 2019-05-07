import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%
        font-family: font-family: 'Roboto', sans-serif;;
    }
`;

export default Global;
