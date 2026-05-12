const morgan = require("morgan");

const loggerMiddleware = morgan(
  ":date[iso] :method :url :status :response-time ms - :remote-addr"
);

module.exports = loggerMiddleware;