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
});
