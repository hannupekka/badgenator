// @flow
import { fromJS } from 'immutable';

type Name = {|
  headerText: ?string,
  firstname: ?string,
  lastname: ?string,
  footerText: ?string
|}

export const SET_NAMES = 'badgenator/data/SET_NAMES';

export const setNames = (names: Array<Name>): ActionType => ({
  type: SET_NAMES,
  payload: {
    names,
  }
});


export const initialState = fromJS({
  names: [],
  separator: ';'
});

export default function reducer(state: StateType = initialState, action: ActionType): StateType {
  switch (action.type) {
    case SET_NAMES:
      return state.set('names', fromJS(action.payload.names));
    default:
      return state;
  }
}
