const settings = require('./settings.json');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3();

// pwr -- simple function that returns x^n
const pwr = (x, n) => {
  return Math.pow(x, n);
}

// getArgs -- this version returns a Promise and does not need a callback passed in
const getArgs = () => {
  return new Promise((resolve, reject) => {
    const params = { Bucket: settings.Bucket, Key: settings.Key };
  
    s3.getObject(params, (err, data) => {
      if (err) return reject(err);
      return resolve(JSON.parse(data.Body));
    });
  
  });
}

// now we call the same Promise-wrapped getArgs function, but using async-await syntax
const main = async () => {
  try {
    let args = await getArgs();
    const result = pwr(args.x, args.n);
    
    console.log('args', args);
    console.log('result', result);
  }
  catch(err) {
    console.log('ERROR', err);
  }
}

main();

/*
This style actually cost us a couple lines of code, but we have familiar try...catch error 
handling now.
*/
