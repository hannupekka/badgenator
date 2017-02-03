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
  headerBackground: '#D90429',
  headerText: '#FFFFFF',
  nameBackground: '#FFFFFF',
  nameText: '#000000',
  footerBackground: '#D90429',
  footerText: '#FFFFFF',
  logoUrl: 'https://placehold.it/300x100/ffffff/000000?text=LOGO'
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
