import { makeStyles } from '@material-ui/styles';

import Title from './components/Title';
import Controls from './components/Controls';
import Content from './components/Content';
import { ModeProvider } from './contexts/useModeStore';
import { useThemeStore } from './contexts/useThemeStore';

const useStyles = makeStyles({
  root: (props) => ({
    backgroundColor: props.background,
    height: 'calc(var(--vh, 1vh) * 100)',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
  }),
});

function App() {
  const theme = useThemeStore();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <Title />
      <ModeProvider>
        <Controls />
        <Content />
      </ModeProvider>
    </div>
  );
}

export default App;
