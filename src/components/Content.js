import { makeStyles } from '@material-ui/styles';

import settingsIcon from '../assets/icon-settings.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  clock: {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'linear-gradient(315deg, #2E325A 0%, #0E112A 100%)',
    boxShadow: '-50px -50px 100px #272C5A, 50px 50px 100px #121530',
  },
  settingsIconContainer: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Clock = () => {
  const classes = useStyles();
  return <div className={classes.clock}></div>;
};

export default function Content() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Clock />
      <div className={classes.settingsIconContainer}>
        <img
          src={settingsIcon}
          alt="settings icon"
          className={classes.settingsIcon}
        />
      </div>
    </div>
  );
}
