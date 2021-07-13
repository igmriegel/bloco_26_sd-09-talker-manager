const { getAllTokens } = require('./utils');

/**
 * 
 * @param {string} token 
 * @returns Array containing token's validation status, if the token is invalid returns the following array
 * [false, status, message regarding token validation]
 */
const validateToken = async (token) => {
  const tokenList = await getAllTokens('./loginTokens.json');
  const tokenExists = tokenList.includes(token);

  if (!token) return [false, 401, 'Token não encontrado'];

  if (token.length !== 16) return [false, 401, 'Token inválido'];

  if (!tokenExists) return [false, 401, 'Token não encontrado'];

  return [true];
};

module.exports = validateToken;
