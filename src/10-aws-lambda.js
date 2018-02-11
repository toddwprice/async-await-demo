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
  try {
    // get the list of keys
    const keyList = await s3.getObjectAsync({Bucket: settings.s3.bucket, Key: settings.s3.keys.array_10});
    const keys = JSON.parse(keyList.Body);

    // iterate over the keys and get each file
    let retval = [];
    for (let key of keys) {
        const result = await s3.getObjectAsync({Bucket: settings.s3.bucket, Key: key});
        let args = JSON.parse(result.Body);
    
        args.pwr = pwr(args.x, args.n);
        retval.push(args);
        console.log(args);
    }

    return next(null, retval);
  }
  catch(err) {
    console.log('ERROR', err);
    return next(err);
  }

}

module.exports.handler = main;
