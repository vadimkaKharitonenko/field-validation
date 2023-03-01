const { generateResponse } = require('./generateResponse');

class Validation {
  EMAIL_DOMAINS = [];
  MAX_LENGTH = null;
  MIN_LENGTH = null;

  constructor({
    EMAIL_DOMAINS = [],
    MAX_LENGTH = null,
    MIN_LENGTH = null,
  } = {}) {
    if (EMAIL_DOMAINS ) this.EMAIL_DOMAINS = EMAIL_DOMAINS;
    if (MAX_LENGTH) this.MAX_LENGTH = MAX_LENGTH;
    if (MIN_LENGTH) this.MIN_LENGTH = MIN_LENGTH;
    this.withMaxLength = this.withMaxLength.bind(this);
    this.withMinLength = this.withMinLength.bind(this);
    this.email = this.email.bind(this);
  }

  pipe(...fns) {
    return (x) => fns.reduce((y, f) => f(y), x);
  }

  setMaxLength(value) {
    this.MAX_LENGTH = value;
  }

  setMinLength(value) {
    this.MIN_LENGTH = value;
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
        message: `Максимальное количество символов ${this.MAX_LENGTH}`,
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  };

  withMinLength = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (value.length < this.MIN_LENGTH)
      return generateResponse({
        value,
        message: `Минимальное количество символов ${this.MIN_LENGTH}`,
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  };

  email = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });

    let regexp =
      /^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,6}$/i;

    if (value.indexOf(" ") !== -1)
      return generateResponse({
        value,
        message: "Пробелов быть не должно",
        status: false,
      });

    if (!(regexp.test(value) && value.split("@")[0].length >= 3))
      return generateResponse({
        value,
        message:
          'Email должен содержать символы @ и ".". Допускается ввод только латиницы',
        status: false,
      });
    
    if (this.EMAIL_DOMAINS) {
      if (this.EMAIL_DOMAINS.some((v) => value.indexOf(v) >= 0)) {
        return generateResponse({ value, message: "", status: true })
      } else {
        return generateResponse({
          value,
          message:
            `Мы не можем принять указанный Вами адрес электронной почты`,
          status: false,
        })
      }
    }

    return generateResponse({ value, message: "", status: true })
  };
}

exports.Validation = Validation;
