import makeStore from '../hooks/useStore';
import { modesObj } from '../constants';

const modeReducer = (state, action) => {
  return { ...state, currentMode: action };
};

const [ModeProvider, useModeDispatch, useModeStore] = makeStore(
  modeReducer,
  { modesObj: modesObj, currentMode: modesObj.pomodoro },
  'mode'
);
export { ModeProvider, useModeDispatch, useModeStore };
