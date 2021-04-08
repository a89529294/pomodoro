import { forwardRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Portal from './Portal';
import { useThemeStore } from '../contexts/useThemeStore';
import { useModeStore } from '../contexts/useModeStore';
import closeIcon from '../assets/icon-close.svg';
import arrowUp from '../assets/icon-arrow-up.svg';
import arrowDown from '../assets/icon-arrow-down.svg';
import checkMark from '../assets/checkMark.svg';

const mobileSettingsModalPadding = '24px';
const mobileSettingsModalPaddingLarge = '28px';
const letterSpacing = '4px';
const inputBackgroundColor = '#EFF1FA';

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
  section: {
    padding: mobileSettingsModalPadding,
  },
  sectionOneHeader: (props) => ({
    fontSize: '11px',
    fontFamily: props.fontFamilyOne,
    letterSpacing: letterSpacing,
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
      marginBottom: 0,
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
    backgroundColor: inputBackgroundColor,
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
  settingPartial: {
    padding: mobileSettingsModalPadding,
    paddingTop: 0,
  },
  settingPartialContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderTop: greyBorder,
  },
  settingPartialHeader: (props) => ({
    fontFamily: props.fontFamilyOne,
    fontSize: '11px',
    letterSpacing: letterSpacing,
    color: props.backgroundControlBar,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '18px',
    marginTop: mobileSettingsModalPadding,
  }),
  settingPartialContent: {
    width: '152px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  circle: (props) => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: props.background,
    fontSize: '15px',
    backgroundColor: inputBackgroundColor,
    '& span': {
      opacity: 0.73,
    },
    '&.active': {
      backgroundColor: props.backgroundControlBar,
      color: 'white',
    },
  }),
  checkMark: {
    width: '15px',
    height: '10px',
  },
});

const ModalHeader = ({ setIsOpen }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  return (
    <div className={classes.modalHeader}>
      <div>Settings</div>
      <img
        src={closeIcon}
        alt="close icon"
        className={classes.settingsCloseIcon}
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
};

const ModalBody = ({ children }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  return <div className={classes.modalBody}>{children}</div>;
};

const DurationSetting = () => {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  const mode = useModeStore();
  return (
    <div className={classes.section}>
      <div className={classes.sectionOneHeader}>TIME(MINUTES)</div>
      <MaxDurationSetter mode={mode.modesObj.pomodoro} />
      <MaxDurationSetter mode={mode.modesObj.shortBreak} />
      <MaxDurationSetter mode={mode.modesObj.longBreak} />
    </div>
  );
};

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

const SettingPartial = ({ children, title }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  return (
    <div className={classes.settingPartial}>
      <div className={classes.settingPartialContainer}>
        <div className={classes.settingPartialHeader}>{title}</div>
        <div className={classes.settingPartialContent}>{children}</div>
      </div>
    </div>
  );
};

const FontCircle = ({ fontFamily, setSelectedFont, selectedFont }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);

  const handleSelectFont = () => {
    setSelectedFont(fontFamily);
  };

  return (
    <div
      className={`${classes.circle} ${
        fontFamily === selectedFont ? 'active' : ''
      }`}
      style={{ fontFamily }}
      onClick={handleSelectFont}
    >
      <span>Aa</span>
    </div>
  );
};

const ColorCircle = ({ backgroundColor, selectedColor, setSelecedColor }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);

  const handleSelectColor = () => {
    setSelecedColor(backgroundColor);
  };

  return (
    <div
      className={classes.circle}
      style={{ backgroundColor }}
      onClick={handleSelectColor}
    >
      {selectedColor === backgroundColor && (
        <img
          src={checkMark}
          alt="check mark svg"
          className={classes.checkMark}
        />
      )}
    </div>
  );
};

const Modal = forwardRef(({ setIsOpen }, ref) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);

  const [selectedFont, setSelectedFont] = useState(theme.fontFamily.kumbhSans);
  const [selectedColor, setSelecedColor] = useState(
    theme.colorFamily.salmonRed
  );

  return (
    <Portal>
      <div className={classes.modal} ref={ref}>
        <ModalHeader setIsOpen={setIsOpen} />
        <ModalBody>
          <DurationSetting />
          <SettingPartial title="FONT">
            <FontCircle
              fontFamily={theme.fontFamily.kumbhSans}
              setSelectedFont={setSelectedFont}
              selectedFont={selectedFont}
            />
            <FontCircle
              fontFamily={theme.fontFamily.robotoSlab}
              setSelectedFont={setSelectedFont}
              selectedFont={selectedFont}
            />
            <FontCircle
              fontFamily={theme.fontFamily.spaceMono}
              setSelectedFont={setSelectedFont}
              selectedFont={selectedFont}
            />
          </SettingPartial>
          <SettingPartial title="COLOR">
            <ColorCircle
              backgroundColor={theme.colorFamily.salmonRed}
              selectedColor={selectedColor}
              setSelecedColor={setSelecedColor}
            />
            <ColorCircle
              backgroundColor={theme.colorFamily.babyBlue}
              selectedColor={selectedColor}
              setSelecedColor={setSelecedColor}
            />
            <ColorCircle
              backgroundColor={theme.colorFamily.heliotropeViolet}
              selectedColor={selectedColor}
              setSelecedColor={setSelecedColor}
            />
          </SettingPartial>
        </ModalBody>
      </div>
    </Portal>
  );
});

export default Modal;
