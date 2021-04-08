import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/styles';

import Portal from './Portal';
import { useThemeStore } from '../contexts/useThemeStore';
import { useModeStore } from '../contexts/useModeStore';
import closeIcon from '../assets/icon-close.svg';
import arrowUp from '../assets/icon-arrow-up.svg';
import arrowDown from '../assets/icon-arrow-down.svg';

const mobileSettingsModalPadding = '24px';
const mobileSettingsModalPaddingLarge = '28px';

const greyBorder = '1px solid #E3E1E1';

const useStyles = makeStyles({
  modal: {
    width: '330px',
    height: '550px',
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '40px',
    borderRadius: '15px',
  },
  modalHeader: (props) => ({
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: mobileSettingsModalPadding,
    paddingRight: mobileSettingsModalPadding,
    paddingTop: mobileSettingsModalPadding,
    paddingBottom: mobileSettingsModalPaddingLarge,
    fontSize: '20px',
    fontFamily: props.fontFamilyOne,
    borderBottom: greyBorder,
    color: props.backgroundControlBar,
  }),
  modalBody: {},
  sectionOne: {
    padding: mobileSettingsModalPadding,
    paddingBottom: 0,
  },
  sectionContent: {
    borderBottom: greyBorder,
  },
  sectionOneHeader: (props) => ({
    fontSize: '11px',
    fontFamily: props.fontFamilyOne,
    letterSpacing: '4px',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '18px',
  }),
  settingsCloseIcon: {
    width: '16px',
    height: '16px',
  },
  maxDurationSetter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    '&:last-child': {
      marginBottom: mobileSettingsModalPadding,
    },
  },
  durationSetterLabel: (props) => ({
    fontFamily: props.fontFamilyOne,
    fontSize: '12px',
    color: props.background,
    opacity: 0.4,
    display: 'flex',
    alignItems: 'center',
  }),
  durationSetterInput: (props) => ({
    color: props.backgroundControlBar,
    fontFamily: props.fontFamilyOne,
    fontSize: '14px',
    width: '140px',
    backgroundColor: '#EFF1FA',
    borderRadius: '10px',
    padding: '12px 16px',
  }),
  durationSetterInputContent: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },
  durationDisplay: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    lineHeight: '80%',
    marginTop: '2px',
  },
  durationArrow: {
    display: 'block',
    width: '12px',
    height: '4px',
    '&:first-child': {
      marginBottom: '9px',
    },
  },
});

const MaxDurationSetter = ({ mode }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);

  return (
    <div className={classes.maxDurationSetter}>
      <div className={classes.durationSetterLabel}>{mode.label}</div>
      <div className={classes.durationSetterInput}>
        <div className={classes.durationSetterInputContent}>
          <div className={classes.durationDisplay}>{mode.maxDuration / 60}</div>
          <div className={classes.durationChangeContainer}>
            <img
              src={arrowUp}
              alt="arrow up"
              className={classes.durationArrow}
            />
            <img
              src={arrowDown}
              alt="arrow down"
              className={classes.durationArrow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = forwardRef(({ setIsOpen }, ref) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  const mode = useModeStore();
  return (
    <Portal>
      <div className={classes.modal} ref={ref}>
        <div className={classes.modalHeader}>
          <div>Settings</div>
          <img
            src={closeIcon}
            alt="close icon"
            className={classes.settingsCloseIcon}
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className={classes.modalBody}>
          <div className={classes.sectionOne}>
            <div className={classes.sectionContent}>
              <div className={classes.sectionOneHeader}>TIME(MINUTES)</div>
              <MaxDurationSetter mode={mode.modesObj.pomodoro} />
              <MaxDurationSetter mode={mode.modesObj.shortBreak} />
              <MaxDurationSetter mode={mode.modesObj.longBreak} />
            </div>
          </div>
          <div className={classes.sectionTwo}></div>
          <div className={classes.sectionThree}></div>
        </div>
      </div>
    </Portal>
  );
});

export default Modal;
