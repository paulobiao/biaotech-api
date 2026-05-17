const morgan = require("morgan");

morgan.token("request-id", (req) => req.requestId);

const loggerMiddleware = morgan(
  "[:request-id] :date[iso] :method :url :status :response-time ms - :remote-addr"
);

module.exports = loggerMiddleware;