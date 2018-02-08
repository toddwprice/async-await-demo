// pwr -- simple function that returns x^n
const pwr = (x, n) => {
  return Math.pow(x, n);
}

// getArgs -- retrieves the arguments we want to send to the function
const getArgs = () => {
  return require('./params.json');
}

let args = getArgs();
let result = pwr(args.x, args.n);

console.log('args', args);
console.log('result', result);


/* 
FYI -- that function-as-an-object syntax above could be written:

function pwr (x, n) {
  return Math.pow(x, n);
}
*/

