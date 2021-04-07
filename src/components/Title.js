import { makeStyles } from '@material-ui/styles';
import { useThemeStore } from '../contexts/useThemeStore';

const useStyles = makeStyles({
  root: {
    height: '8.4%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: (props) => ({
    fontFamily: props.fontFamilyForTitle,
    fontSize: '24px',
    color: props.textColorOne,
  }),
});

export default function Title() {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <div className={classes.title}>pomodoro</div>
    </div>
  );
}
