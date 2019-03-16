var ocirest = require('../../utils/ocirest.js');

function invokeFunction(auth, parameters, callback) {
  var possibleHeaders = ['opc-client-request-id', 'if-match', 'if-match-none'];
  var headers = ocirest.buildHeaders(possibleHeaders, parameters);
  ocirest.process(auth,
    {
      path: parameters.path,
      host: parameters.host,
      headers: headers,
      method: 'POST',
      body: parameters.body
    },
    callback);
}
module.exports = {
  invokeFunction: invokeFunction
}