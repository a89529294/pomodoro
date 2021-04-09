import { createUseStyles } from 'react-jss';

import { useThemeStore } from '../contexts/useThemeStore';
import { tabletWidth, laptopWidth } from '../utils/constants';

const useStyles = createUseStyles({
  root: {
    height: '8.4%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    [`@media (min-width: ${tabletWidth}px)`]: {
      height: '11%',
    },
  },
  title: (props) => ({
    fontFamily: props.fontFamilyForTitle,
    fontSize: '24px',
    color: props.textColorOne,
    [`@media (min-width: ${tabletWidth}px)`]: {
      fontSize: '32px',
    },
  }),
});

export default function Title() {
  const theme = useThemeStore();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <div className={classes.title}>pomodoro</div>
    </div>
  );
}
