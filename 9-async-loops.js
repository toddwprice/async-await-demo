const pwr = require('./pwr');
const settings = require('./settings.json');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const bluebird = require('bluebird');
const s3 = bluebird.promisifyAll(new AWS.S3());

// serial loops are where async-await really makes things easy
const main = async () => {
  try {
    // get the list of keys
    const keyList = await s3.getObjectAsync({Bucket: settings.s3.bucket, Key: settings.s3.keys.array_10});
    const keys = JSON.parse(keyList.Body);

    // iterate over the keys and get each file
    for (let key of keys) {
        const result = await s3.getObjectAsync({Bucket: settings.s3.bucket, Key: key});
        let args = JSON.parse(result.Body);
    
        args.pwr = pwr(args.x, args.n);
        console.log(args);
    }

  }
  catch(err) {
    console.log('ERROR', err);
  }

}

main();