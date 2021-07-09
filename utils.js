const { readFile } = require('fs/promises');

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

module.exports = {
  getAllTalkers,
  getTalkerById,
};
