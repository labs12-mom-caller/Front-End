export const colors = {
  mainWhite: `#fbfff1`,
  mainBlue: `#083d77`,
  mainTeal: `#627d89`,
  redOrange: `#ff6f61`,
  mainGreen: `#859d72`,
};

export const logoText = `font-family: 'Pacifico', cursive;`;

export const transitionDefault = 'transition: all .5s ease-in-out';

export const transitionFunction = (
  property = 'all',
  time = '.5s',
  type = 'linear',
) => {
  return `transition: ${property} ${time} ${type}`;
};

// must use undefined if you want to change a value further in the chain ex. border({undefined, undefined, hotpink})
export const border = ({
  width = '2px',
  type = 'solid',
  color = '#fbfff1',
}) => {
  return `border: ${width}, ${type}, ${color}`;
};

export const letterSpacing = ({ spacing = '.1rem' }) => {
  return `letterSpacing: ${spacing}`;
};
