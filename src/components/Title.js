import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '8.4%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: theme.fontFamilyOne,
    fontSize: '24px',
    color: theme.textColorOne,
  },
}));

export default function Title() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>pomodoro</div>
    </div>
  );
}
