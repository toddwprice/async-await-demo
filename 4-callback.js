const pwr = require('./pwr');
const settings = require('./settings.json');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3();

// getArgs -- this version expects a callback function to be passed in
const getArgs = (callback) => {
  const params = { Bucket: settings.s3.bucket, Key: settings.s3.keys.single_arg };
  s3.getObject(params, callback);
}

const main = () => {
  // call the getArgs and include a callback function
  getArgs((err, data) => {
    if (err) throw err;

    const args = JSON.parse(data.Body);
    const result = pwr(args.x, args.n);

    console.log('args', args);
    console.log('result', result);
      
  });
}

main();

/*
Finally we have a working callback! This style is fine for simple scripts like this,
but for anything requiring several async invocations, this style quickly becomes
difficult to read and maintain.
*/