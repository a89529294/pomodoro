import { createUseStyles } from 'react-jss';

import { useModeDispatch, useModeStore } from '../contexts/useModeStore';
import { useThemeStore } from '../contexts/useThemeStore';
import { tabletWidth } from '../utils/constants';

const useStyles = createUseStyles({
  root: {
    height: '23%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBar: (props) => ({
    backgroundColor: props.backgroundControlBar,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 6px',
    borderRadius: '31.5px',
    maxWidth: '95vw',
  }),
  controlButton: (props) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: props.activeFont,
    color: props.textColorOne,
    opacity: 0.4,
    borderRadius: '26.5px',
    padding: '18px 23px',
    whiteSpace: 'nowrap',
    '&:hover': {
      opacity: 1,
    },
  }),
  [`@media (max-width: ${tabletWidth - 1}px)`]: {
    controlButton: {
      fontSize: '12px',
    },
  },
  [`@media (min-width: ${tabletWidth}px)`]: {
    controlButton: {
      fontSize: '16px',
    },
  },
  active: (props) => ({
    backgroundColor: props.activeColor,
    opacity: 1,
    color: props.background,
  }),
});

const ControlButton = ({ state }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  const dispatch = useModeDispatch();
  const mode = useModeStore();
  const currentModeLabel = mode.currentMode.label;

  return (
    <div
      className={`${classes.controlButton} ${
        currentModeLabel === state.label ? classes.active : ''
      }`}
      onClick={() => dispatch({ type: 'switchMode', value: state })}
    >
      {state.label}
    </div>
  );
};

export default function Controls() {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  const mode = useModeStore();
  return (
    <div className={classes.root}>
      <div className={classes.controlBar}>
        <ControlButton state={mode.modesObj.pomodoro} />
        <ControlButton state={mode.modesObj.shortBreak} />
        <ControlButton state={mode.modesObj.longBreak} />
      </div>
    </div>
  );
}
