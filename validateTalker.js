const validateDate = (date) => {
  const dateRegEx = /^(0[1-9]|[12]\d|3[01])[/](0[1-9]|1[0-2])[/]\d{4}$/gm;
  const validDate = date.match(dateRegEx);
  if (!validDate) return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
 };

const validateRate = (rating) => {
  const validRate = [1, 2, 3, 4, 5].includes(rating);
  if (!validRate) return 'O campo "rate" deve ser um inteiro de 1 à 5';
};

const validateTalkObj = (talk) => {
  try {
    const { rate, watchedAt } = talk;
    const invalidRate = validateRate(rate);
    const invalidDate = validateDate(watchedAt);

    if (!rate || !watchedAt) {
      return 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
    }

    return invalidRate || invalidDate;
  } catch (error) {
    console.log(error);
    return 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  }
};

const validateAge = (age) => {
  if (!age) return 'O campo "age" é obrigatório';
  if (age < 18) return 'A pessoa palestrante deve ser maior de idade';

  return null;
};

const validateName = (name) => {
  if (!name) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';

  return null;
};

const validateTalker = (talkerData) => {
  const { name, age, talk } = talkerData;
  const httpStatus = 400;
  const inValidName = validateName(name);
  const inValidAge = validateAge(age);
  const inValidTalk = validateTalkObj(talk);

  return [httpStatus, (inValidName || inValidAge || inValidTalk)];
};

module.exports = validateTalker;
