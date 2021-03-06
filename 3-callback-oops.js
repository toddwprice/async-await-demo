const pwr = require('./pwr');
const settings = require('./settings.json');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3();

// getArgs -- this function retrieves the args from an S3 bucket with a callback
const getArgs = () => {
  const params = { Bucket: settings.s3.bucket, Key: settings.s3.keys.single_arg };
  s3.getObject(params, (err, result) => {
    // callbacks should ALWAYS check for errors
    if (err) return console.log('ERROR', err);
    else return result;
  });
}

const main = () => {
  const args = getArgs();
  const result = pwr(args.x, args.n);
  
  console.log('args', args);
  console.log('result', result);
}

main();

/*
The problem with this version is that the callback should be passed in from the calling function
so that control is passed back to the calling function.
*/
