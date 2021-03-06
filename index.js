const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const utils = require('./utils');
const validateLoginInfo = require('./validateLogin');
const validateToken = require('./validateToken');
const validateTalker = require('./validateTalker');
const generateAndSaveToken = require('./generateToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKERS_DATA = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (_request, response) => {
  const talkerList = await utils.getAllTalkers(TALKERS_DATA);

  if (!talkerList[0]) {
    response.status(HTTP_OK_STATUS).send([]);
  }

  response.status(HTTP_OK_STATUS).send(talkerList);
}));

app.post('/talker', rescue(async (request, response) => {
  const { body, headers: { authorization } } = request;
  const [tokenValid, status, message] = await validateToken(authorization);
  const [validationStatus, validationMsg] = validateTalker(body);

  if (!tokenValid) {
    response.status(status).json({ message });
  }
  if (validationMsg) {
    response.status(validationStatus).json({ message: validationMsg });
  }

  await utils.saveNewTalker(TALKERS_DATA, body);
  const talkerList = await utils.getAllTalkers(TALKERS_DATA);
  const [savedTalker] = talkerList.slice(-1);

  response.status(201).json(savedTalker);
}));

app.get('/talker/search', rescue(async (request, response) => {
  const { query: { q } } = request;
  const { headers: { authorization } } = request;
  const [tokenValid, status, message] = await validateToken(authorization);

  if (!tokenValid) {
    response.status(status).json({ message });
  }

  const queryResult = await utils.getTalkersByText(TALKERS_DATA, q);

  response.status(HTTP_OK_STATUS).json(queryResult);
}));

app.get('/talker/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const [talker] = await utils.getTalkerById(TALKERS_DATA, id);

  if (!talker) {
    response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  response.status(HTTP_OK_STATUS).send(talker);
}));

app.put('/talker/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const { body, headers: { authorization } } = request;
  const [tokenValid, status, message] = await validateToken(authorization);
  const [validationStatus, validationMsg] = validateTalker(body);

  if (!tokenValid) return response.status(status).json({ message });
  if (validationMsg) return response.status(validationStatus).json({ message: validationMsg });

  await utils.editTalker(TALKERS_DATA, body, id);
  const [talker] = await utils.getTalkerById(TALKERS_DATA, id);

  response.status(200).json(talker);
}));

app.delete('/talker/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const { headers: { authorization } } = request;
  const [tokenValid, status, message] = await validateToken(authorization);
  const successMessage = 'Pessoa palestrante deletada com sucesso';

  if (!tokenValid) {
    response.status(status).json({ message });
  }

  await utils.deleteTalker(TALKERS_DATA, id);

  response.status(200).json({ message: successMessage });
}));

app.post('/login', rescue(async (request, response) => {
  const { email, password } = request.body;
  const [status, message] = validateLoginInfo(email, password);

  console.log(status, message);
  if (status !== 200) {
    response.status(status).json({ message });
  }

  const token = await generateAndSaveToken('./loginTokens.json', email);

  response.status(HTTP_OK_STATUS).json({ token });
}));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
