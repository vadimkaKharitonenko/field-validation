const RU_ERRORS = {
  notEmpty: "Поле не заполнено",
  onlyRus: "Проверьте раскладку клавиатуры",
  onlyEng: "Проверьте раскладку клавиатуры",
  withMaxLength: `Максимальное количество символов [MAX_LENGTH]`,
  withMinLength: `Минимальное количество символов [MIN_LENGTH]`,
  email: {
    spaces: "Пробелов быть не должно",
    missingDogOrDot: `Email должен содержать символы @ и ".". Допускается ввод только латиницы`,
    notFromAvailable: `Мы не можем принять указанный Вами адрес электронной почты`,
  }
};

const EN_ERRORS = {
  notEmpty: "The field is not filled",
  onlyRus: "Check your keyboard layout",
  onlyEng: "Check your keyboard layout",
  withMaxLength: `Maximum number of characters [MAX_LENGTH]`,
  withMinLength: `Minimum number of characters [MIN_LENGTH]`,
  email: {
    spaces: "There should be no spaces",
    missingDogOrDot: `Email must contain @ and "." characters. Only Latin characters are allowed`,
    notFromAvailable: `We cannot accept the email address you provided.`,
  }
};

exports.ERROR_MESSAGES = { RU_ERRORS, EN_ERRORS };
