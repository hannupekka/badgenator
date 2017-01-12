// @flow
import { fromJS } from 'immutable';

export const initialState = fromJS({
  headerBackground: '#ff0000',
  headerText: 'yellow',
  nameText: 'orange',
  footerBackground: '#00ff00',
  footerText: 'pink'
});

export default function reducer(state: StateType = initialState, action: ActionType): StateType {
  switch (action.type) {
    default:
      return state;
  }
}
