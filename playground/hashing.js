// const {SHA256} =require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
  id: 10
};

let token = jwt.sign(data, 'secret123asd');
console.log(token);

let decoded = jwt.verify(token, 'secret123asd');
console.log('decoded', decoded);

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
// hashing is used to obfuscate to plain text password

// console.log('Message: ' + message);
// console.log('Hash: ' + hash);
//
// let data = {
//   id: 3
// };
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'secretsalt').toString()
// };
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'secretsalt').toString();
//
// if (resultHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('Data was changed');
// }
//salting the hash
// - adding in a secret so the is different,
// so you can tell if the data has been chnged