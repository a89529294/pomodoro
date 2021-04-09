import makeStore from '../hooks/useStore';

const salmonRed = '#F87070';
const babyBlue = '#70F3F8';
const heliotropeViolet = '#D881F8';
const kumbhSans = "'Kumbh Sans', sans-serif";
const robotoSlab = "'Roboto Slab', serif";
const spaceMono = "'Space Mono', monospace";

const theme = {
  background: '#1E213F',
  backgroundControlBar: '#161932',
  activeColor: salmonRed,
  fontFamilyForTitle: kumbhSans,
  activeFont: kumbhSans,
  textColorOne: '#D7E0FF',
  fontFamily: {
    kumbhSans,
    robotoSlab,
    spaceMono,
  },
  colorFamily: {
    salmonRed,
    babyBlue,
    heliotropeViolet,
  },
};

const themeReducer = (state, action) => {
  console.log(action);
  return { ...state, ...action };
};

const [ThemeProvider, useThemeDispatch, useThemeStore] = makeStore(
  themeReducer,
  theme,
  'theme'
);
export { ThemeProvider, useThemeDispatch, useThemeStore };
