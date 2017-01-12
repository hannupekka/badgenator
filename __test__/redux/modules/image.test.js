import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import nock from 'nock';
import { API_HOST } from 'constants/config';
import reducer, * as Image from 'redux/modules/image';

const middlewares = [thunkMiddleware, apiMiddleware];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create an action for fetching image', () => {
    const image = {
      src: 'coffee.jpg'
    };

    nock(API_HOST)
      .get('/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=coffee')
      .reply(200, { image });

    const expected = [
      {
        type: Image.IMAGE_REQUEST,
        payload: 'coffee',
        meta: undefined
      },
      {
        type: Image.IMAGE_SUCCESS,
        payload: {
          image
        },
        meta: undefined
      },
    ];

    const store = mockStore();
    return store.dispatch(Image.fetchImage('coffee'))
    .then(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(Image.initialState);
  });

  it('should handle IMAGE_REQUEST', () => {
    const action = {
      type: Image.IMAGE_REQUEST,
      payload: {
        tag: 'foobar'
      }
    };

    const expected = Image.initialState.merge({
      isLoading: true,
      isError: false
    });

    expect(
      reducer(Image.initialState, action)
    ).toEqual(expected);
  });

  it('should handle IMAGE_SUCCESS', () => {
    const action = {
      type: Image.IMAGE_SUCCESS,
      payload: {
        data: 'foobar.png'
      }
    };

    const expected = Image.initialState.merge({
      isLoading: false,
      isError: false,
      image: 'foobar.png'
    });

    expect(
      reducer(Image.initialState, action)
    ).toEqual(expected);
  });

  it('should handle IMAGE_FAILURE', () => {
    const action = {
      type: Image.IMAGE_FAILURE,
      payload: {}
    };

    const expected = Image.initialState.merge({
      isLoading: false,
      isError: true
    });

    expect(
      reducer(Image.initialState, action)
    ).toEqual(expected);
  });
});
