const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const params = require('../params.json');
const settings = require('../settings.json');
const bluebird = require('bluebird');
const s3 = bluebird.promisifyAll(new AWS.S3());

(async () => {

  try {
    const payload = {
      Bucket: settings.Bucket,
      Key: settings.Key,
      Body: JSON.stringify(params)
    };

    const result = await s3.uploadAsync(payload);
    console.log('Done!');
  }
  catch(err) {
    console.log('ERROR', err);
  }

})();