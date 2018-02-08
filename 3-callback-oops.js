const settings = require('./settings.json');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3();

// pwr -- simple function that returns x^n
const pwr = (x, n) => {
  return Math.pow(x, n);
}

// getArgs -- this function retrieves the args from an S3 bucket with a callback
const getArgs = () => {
  const params = { Bucket: settings.Bucket, Key: settings.Key };
  s3.getObject(params, (err, result) => {
    // callbacks should ALWAYS check for errors
    if (err) return console.log('ERROR', err);
    else return result;
  });
}

let args = getArgs();
let result = pwr(args.x, args.n);

console.log('args', args);
console.log('result', result);

/*
The problem with this version is that the callback should be passed in from the calling function
so that control is passed back to the calling function.
*/
