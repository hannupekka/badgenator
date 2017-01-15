// @flow
import { fromJS } from 'immutable';

export const CHANGE_COLOR = 'badgenator/ui/CHANGE_COLOR';
export const CHANGE_LOGO = 'badgenator/ui/CHANGE_LOGO';

export const changeColor = (name: string, color: string): ActionType => ({
  type: CHANGE_COLOR,
  payload: {
    name,
    color
  }
});

export const changeLogo = (url: string): ActionType => ({
  type: CHANGE_LOGO,
  payload: {
    url
  }
});

export const initialState = fromJS({
  headerBackground: '#424862',
  headerText: '#FFFFFF',
  nameBackground: '#FFFFFF',
  nameText: '#000000',
  footerBackground: '#515E8B',
  footerText: '#FFFFFF',
  logoUrl: 'https://placehold.it/150/636987/ffffff?text=LOGO'
});

export default function reducer(state: StateType = initialState, action: ActionType): StateType {
  switch (action.type) {
    case CHANGE_COLOR:
      return state.set(action.payload.name, action.payload.color);
    case CHANGE_LOGO:
      return state.set('logoUrl', action.payload.url);
    default:
      return state;
  }
}
