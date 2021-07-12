const { readFile, writeFile } = require('fs/promises');

/**
 * @param {string} path Relative path of the file you want read.
 * @returns Returns all the content of the selected file. 
 */
const getAllTalkers = async (path) => {
    const talkers = await readFile(path, 'utf8');

    return JSON.parse(talkers);
};

/**
 * @param {string} path Relative path of the file you want read.
 * @param {number} id Id of the talker
 * @returns Returns the talker info
 */
const getTalkerById = async (path, id) => {
  const talkers = await readFile(path, 'utf8');
  const talkerArray = JSON.parse(talkers);

  return talkerArray.filter((item) => parseInt(item.id, 10) === parseInt(id, 10));
};

/**
 * 
 * @param {*} path 
 * @returns 
 */
const getAllTokens = async (path) => {
  const tokens = await readFile(path, 'utf8');
  const tokensList = JSON.parse(tokens).map((i) => i.token);

  return tokensList;
};

/**
 * 
 * @param {*} path 
 * @param {*} tokenObj 
 */
const saveNewToken = async (path, tokenObj) => {
  const tokens = await readFile(path, 'utf8');
  const newTokenList = JSON.parse(tokens);

  newTokenList.push(tokenObj);

  writeFile(path, JSON.stringify(newTokenList, null, ' '), { flag: 'w+' })
    .then(() => {
      console.log('Arquivo salvo');
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  getAllTokens,
  saveNewToken,
};
