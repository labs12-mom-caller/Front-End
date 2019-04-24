import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%
    }
`;

export default Global;
