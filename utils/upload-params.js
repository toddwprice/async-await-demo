const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const settings = require('../settings.json');
const bluebird = require('bluebird');
const s3 = bluebird.promisifyAll(new AWS.S3());

(async () => {

  try {
    const payload = {
      Bucket: settings.s3.bucket,
      Key: settings.s3.keys.single_arg,
      Body: JSON.stringify(settings.args)
    };

    const result = await s3.uploadAsync(payload);
    console.log('Done!');
  }
  catch(err) {
    console.log('ERROR', err);
  }

})();