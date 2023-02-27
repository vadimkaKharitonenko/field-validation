const { generateResponse } = require('./generateResponse');

class Validation {
  EMAIL_DOMAINS = [];
  MAX_LENGTH = null;

  constructor({ EMAIL_DOMAINS = [], MAX_LENGTH = null } = {}) {
    if (EMAIL_DOMAINS ) this.EMAIL_DOMAINS = EMAIL_DOMAINS;
    if (MAX_LENGTH) this.MAX_LENGTH = MAX_LENGTH;
    this.withMaxLength = this.withMaxLength.bind(this);
  }

  pipe(...fns) {
    return (x) => fns.reduce((y, f) => f(y), x);
  }

  setMaxLength(value) {
    this.MAX_LENGTH = value;
  }

  notEmpty = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (value === "" || !value)
      return generateResponse({
        value,
        message: "Поле не заполнено",
        status: false,
      });
    if (value.match(/\s/gi) && value.match(/\s/gi).length === value.length)
      return generateResponse({
        value,
        message: "Поле не заполнено",
        status: false,
      });
    if (value[0] === " " || value[value.length - 1] === "-" || value[0] === "-")
      return generateResponse({
        value,
        message: "Поле заполнено не правильно",
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  };

  onlyRus = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (/[a-zA-Z]/i.test(value))
      return generateResponse({
        value,
        message: "Проверьте раскладку клавиатуры",
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  };

  onlyEng = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (/[а-яё]/i.test(value))
      return generateResponse({
        value,
        message: "Проверьте раскладку клавиатуры",
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  };

  withMaxLength = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (value.length > this.MAX_LENGTH)
      return generateResponse({
        value,
        message: "Максимальное количество символов 50",
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  };
}

exports.Validation = Validation;
