import { makeStyles } from '@material-ui/styles';

import { modeObj } from '../constants';
import { useModeDispatch, useModeStore } from '../contexts/useModeStore';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '23%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBar: {
    backgroundColor: theme.backgroundControlBar,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 6px',
    borderRadius: '31.5px',
  },
  controlButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.fontFamilyOne,
    fontSize: '12px',
    color: theme.textColorOne,
    opacity: 0.4,
    borderRadius: '26.5px',
    padding: '18px 23px',
    whiteSpace: 'nowrap',
    '&:hover': {
      opacity: 1,
    },
  },
  active: {
    backgroundColor: theme.activeColor,
    opacity: 1,
    color: theme.background,
  },
}));

const ControlButton = ({ label }) => {
  const classes = useStyles();
  const mode = useModeStore();
  const dispatch = useModeDispatch();

  return (
    <div
      className={`${classes.controlButton} ${
        mode === label ? classes.active : ''
      }`}
      onClick={() => dispatch(label)}
    >
      {label}
    </div>
  );
};

export default function Controls() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.controlBar}>
        <ControlButton label={modeObj.pomodoro} />
        <ControlButton label={modeObj.shortBreak} />
        <ControlButton label={modeObj.longBreak} />
      </div>
    </div>
  );
}
