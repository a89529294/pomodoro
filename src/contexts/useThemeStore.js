import makeStore from '../hooks/useStore';

const theme = {
  background: '#1E213F',
  backgroundControlBar: '#161932',
  activeColor: '#F87070',
  fontFamilyForTitle: "'Kumbh Sans', sans-serif",
  fontFamilyOne: "'Kumbh Sans', sans-serif",
  textColorOne: '#D7E0FF',
  fontFamily: {
    kumbhSans: "'Kumbh Sans', sans-serif",
    robotoSlab: "'Roboto Slab', serif",
    spaceMono: "'Space Mono', monospace",
  },
  colorFamily: {
    salmonRed: '#F87070',
    babyBlue: '#70F3F8',
    heliotropeViolet: '#D881F8',
  },
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'addTodo':
      return [...state, action.todo];
    default:
      throw new Error('unknown action', action);
  }
};

const [ThemeProvider, useThemeDispatch, useThemeStore] = makeStore(
  themeReducer,
  theme,
  'theme'
);
export { ThemeProvider, useThemeDispatch, useThemeStore };
