const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const utils = require('./utils');
const validateLoginInfo = require('./validateLogin');
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

app.get('/talker/:id', rescue(async (request, response) => {
  const { id } = request.params;
  const [talker] = await utils.getTalkerById(TALKERS_DATA, id);

  if (!talker) {
    response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  response.status(HTTP_OK_STATUS).send(talker);
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
