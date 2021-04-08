import { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import settingsIcon from '../assets/icon-settings.svg';
import closeIcon from '../assets/icon-close.svg';
import { useThemeStore } from '../contexts/useThemeStore';
import Clock from './Clock';
import Portal from './Portal';

const mobileSettingsModalPadding = '24px';
const modalHeaderHeight = 13;
const modalBodyHeight = 100 - modalHeaderHeight;

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  settingsIconContainer: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    height: modalHeaderHeight + '%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: mobileSettingsModalPadding,
    paddingRight: mobileSettingsModalPadding,
    paddingTop: mobileSettingsModalPadding,
    fontSize: '20px',
    fontFamily: props.fontFamilyForTitle,
  }),
  modalBody: {
    height: modalBodyHeight + '%',
  },
  settingsCloseIcon: {
    width: '16px',
    height: '16px',
  },
});

export default function Content() {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  const handleClickOutsideModal = (e) => {
    if (!modalRef.current.contains(e.target)) setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen)
      document.addEventListener('click', handleClickOutsideModal, true);
    return () =>
      document.removeEventListener('click', handleClickOutsideModal, true);
  }, [isOpen]);

  return (
    <div className={classes.root}>
      <Clock />
      <div className={classes.settingsIconContainer}>
        <img
          src={settingsIcon}
          alt="settings icon"
          className={classes.settingsIcon}
          onClick={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <Portal>
          <div className={classes.modal} ref={modalRef}>
            <div className={classes.modalHeader}>
              <div>Settings</div>
              <img
                src={closeIcon}
                alt="close icon"
                className={classes.settingsCloseIcon}
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className={classes.modalBody}></div>
          </div>
        </Portal>
      )}
    </div>
  );
}
