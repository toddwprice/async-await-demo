  
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const settings = require('../settings.json');
const bluebird = require('bluebird');
const s3 = bluebird.promisifyAll(new AWS.S3());
const fs = require('fs');
const short = require('short-uuid');

let params = [];
let keys;

const makeArray = () => {
  for (let i=0; i<100; i++) {
    let x = Math.round(Math.random() * 9);
    let n = Math.round(Math.random() * 18);
    let key = 'args/' + short().new();
    params.push({key: key, x: x, n: n});
  }

  keys = params.map(item => { return item.key});
};

const uploadToS3 = async () => {
  await s3.uploadAsync({Bucket: settings.s3.bucket, Key: 'array-100.json', Body: JSON.stringify(keys)});
  await s3.uploadAsync({Bucket: settings.s3.bucket, Key: 'array-10.json', Body: JSON.stringify(keys.slice(0,10))});
  
  for (let item of params) {
    let key = item.key;
    delete item.key;
    console.log(key, item);
    await s3.uploadAsync({Bucket: settings.s3.bucket, Key: key, Body: JSON.stringify(item)});
  }

  console.log('Done!');
};

makeArray();
uploadToS3();