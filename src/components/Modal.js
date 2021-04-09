import { forwardRef, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

import Portal from './Portal';
import { useThemeStore, useThemeDispatch } from '../contexts/useThemeStore';
import { useModeStore, useModeDispatch } from '../contexts/useModeStore';
import closeIcon from '../assets/icon-close.svg';
import arrowUp from '../assets/icon-arrow-up.svg';
import arrowUpDarken from '../assets/icon-arrow-up-darken.svg';
import arrowDown from '../assets/icon-arrow-down.svg';
import arrowDownDarken from '../assets/icon-arrow-down-darken.svg';
import checkMark from '../assets/checkMark.svg';

const mobileSettingsModalPadding = '24px';
const mobileSettingsModalPaddingLarge = '28px';
const letterSpacing = '4px';
const inputBackgroundColor = '#EFF1FA';
const greyBorder = '1px solid #E3E1E1';
const btnHeight = 53;
const btnWidth = 140;
const btnBorderRadius = 26.5;
const durationArrowWidth = 12;

const useStyles = createUseStyles({
  modal: {
    width: '330px',
    height: '550px',
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '40px',
    borderRadius: '15px',
    position: 'relative',
  },
  modalHeader: (props) => ({
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: mobileSettingsModalPadding,
    paddingRight: mobileSettingsModalPadding,
    paddingTop: mobileSettingsModalPadding,
    paddingBottom: mobileSettingsModalPaddingLarge,
    fontSize: '20px',
    fontFamily: props.activeFont,
    borderBottom: greyBorder,
    color: props.backgroundControlBar,
  }),

  modalBody: {},
  section: {
    padding: mobileSettingsModalPadding,
  },
  sectionOneHeader: (props) => ({
    fontSize: '11px',
    fontFamily: props.activeFont,
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
    fontFamily: props.activeFont,
    fontSize: '12px',
    color: props.background,
    opacity: 0.4,
    display: 'flex',
    alignItems: 'center',
  }),
  durationSetterInput: (props) => ({
    color: props.backgroundControlBar,
    fontFamily: props.activeFont,
    fontSize: '14px',
    maxHeight: '17px',
    width: '108px',
    backgroundColor: inputBackgroundColor,
    borderRadius: '10px',
    padding: '12px 16px',
    '&:hover $durationArrow$up': {
      backgroundImage: `url(${arrowUpDarken})`,
    },
    '&:hover $durationArrow$down': {
      backgroundImage: `url(${arrowDownDarken})`,
    },
  }),
  durationSetterInputContent: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  durationDisplay: {
    height: '100%',
    width: `calc(100% - ${durationArrowWidth + 'px'})`,
    display: 'flex',
    alignItems: 'center',
    all: 'unset',
  },
  durationArrow: {
    display: 'block',
    width: durationArrowWidth + 'px',
    height: '4px',
    backgroundSize: '100% 100%',
    '&:first-child': {
      marginBottom: '9px',
    },
  },
  up: {
    backgroundImage: `url(${arrowUp})`,
  },
  down: {
    backgroundImage: `url(${arrowDown})`,
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
    fontFamily: props.activeFont,
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
    transition: 'transform 1s',
    '& span': {
      opacity: 0.73,
    },
    '&.active': {
      backgroundColor: props.backgroundControlBar,
      color: 'white',
    },
    '&:hover': {
      transform: 'scale(1.2)',
    },
  }),
  checkMark: {
    width: '15px',
    height: '10px',
  },
  applyButton: (props) => ({
    width: btnWidth + 'px',
    height: btnHeight + 'px',
    backgroundColor: props.activeColor,
    color: 'white',
    borderRadius: btnBorderRadius + 'px',
    position: 'absolute',
    top: `calc(100% - ${btnHeight / 2}px)`,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: props.activeFont,
    fontSize: '16px',
    '& span': {
      lineHeight: '80%',
      marginTop: '5px',
    },
  }),
  applyButtonShade: (props) => ({
    width: btnWidth + 'px',
    height: btnHeight + 'px',
    borderRadius: btnBorderRadius + 'px',
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    '&:hover': {
      opacity: 0.2,
    },
  }),
});

