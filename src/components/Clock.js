import { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { useThemeStore } from '../contexts/useThemeStore';
import { useModeStore } from '../contexts/useModeStore';
import convertSecondsIntoMinutes from '../utils/timeUtils';
import useInterval from '../hooks/useInterval';
import { tabletWidth } from '../utils/constants';

const durationControlFontSize = '14px';
const durationControlFontSizeLarge = '18px';

const useStyles = createUseStyles({
  clock: {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'linear-gradient(315deg, #2E325A 0%, #0E112A 100%)',
    boxShadow: '-50px -50px 100px #272C5A, 50px 50px 100px #121530',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (min-width: ${tabletWidth}px)`]: {
      width: '410px',
      height: '410px',
    },
  },
  innerClock: (props) => ({
    width: '268px',
    height: '268px',
    backgroundColor: props.backgroundControlBar,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (min-width: ${tabletWidth}px)`]: {
      width: '366px',
      height: '366px',
    },
  }),
  circularProgressBarOuter: (props) => ({
    width: '248px',
    height: '248px',
    borderRadius: '50%',
    background: `conic-gradient(${props.activeColor} ${props.progress}%, ${
      props.backgroundControlBar
    } ${props.progress ? props.progress + 0.2 : 0}%)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (min-width: ${tabletWidth}px)`]: {
      width: '339px',
      height: '339px',
    },
  }),
  circularProgressBarInner: (props) => ({
    width: '230px',
    height: '230px',
    borderRadius: '50%',
    backgroundColor: props.backgroundControlBar,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    [`@media (min-width: ${tabletWidth}px)`]: {
      width: '319px',
      height: '319px',
    },
  }),
  duration: (props) => ({
    fontFamily: props.activeFont,
    fontSize: '80px',
    color: props.textColorOne,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (min-width: ${tabletWidth}px)`]: {
      fontSize: '100px',
    },
  }),
  durationSingleChar: (props) => ({
    width: '22%',
    display: 'flex',
    justifyContent: 'center',
    '&:nth-child(3)': {
      width: '8%',
    },
    paddingBottom: props.activeFont !== props.fontFamily.kumbhSans ? '20px' : 0,
  }),
  durationControlContainer: (props) => ({
    position: 'absolute',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    fontFamily: props.activeFont,
    fontSize: durationControlFontSize,
    letterSpacing: durationControlFontSize,

    color: props.textColorOne,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (min-width: ${tabletWidth}px)`]: {
      fontSize: durationControlFontSizeLarge,
      letterSpacing: durationControlFontSizeLarge,
    },
  }),
  durationControl: {
    cursor: 'pointer',
    marginRight: '-' + durationControlFontSize,
    [`@media (min-width: ${tabletWidth}px)`]: {
      marginRight: '-' + durationControlFontSizeLarge,
    },
  },
});

const clockStateEnum = {
  idle: 'start',
  active: 'pause',
  paused: 'resume',
  complete: 'restart',
};

const Clock = () => {
  const mode = useModeStore();
  const theme = useThemeStore();

  const [progress, setProgress] = useState(0);
  const [clockState, setClockState] = useState(clockStateEnum.idle);
  const [currentDuration, setCurrentDuration] = useState(
    mode.currentMode.maxDuration
  );

  const myTheme = { ...theme, progress };
  const classes = useStyles(myTheme);

  useInterval(
    () => {
      setCurrentDuration((duration) => {
        if (duration === 0) {
          setClockState(clockStateEnum.complete);
          return 0;
        } else {
          const newDuration = --duration;
          const progress =
            ((mode.currentMode.maxDuration - newDuration) /
              mode.currentMode.maxDuration) *
            100;
          setProgress(progress);
          return newDuration;
        }
      });
    },
    clockState === clockStateEnum.active ? 1000 : null
  );

  useEffect(() => {
    setCurrentDuration(mode.currentMode.maxDuration);
    setProgress(0);
    setClockState(clockStateEnum.idle);
  }, [mode.currentMode, mode.currentMode.maxDuration]);

  const handleClockState = () => {
    const { idle, active, paused, complete } = clockStateEnum;
    switch (clockState) {
      case idle:
        setClockState(active);
        break;
      case active:
        setClockState(paused);
        break;
      case paused:
        setClockState(active);
        break;
      case complete:
        setCurrentDuration(mode.currentMode.maxDuration);
        setProgress(0);
        setClockState(clockStateEnum.active);
        break;
      default:
        throw new Error('impossible clock state');
    }
  };

  return (
    <div className={classes.clock}>
      <div className={classes.innerClock}>
        <div className={classes.circularProgressBarOuter}>
          <div className={classes.circularProgressBarInner}>
            <div className={classes.duration}>
              {convertSecondsIntoMinutes(currentDuration)
                .split('')
                .map((char, i) => (
                  <div className={classes.durationSingleChar} key={i}>
                    {char}
                  </div>
                ))}
            </div>
            <div className={classes.durationControlContainer}>
              <span
                className={classes.durationControl}
                onClick={handleClockState}
              >
                {clockState}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
