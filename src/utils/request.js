// @flow
import { CALL_API } from 'redux-api-middleware';

export default (data: ApiMiddlewareRequestParamsType): ApiMiddlewareRequestType => {
  const request: Object = {};
  request[CALL_API] = data;
  return request;
};
