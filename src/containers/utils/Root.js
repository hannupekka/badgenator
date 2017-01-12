// @flow
const Root = process.env.NODE_ENV === 'production' ?
  require('containers/utils/Root.prod') : require('containers/utils/Root.dev');

export default Root;
