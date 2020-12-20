if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStoreProd');
  // console.log(' store production');
} else {
  module.exports = require('./configureStoreDev');
  // console.log(' store development');
}
