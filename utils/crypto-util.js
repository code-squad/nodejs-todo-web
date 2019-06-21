const crypto = require('crypto');

const getCryptoHash = (input) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      crypto.pbkdf2(input, buf.toString('base64'), 5423, 16, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve(
          key.toString('base64'),
        );
      });
    });
  })
};

module.exports = {
  getCryptoHash,
}