import makeStore from '../hooks/useStore';
import { modesObj } from '../constants';

const modeReducer = (state, action) => {
  if (action.type === 'switchMode') {
    return { ...state, currentMode: action.value };
  } else if (action.type === 'modifyMode') {
    for (const property in state.modesObj) {
      if (state.modesObj[property].label === state.currentMode.label) {
        state.currentMode.maxDuration = action.value[property].maxDuration;
      }
    }

    return { ...state, modesObj: action.value };
  }
};

const [ModeProvider, useModeDispatch, useModeStore] = makeStore(
  modeReducer,
  { modesObj: modesObj, currentMode: modesObj.pomodoro },
  'mode'
);
export { ModeProvider, useModeDispatch, useModeStore };
