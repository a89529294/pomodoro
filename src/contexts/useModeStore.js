import makeStore from '../hooks/useStore';
import { modeObj } from '../constants';

const modeReducer = (state, action) => {
  return action;
};

const [ModeProvider, useModeDispatch, useModeStore] = makeStore(
  modeReducer,
  modeObj.pomodoro,
  'mode'
);
export { ModeProvider, useModeDispatch, useModeStore };
