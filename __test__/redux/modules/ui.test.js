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

  it('should create an action for changing logo type', () => {
    const expected = {
      type: Ui.CHANGE_LOGO_TYPE,
      payload: {
        type: 1
      }
    };

    expect(Ui.changeLogoType(1))
      .toEqual(expected);
  });

  it('should create an action for changing logo text', () => {
    const expected = {
      type: Ui.CHANGE_LOGO_TEXT,
      payload: {
        text: 'this is logo text'
      }
    };

    expect(Ui.changeLogoText('this is logo text'))
      .toEqual(expected);
  });

  it('should create an action for changing logo file', () => {
    const expected = {
      type: Ui.CHANGE_LOGO_FILE,
      payload: {
        file: 'logofileblob'
      }
    };

    expect(Ui.changeLogoFile('logofileblob'))
      .toEqual(expected);
  });

  it('should create an action for changing logo url', () => {
    const expected = {
      type: Ui.CHANGE_LOGO_URL,
      payload: {
        url: 'https://placehold.it/250/E8117F/ffffff?text=logo'
      }
    };

    expect(Ui.changeLogoUrl('https://placehold.it/250/E8117F/ffffff?text=logo'))
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

  it('should handle CHANGE_LOGO_TYPE', () => {
    const action = {
      type: Ui.CHANGE_LOGO_TYPE,
      payload: {
        type: 1
      }
    };

    const expected = Ui.initialState
      .set('logoType', 1);

    expect(
      reducer(Ui.initialState, action)
    ).toEqual(expected);
  });

  it('should handle CHANGE_LOGO_TEXT', () => {
    const action = {
      type: Ui.CHANGE_LOGO_TEXT,
      payload: {
        text: 'this is logo text'
      }
    };

    const expected = Ui.initialState
      .set('logoText', 'this is logo text');

    expect(
      reducer(Ui.initialState, action)
    ).toEqual(expected);
  });

  it('should handle CHANGE_LOGO_FILE', () => {
    const action = {
      type: Ui.CHANGE_LOGO_FILE,
      payload: {
        file: 'logoblob'
      }
    };

    const expected = Ui.initialState
      .set('logoFile', 'logoblob');

    expect(
      reducer(Ui.initialState, action)
    ).toEqual(expected);
  });

  it('should handle CHANGE_LOGO_URL', () => {
    const action = {
      type: Ui.CHANGE_LOGO_URL,
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
