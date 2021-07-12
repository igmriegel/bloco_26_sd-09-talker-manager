/**
 * Validates the provided email against a REGEX pattern
 * @param {*} email 
 * @returns 
 */
const validateEmail = (email) => {
  if (!email) return [400, 'O campo "email" é obrigatório'];

  const emailPattern = /[^@]+@[^.]+\..+/;
  const matchEmail = email.match(emailPattern);
  if (!matchEmail) return [400, 'O "email" deve ter o formato "email@email.com"'];

  return ['email succesfuly validated'];
};

/**
 * Validates the password length
 * @param {*} pass 
 * @returns 
 */
const validatePassword = (pass) => {
  if (!pass) return [400, 'O campo "password" é obrigatório'];

  const passwordSize = pass.length > 6;
  if (!passwordSize) return [400, 'O "password" deve ter pelo menos 6 caracteres'];

  return ['password succesfuly validated'];
};

/**
 * 
 * @param {*} email 
 * @param {*} pass 
 * @returns Array containing an HTTP status and validation msg
 */
const validateLoginInfo = (email, pass) => {
  const emailValidation = validateEmail(email);
  const passValidation = validatePassword(pass); 

  if (emailValidation.length > 1) {
    return [...emailValidation];
  }

  if (passValidation.length > 1) {
    return [...passValidation];
  }

  return [200, 'succesfuly validated, token can be generated'];
};

module.exports = validateLoginInfo;
