process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

const bluebird = require('bluebird');
const fs = require('fs');
const path = require('path');
const settings = require(path.join(process.cwd(), 'settings.json'));
const AWS = require('aws-sdk');
AWS.config.update({ region: settings.region || 'us-east-1' });
const s3 = bluebird.promisifyAll(new AWS.S3());

// pwr -- simple function that returns x^n
const pwr = (x, n) => {
  return Math.pow(x, n);
}


// loops are where async-await really starts to shine
const main = async (event, context, next) => {
  const keys = settings.Array;
  for (let key of keys) {
    try {
      let params = {Bucket: settings.s3.bucket, Key: key};
      let result = await s3.getObjectAsync(params);
      let args = JSON.parse(result.Body.toString());
  
      args.pwr = pwr(args.x, args.n);
      console.log(args);
    }
    catch(err) {
      return next(err);
    }
  }

  return next(null, 'Done!');
}

module.exports.handler = main;
