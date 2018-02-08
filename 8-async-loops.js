const settings = require('./settings.json');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const bluebird = require('bluebird');
const s3 = bluebird.promisifyAll(new AWS.S3());

const keys = require('./array.json');

// pwr -- simple function that returns x^n
const pwr = (x, n) => {
  return Math.pow(x, n);
}

// loops are where async-await really starts to shine
const main = async () => {
  for (let key of keys) {
    try {
      let params = {Bucket: settings.Bucket, Key: key};
      let result = await s3.getObjectAsync(params);
      let args = JSON.parse(result.Body.toString());
  
      args.pwr = pwr(args.x, args.n);
      console.log(args);
    }
    catch(err) {
      console.log('ERROR', err);
    }
  }
}

main();