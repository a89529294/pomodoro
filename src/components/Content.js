import { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import settingsIcon from '../assets/icon-settings.svg';
import { useThemeStore } from '../contexts/useThemeStore';
import Clock from './Clock';
import Modal from './Modal';

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
    borderBottom: '1px solid #E3E1E1',
  }),
  modalBody: {
    height: modalBodyHeight + '%',
    paddingLeft: mobileSettingsModalPadding,
    paddingRight: mobileSettingsModalPadding,
    paddingTop: mobileSettingsModalPadding,
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
    if (!modalRef?.current?.contains(e.target)) setIsOpen(false);
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
      {isOpen && <Modal setIsOpen={setIsOpen} ref={modalRef} />}
    </div>
  );
}
