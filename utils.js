const { readFileSync } = require('fs');

/**
 * 
 * @param {*} path Relative path of the file you want read.
 * @returns Returns all the content of the selected file. 
 */
const getAllTalkers = (path) => {
  try {
    const talkers = readFileSync(path, 'utf8');
    return JSON.parse(talkers);
  } catch (error) {
    console.log(error);
  }
};

/**
 * 
 * @param {*} path Relative path of the file you want read.
 * @returns Returns all the content of the selected file. 
 */
 const getAllTalkersById = () => null;

module.exports = {
  getAllTalkers,
  getAllTalkersById,
};
