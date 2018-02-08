const settings = require('./settings.json');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3();


// pwr -- simple function that returns x^n
const pwr = (x, n) => {
  return Math.pow(x, n);
}

// getArgs -- this function retrieves the args from an S3 bucket
const getArgs = () => {
  const params = { Bucket: settings.Bucket, Key: settings.Key };
  return s3.getObject(params);
}

let args = getArgs();
let result = pwr(args.x, args.n);

console.log('args', args);
console.log('result', result);

/*
`params` does not hold the data retrieved from the S3 bucket, but a Response object.
We need to pass in a callback that will be executed after the object has been retrieved.
*/