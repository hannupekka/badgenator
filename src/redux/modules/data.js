// @flow
import { fromJS } from 'immutable';

export const initialState = fromJS({
});

export default function reducer(state: StateType = initialState, action: ActionType): StateType {
  switch (action.type) {
    default:
      return state;
  }
}
