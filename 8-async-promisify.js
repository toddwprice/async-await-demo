const pwr = require('./pwr');
const settings = require('./settings.json');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const bluebird = require('bluebird');
const s3 = bluebird.promisifyAll(new AWS.S3());

// we can use the `bluebird` library to Promisify a function that normally expects a callback
const main = async () => {
  try {
    const params = { Bucket: settings.s3.bucket, Key: settings.s3.keys.single_arg };
    const data = await s3.getObjectAsync(params);
    const args = JSON.parse(data.Body);
    const result = pwr(args.x, args.n);
    
    console.log('args', args);
    console.log('result', result);
  }
  catch(err) {
    console.log('ERROR', err);
  }
}

main();

/*
This version saved us about 10 lines of code! By using Promisify on librairies you use frequently,
such as request, AWS, database calls, etc. you can save yourself a LOT of boilerplate code
that you would otherwise have to write to wrap your functions in Promises.
*/