const ModalHeader = ({ setIsOpen, tempFont }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  return (
    <div className={classes.modalHeader}>
      <div
        style={{
          fontFamily: tempFont,
          marginTop: tempFont === theme.fontFamily.kumbhSans ? '4px' : '0px',
          lineHeight: tempFont === theme.fontFamily.kumbhSans ? '80%' : '100%',
        }}
      >
        Settings
      </div>
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

const DurationSetting = ({ children, tempFont }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  return (
    <div className={classes.section}>
      <div
        className={classes.sectionOneHeader}
        style={{
          fontFamily: tempFont,
          marginTop: tempFont === theme.fontFamily.kumbhSans ? '3px' : '0px',
          lineHeight: tempFont === theme.fontFamily.kumbhSans ? '80%' : '100%',
        }}
      >
        TIME(MINUTES)
      </div>
      {children}
    </div>
  );
};

const MaxDurationSetter = ({ mode, duration, setDuration, tempFont }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  //   const [duration, setDuration] = useState(mode.maxDuration / 60);

  const between0and60 = (value) => {
    if (value < 0) return 0;
    else if (value > 60) return 60;
    else return value;
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    setDuration(between0and60(value));
  };

  const handleDurationBlur = (e) => {
    if (e.target.value === '') {
      setDuration(mode.maxDuration / 60);
    }
  };

  const incrementDuration = () => {
    setDuration((duration) => setDuration(between0and60(++duration)));
  };

  const decrementDuration = () => {
    setDuration((duration) => setDuration(between0and60(--duration)));
  };

  return (
    <div className={classes.maxDurationSetter}>
      <div
        className={classes.durationSetterLabel}
        style={{
          fontFamily: tempFont,
          marginTop: tempFont === theme.fontFamily.kumbhSans ? '2px' : '0px',
        }}
      >
        {mode.label}
      </div>
      <div className={classes.durationSetterInput}>
        <div className={classes.durationSetterInputContent}>
          <input
            className={classes.durationDisplay}
            value={duration}
            onChange={handleDurationChange}
            onBlur={handleDurationBlur}
            type="number"
            style={{
              fontFamily: tempFont,

              marginTop:
                tempFont === theme.fontFamily.kumbhSans ? '2px' : '0px',
            }}
          ></input>
          <div className={classes.durationArrowContainer}>
            <div
              className={`${classes.durationArrow} ${classes.up}`}
              onClick={incrementDuration}
            />
            <div
              className={`${classes.durationArrow} ${classes.down}`}
              onClick={decrementDuration}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingPartial = ({ children, title, tempFont }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  return (
    <div className={classes.settingPartial}>
      <div className={classes.settingPartialContainer}>
        <div
          className={classes.settingPartialHeader}
          style={{
            fontFamily: tempFont,
          }}
        >
          <spam
            style={{
              marginTop: tempFont === theme.fontFamily.kumbhSans ? '3px' : 0,
              lineHeight:
                tempFont === theme.fontFamily.kumbhSans ? '80%' : '100%',
            }}
          >
            {title}
          </spam>
        </div>
        <div className={classes.settingPartialContent}>{children}</div>
      </div>
    </div>
  );
};

const FontCircle = ({
  fontFamily,
  setSelectedFont,
  selectedFont,
  setTempFont,
}) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);

  const handleSelectFont = () => {
    setSelectedFont(fontFamily);
    setTempFont(fontFamily);
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

const ColorCircle = ({
  backgroundColor,
  selectedColor,
  setSelecedColor,
  setTempColor,
}) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);

  const handleSelectColor = () => {
    setSelecedColor(backgroundColor);
    setTempColor(backgroundColor);
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

const ApplyButton = ({ onClick, tempFont, tempColor }) => {
  const theme = useThemeStore();
  const classes = useStyles(theme);

  return (
    <div
      className={classes.applyButton}
      onClick={onClick}
      style={{ backgroundColor: tempColor }}
    >
      <span style={{ fontFamily: tempFont }}>Apply</span>
      <div className={classes.applyButtonShade}></div>
    </div>
  );
};

const Modal = forwardRef(({ setIsOpen }, ref) => {
  const mode = useModeStore();
  const modeDispatch = useModeDispatch();
  const themeDispatch = useThemeDispatch();
  const theme = useThemeStore();
  const classes = useStyles({ theme });

  const [pomodoroDuration, setPomodoroDuration] = useState(
    mode.modesObj.pomodoro.maxDuration / 60
  );
  const [shortBreakDuration, setShortBreakDuration] = useState(
    mode.modesObj.shortBreak.maxDuration / 60
  );
  const [longBreakDuration, setLongBreakDuration] = useState(
    mode.modesObj.longBreak.maxDuration / 60
  );

  const [selectedFont, setSelectedFont] = useState(theme.activeFont);
  const [selectedColor, setSelecedColor] = useState(theme.activeColor);

  const [tempFont, setTempFont] = useState(null);
  const [tempColor, setTempColor] = useState(null);

  const handleApplySetting = () => {
    const newModesObj = {
      pomodoro: { label: 'pomodoro', maxDuration: pomodoroDuration * 60 },
      shortBreak: {
        label: 'short break',
        maxDuration: shortBreakDuration * 60,
      },
      longBreak: { label: 'long break', maxDuration: longBreakDuration * 60 },
    };
    modeDispatch({ type: 'modifyMode', value: newModesObj });
    themeDispatch({ activeColor: selectedColor, activeFont: selectedFont });

    setIsOpen(false);
  };

  return (
    <Portal>
      <div className={classes.modal} ref={ref}>
        <ModalHeader setIsOpen={setIsOpen} tempFont={tempFont} />
        <ModalBody>
          <DurationSetting tempFont={tempFont}>
            <MaxDurationSetter
              mode={mode.modesObj.pomodoro}
              duration={pomodoroDuration}
              setDuration={setPomodoroDuration}
              tempFont={tempFont}
            />
            <MaxDurationSetter
              mode={mode.modesObj.shortBreak}
              duration={shortBreakDuration}
              setDuration={setShortBreakDuration}
              tempFont={tempFont}
            />
            <MaxDurationSetter
              mode={mode.modesObj.longBreak}
              duration={longBreakDuration}
              setDuration={setLongBreakDuration}
              tempFont={tempFont}
            />
          </DurationSetting>
          <SettingPartial title="FONT" tempFont={tempFont}>
            <FontCircle
              fontFamily={theme.fontFamily.kumbhSans}
              setSelectedFont={setSelectedFont}
              selectedFont={selectedFont}
              setTempFont={setTempFont}
            />
            <FontCircle
              fontFamily={theme.fontFamily.robotoSlab}
              setSelectedFont={setSelectedFont}
              selectedFont={selectedFont}
              setTempFont={setTempFont}
            />
            <FontCircle
              fontFamily={theme.fontFamily.spaceMono}
              setSelectedFont={setSelectedFont}
              selectedFont={selectedFont}
              setTempFont={setTempFont}
            />
          </SettingPartial>
          <SettingPartial title="COLOR" tempFont={tempFont}>
            <ColorCircle
              backgroundColor={theme.colorFamily.salmonRed}
              selectedColor={selectedColor}
              setSelecedColor={setSelecedColor}
              setTempColor={setTempColor}
            />
            <ColorCircle
              backgroundColor={theme.colorFamily.babyBlue}
              selectedColor={selectedColor}
              setSelecedColor={setSelecedColor}
              setTempColor={setTempColor}
            />
            <ColorCircle
              backgroundColor={theme.colorFamily.heliotropeViolet}
              selectedColor={selectedColor}
              setSelecedColor={setSelecedColor}
              setTempColor={setTempColor}
            />
          </SettingPartial>
        </ModalBody>
        <ApplyButton
          onClick={handleApplySetting}
          tempFont={tempFont}
          tempColor={tempColor}
        />
      </div>
    </Portal>
  );
});

export default Modal;
