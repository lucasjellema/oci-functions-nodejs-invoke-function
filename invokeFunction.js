
var fs = require('fs');
var functions = require('./services/functions.js');
var logger = require('./logger');
const configs = require('./configuration');
const configuration = configs.configs;

var auth = {
    tenancyId: configuration.tenancyId,
    userId: configuration.userId,
    keyFingerprint: configuration.keyFingerprint,
    RESTversion: configuration.RESTversion,
    region: configuration.region
};
auth.privateKey = fs.readFileSync(configuration.privateKeyFile, 'ascii');
auth.passphrase = configuration.passphrase
// set up parameters object
//
var parameters = {
    compartmentId: configuration.compartmentId
};
var callback = function (data) {
    logger.log('debug', JSON.stringify(data))
    console.log(JSON.stringify(data))
    return
};

async function invokeFunction(functionParams, input) {
    logger.log('info', `invoke function for ${JSON.stringify(input)} `)
    // set up the parameter object
    parameters = {    };
    // found through fn inspect f soaring shippings-generator
    parameters.path = functionParams.path
    parameters.host = functionParams.host
    parameters.body = input;
    functions.func.invokeFunction(auth, parameters, callback);
    return;
}// invokeFunction


// test call
invokeFunction(
    {path : '/20181201/functions/ocid1.fnfunc.oc1.phx.aaaaaaaaabxgkhbi7y5vkftsfodu5gd2mp4abxx3hqsh7noey2dssr2aen7a/actions/invoke'
    ,host : 'nub6pzh46mq.us-phoenix-1.functions.oci.oraclecloud.com'
    },
    {name:"Dodo5", content: "My very very special Content", moreContent: "Something completely different", value: 34 })
