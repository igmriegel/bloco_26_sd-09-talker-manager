const { randomBytes } = require('crypto');
const { saveNewToken } = require('./utils');

const generateAndSaveToken = async (filePath, email) => {
  const token = randomBytes(8).toString('hex');

  await saveNewToken(filePath, { email, token });

  return token;
};

module.exports = generateAndSaveToken;
