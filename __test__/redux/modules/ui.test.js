import { fromJS } from 'immutable';
import reducer, * as Ui from 'redux/modules/ui';

describe('actions', () => {
  it('should create an action for changing color', () => {
    const expected = {
      type: Ui.CHANGE_COLOR,
      payload: {
        name: 'footerBackground',
        color: '#fff000'
      }
    };

    expect(Ui.changeColor('footerBackground', '#fff000')).toEqual(expected);
  });

  it('should create an action for changing logo', () => {
    const expected = {
      type: Ui.CHANGE_LOGO,
      payload: {
        url: 'https://placehold.it/250/E8117F/ffffff?text=logo'
      }
    };

    expect(Ui.changeLogo('https://placehold.it/250/E8117F/ffffff?text=logo'))
      .toEqual(expected);
  });

  it('should create an action for loading config', () => {
    const config = fromJS({
      headerBackground: '#D90429',
      headerText: '#89d8a5',
      nameBackground: '#7e2bad',
      nameText: '#ffd907',
      footerBackground: '#757373',
      footerText: '#3ba064',
      logoUrl: 'https://placehold.it/300x100/ffffff/000000?text=LOGOSS'
    });

    const expected = {
      type: Ui.LOAD_CONFIG,
      payload: {
        config
      }
    };

    expect(Ui.loadConfig(config))
      .toEqual(expected);
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(Ui.initialState);
  });

  it('should handle CHANGE_COLOR', () => {
    const action = {
      type: Ui.CHANGE_COLOR,
      payload: {
        name: 'footerBackground',
        color: '#fff000'
      }
    };

    const expected = Ui.initialState.set('footerBackground', '#fff000');

    expect(
      reducer(Ui.initialState, action)
    ).toEqual(expected);
  });

  it('should handle CHANGE_LOGO', () => {
    const action = {
      type: Ui.CHANGE_LOGO,
      payload: {
        url: 'https://placehold.it/250/E8117F/ffffff?text=foobar'
      }
    };

    const expected = Ui.initialState
      .set('logoUrl', 'https://placehold.it/250/E8117F/ffffff?text=foobar');

    expect(
      reducer(Ui.initialState, action)
    ).toEqual(expected);
  });

  it('should handle LOAD_CONFIG', () => {
    const config = fromJS({
      headerBackground: '#D90429',
      headerText: '#89d8a5',
      nameBackground: '#7e2bad',
      nameText: '#ffd907',
      footerBackground: '#757373',
      footerText: '#3ba064',
      logoUrl: 'https://placehold.it/300x100/ffffff/000000?text=LOGOSS'
    });

    const action = {
      type: Ui.LOAD_CONFIG,
      payload: {
        config
      }
    };

    const expected = Ui.initialState
      .merge(config);

    expect(
      reducer(Ui.initialState, action)
    ).toEqual(expected);
  });
});
