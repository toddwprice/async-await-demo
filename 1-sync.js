const pwr = require('./pwr');

// NOTE: every example builds on a simple math operation function that takes two arguments (x,n)
//    and returns x^n
//    This first example gets the arguments from a local file.

// getArgs -- retrieves the arguments we want to send to the function
const getArgs = () => {
  const settings = require('./settings.json');
  return settings.args;
}

const main = () => {
  const args = getArgs();
  const result = pwr(args.x, args.n);
  
  console.log('args', args);
  console.log('result', result);
}

main();


/* 
FYI -- that function-as-an-object syntax above could be written:

function pwr (x, n) {
  return Math.pow(x, n);
}
*/

