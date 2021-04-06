import { makeStyles } from '@material-ui/styles';

import Title from './components/Title';
import Controls from './components/Controls';
import Content from './components/Content';
import { ModeProvider } from './contexts/useModeStore';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.background,
    height: 'calc(var(--vh, 1vh) * 100)',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
  },
}));

function App() {
  const classes = useStyles();

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
