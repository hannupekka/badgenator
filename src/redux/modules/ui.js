// @flow
import { fromJS } from 'immutable';

export const CHANGE_COLOR = 'badgenator/ui/CHANGE_COLOR';

export const changeColor = (name: string, color: string): ActionType => ({
  type: CHANGE_COLOR,
  payload: {
    name,
    color
  }
});

export const initialState = fromJS({
  headerBackground: '#ff0000',
  headerText: 'yellow',
  nameBackground: 'white',
  nameText: 'orange',
  footerBackground: '#00ff00',
  footerText: 'pink'
});

export default function reducer(state: StateType = initialState, action: ActionType): StateType {
  switch (action.type) {
    case CHANGE_COLOR:
      return state.set(action.payload.name, action.payload.color);
    default:
      return state;
  }
}
