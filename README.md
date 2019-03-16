# oci-functions-nodejs-invoke-function
This repository contains an example of how an Oracle Functions function can be invoked from a Node application. In a very similar way, we can invoke other REST APIs for other OCI services.

You have to provide configuration details, including a private key file, your tenancy, user, compartment, public key fingerprint etc.

```
invokeFunction( {path : <functionInvokePath> , host : <functionInvokeHost> } , <payload>)
```
for example:
```
invokeFunction(
    { path : '/20181201/functions/ocid1.fnfunc.oc1.phx.aaaaaaaaabxgkhbi7y5vkfts/actions/invoke'
    , host : 'nub6pz.us-phoenix-1.functions.oci.oraclecloud.com'
    },
    { name:"Dodo4"
    , content: "My very very special Content"
    })

```

## Installing & Running

Clone this Repository

Run npm install

## Make Fixes in Node Module HTTP-Signature
Due to a bug in http-signature ([see this article](https://github.com/joyent/node-http-signature/issues/81)) you need to make a few manual fixes in file node_modules\http-signature\lib\signer.js in order to make signing work with a private key file that is protected with a passphrase:

At line 293 I inserted the following:
```assert.optionalString(options.passphrase, 'options.passphrase');```

At line 363 (formerly line 362) I modifed the line to the following to propagate the options object:
```key = sshpk.parsePrivateKey(options.key, 'auto', options);```

## Copy your Private Key file into the project
At one point, you have probably used `openssl genrsa` to generate a private key (protected wuth a passphrase) resulting in a *.pem file. Please copy this file into the project. In the next step, you have to set the relative location of this file in the configuration.js file - property privateKeyFile.

## Logging
The code is configured to use the Papertrail service for logging.

You will need to update the logger.js file if you do not want to use Papertrail - but a different logging service or just a local one.

## Configure your environment parameters in confguration.js
File configuration.js contains all environment specific settings for your Cloud Tenancy, Compartment, User, Public Fingerprint and Private Key. Update this file with your own settings.

## Resources
Crucial resources:

[Fix for http-signature to wok with passphrase](https://github.com/joyent/node-http-signature/issues/81)

[GitHub Repo OCI-Rest-APIs-nodejs by Christopher Beck with foundation for invoking many OCI REST APIs from NodeJS - I have used crucial elements from this example](https://github.com/christopherbeck/OCI-Rest-APIs-nodejs)

[Papertrail Logging Service](https://papertrailapp.com)

[Medium Article: Logging in NodeJS using Papertrail](https://medium.com/@gauravumrani/logging-in-nodejs-using-papertrail-47ed7d888457)

