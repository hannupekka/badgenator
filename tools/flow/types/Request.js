declare type HTTPMethodType =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS';

declare type RequestTypeType = {
  type: string | Symbol,
  payload?: any,
  meta?: any
}

declare type ApiMiddlewareRequestType = {
  [CALL_API: Symbol]: Object
}

declare type ApiMiddlewareRequestParamsType = {
  endpoint: string | Function,
  method: HTTPMethodType,
  types: Array<string | RequestTypeType | Symbol>,
  body?: string | Object,
  headers?: Object | Function,
  credentials?: string,
  bailout?: bool | Function
}
