const { readFile, writeFile } = require('fs').promises;

/**
 * @param {string} path Relative path of the file you want read.
 * @returns Returns all the content of the selected file. 
 */
const getAllTalkers = async (path) => {
  const talkers = await readFile(path, 'utf-8');
  const parsedData = JSON.parse(talkers);

  return parsedData;
};

/**
 * 
 * @param {*} path 
 * @param {*} tokenObj 
 */
const saveNewTalker = async (path, talkerObj) => {
  const talkers = await getAllTalkers(path);
  const newId = Math.max(...talkers.map(({ id }) => id)) + 1;
  talkers.push({ id: newId, ...talkerObj });

  writeFile(path, JSON.stringify(talkers, null, '  '), { flag: 'w+' })
    .then(() => {
      console.log('File saved!');
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * @param {string} path Relative path of the file you want read.
 * @param {number} id Id of the talker
 * @returns Returns the talker info
 */
const getTalkerById = async (path, id) => {
  const talkers = await readFile(path, 'utf-8');
  const talkerArray = JSON.parse(talkers);

  return talkerArray.filter((item) => parseInt(item.id, 10) === parseInt(id, 10));
};

/**
 * 
 * @param {*} path 
 * @returns Array containing all generated tokens
 */
const getAllTokens = async (path) => {
  const tokens = await readFile(path, 'utf-8');
  const tokensList = JSON.parse(tokens).map((i) => i.token);

  return tokensList;
};

/**
 * 
 * @param {*} path 
 * @param {*} tokenObj 
 */
const saveNewToken = async (path, tokenObj) => {
  const tokens = await readFile(path, 'utf-8');
  const newTokenList = JSON.parse(tokens);

  newTokenList.push(tokenObj);

  writeFile(path, JSON.stringify(newTokenList, null, '  '), { flag: 'w+' })
    .then(() => {
      console.log(`Arquivo salvo, token: ${tokenObj.token} adicionado a lista`);
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * 
 * @param {string} path 
 * @param {object} talkerObj 
 * @param {number} oldId 
 */
 const editTalker = async (path, talkerObj, oldId) => {
  const talkers = await getAllTalkers(path);
  const filteredTalkers = talkers.filter((i) => parseInt(i.id, 10) !== parseInt(oldId, 10));
  filteredTalkers.push({ id: parseInt(oldId, 10), ...talkerObj });

  writeFile(path, JSON.stringify(filteredTalkers, null, '  '), { flag: 'w+' })
    .then(() => {
      console.log('File saved!');
    })
    .catch((err) => {
      console.error(err);
    });
};

const deleteTalker = async (path, talkerId) => {
  const talkers = await getAllTalkers(path);
  const filteredTalkers = talkers.filter((i) => parseInt(i.id, 10) !== parseInt(talkerId, 10));

  writeFile(path, JSON.stringify(filteredTalkers, null, '  '), { flag: 'w+' })
  .then(() => {
    console.log('Item deleted. File saved!');
  })
  .catch((err) => {
    console.error(err);
  });
};

const getTalkersByText = async (path, searchTerm) => {
  const talkerList = await getAllTalkers(path);
  console.log(searchTerm);

  const searchResult = talkerList.filter(({ name }) => name.includes(String(searchTerm)));

  // applyFilters
  console.log(searchResult);

  return searchResult;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  getTalkersByText,
  saveNewTalker,
  editTalker,
  deleteTalker,
  getAllTokens,
  saveNewToken,
};
