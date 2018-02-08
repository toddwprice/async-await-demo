'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
};

// loops are where async-await really starts to shine
const main = (() => {
  var _ref = _asyncToGenerator(function* (event, context, next) {
    const keys = settings.Array;
    for (let key of keys) {
      try {
        let params = { Bucket: settings.Bucket, Key: key };
        let result = yield s3.getObjectAsync(params);
        let args = JSON.parse(result.Body.toString());

        args.pwr = pwr(args.x, args.n);
        console.log(args);
      } catch (err) {
        return next(err);
      }
    }

    return next(null, 'Done!');
  });

  return function main(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

module.exports.handler = main;