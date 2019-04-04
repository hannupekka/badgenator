// @flow
import { fromJS } from 'immutable';

export const CHANGE_COLOR = 'badgenator/ui/CHANGE_COLOR';
export const CHANGE_BADGE_WIDTH = 'badgenator/ui/CHANGE_BADGE_WIDTH';
export const CHANGE_BADGE_HEIGHT = 'badgenator/ui/CHANGE_BADGE_HEIGHT';
export const CHANGE_SIZE = 'badgenator/ui/CHANGE_SIZE';
export const CHANGE_WEIGHT = 'badgenator/ui/CHANGE_WEIGHT';
export const CHANGE_LOGO_FILE = 'badgenator/ui/CHANGE_LOGO_FILE';
export const CHANGE_LOGO_TYPE = 'badgenator/ui/CHANGE_LOGO_TYPE';
export const CHANGE_LOGO_URL = 'badgenator/ui/CHANGE_LOGO_URL';
export const CHANGE_LOGO_TEXT = 'badgenator/ui/CHANGE_LOGO_TEXT';
export const LOAD_CONFIG = 'badgenator/ui/LOAD_CONFIG';

export const changeBadgeWidth = (width: number): ActionType => ({
  type: CHANGE_BADGE_WIDTH,
  payload: {
    width,
  }
});

export const changeBadgeHeight = (height: number): ActionType => ({
  type: CHANGE_BADGE_HEIGHT,
  payload: {
    height,
  }
});

export const changeSize = (name: string, size: number): ActionType => ({
  type: CHANGE_SIZE,
  payload: {
    name,
    size
  }
});

export const changeWeight = (name: string, weight: number): ActionType => ({
  type: CHANGE_WEIGHT,
  payload: {
    name,
    weight
  }
});

export const changeColor = (name: string, color: string): ActionType => ({
  type: CHANGE_COLOR,
  payload: {
    name,
    color
  }
});

export const changeLogoFile = (file: string): ActionType => ({
  type: CHANGE_LOGO_FILE,
  payload: {
    file
  }
});

export const changeLogoType = (type: number): ActionType => ({
  type: CHANGE_LOGO_TYPE,
  payload: {
    type
  }
});

export const changeLogoUrl = (url: string): ActionType => ({
  type: CHANGE_LOGO_URL,
  payload: {
    url
  }
});

export const changeLogoText = (text: string): ActionType => ({
  type: CHANGE_LOGO_TEXT,
  payload: {
    text
  }
});

export const loadConfig = (config: Map<string, string>): ActionType => ({
  type: LOAD_CONFIG,
  payload: {
    config
  }
});

export const initialState = fromJS({
  badgeWidth: 8.6,
  badgeHeight: 5.9,
  headerBackground: '#D90429',
  headerText: '#FFFFFF',
  headerSize: 1,
  nameBackground: '#FFFFFF',
  nameText: '#000000',
  firstNameSize: 1.2,
  lastNameSize: 1.0,
  firstNameWeight: 700,
  lastNameWeight: 400,
  footerBackground: '#D90429',
  footerText: '#FFFFFF',
  footerSize: 1,
  logoFile: '',
  logoType: 0,
  logoUrl: 'https://placehold.it/300x100/ffffff/000000?text=LOGO',
  logoText: 'Company Ltd'
});

export default function reducer(state: StateType = initialState, action: ActionType): StateType {
  switch (action.type) {
    case CHANGE_BADGE_WIDTH:
      return state.set('badgeWidth', action.payload.width);
    case CHANGE_BADGE_HEIGHT:
      return state.set('badgeHeight', action.payload.height);
    case CHANGE_SIZE:
      return state.set(action.payload.name, action.payload.size);
    case CHANGE_WEIGHT:
      return state.set(action.payload.name, action.payload.weight);
    case CHANGE_COLOR:
      return state.set(action.payload.name, action.payload.color);
    case CHANGE_LOGO_FILE:
      return state.set('logoFile', action.payload.file);
    case CHANGE_LOGO_TYPE:
      return state.set('logoType', action.payload.type);
    case CHANGE_LOGO_URL:
      return state.set('logoUrl', action.payload.url);
    case CHANGE_LOGO_TEXT:
      return state.set('logoText', action.payload.text);
    case LOAD_CONFIG:
      return state.merge(action.payload.config);
    default:
      return state;
  }
}
