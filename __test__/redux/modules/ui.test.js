import { fromJS } from 'immutable';
import reducer, * as Ui from 'redux/modules/ui';

describe('actions', () => {
  it('should create an action for toggling greeting', () => {
    const expected = {
      type: Ui.TOGGLE_GREETING,
      payload: {}
    };

    expect(Ui.toggleGreeting()).toEqual(expected);
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(Ui.initialState);
  });

  it('should handle TOGGLE_GREETING', () => {
    const action = {
      type: Ui.TOGGLE_GREETING,
      payload: {}
    };

    const expected = fromJS({
      showGreeting: true
    });

    expect(
      reducer(Ui.initialState, action)
    ).toEqual(expected);
  });
});
