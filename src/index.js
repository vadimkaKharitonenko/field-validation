const { generateResponse } = require('./generateResponse');
const { ERROR_MESSAGES } = require('./errorMessages');

const { RU_ERRORS, EN_ERRORS } = ERROR_MESSAGES;

class Validation {
  EMAIL_DOMAINS = [];
  MAX_LENGTH = null;
  MIN_LENGTH = null;
  LANG = "RU";
  ERRORS = {
    RU: RU_ERRORS,
    EN: EN_ERRORS,
    CUSTOM: null,
  }

  constructor({
    EMAIL_DOMAINS = [],
    MAX_LENGTH = null,
    MIN_LENGTH = null,
    LANG = "RU",
    CUSTOM_ERRORS,
  } = {}) {
    if (EMAIL_DOMAINS ) this.EMAIL_DOMAINS = EMAIL_DOMAINS;
    if (MAX_LENGTH) this.MAX_LENGTH = MAX_LENGTH;
    if (MIN_LENGTH) this.MIN_LENGTH = MIN_LENGTH;
    if (LANG) this.LANG = LANG;
    if (CUSTOM_ERRORS) this.ERRORS.CUSTOM = CUSTOM_ERRORS;

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

  setCustomErrors(value) {
    this.ERRORS.CUSTOM = value;
  }

  setEmailDomains(value) {
    this.EMAIL_DOMAINS = value;
  }

  notEmpty = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });

    if (value === "" || !value)
      return generateResponse({
        value,
        message: this.ERRORS[this.LANG].notEmpty,
        status: false,
      });
    if (value.match(/\s/gi) && value.match(/\s/gi).length === value.length)
      return generateResponse({
        value,
        message: this.ERRORS[this.LANG].notEmpty,
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  };

  onlyRus = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (/[a-zA-Z]/i.test(value))
      return generateResponse({
        value,
        message: this.ERRORS[this.LANG].onlyRus,
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  };

  onlyEng = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (/[а-яё]/i.test(value))
      return generateResponse({
        value,
        message: this.ERRORS[this.LANG].onlyEng,
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  };

  withMaxLength = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (value.length > this.MAX_LENGTH)
      return generateResponse({
        value,
        message: this.ERRORS[this.LANG].withMaxLength.replace('[MAX_LENGTH]', this.MAX_LENGTH),
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  };

  withMinLength = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (value.length < this.MIN_LENGTH)
      return generateResponse({
        value,
        message: this.ERRORS[this.LANG].withMinLength.replace('[MIN_LENGTH]', this.MIN_LENGTH),
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
        message: this.ERRORS[this.LANG].email.spaces,
        status: false,
      });

    if (!(regexp.test(value) && value.split("@")[0].length >= 3))
      return generateResponse({
        value,
        message: this.ERRORS[this.LANG].email.missingDogOrDot,
        status: false,
      });
    
    if (this.EMAIL_DOMAINS) {
      if (this.EMAIL_DOMAINS.some((v) => value.indexOf(v) >= 0)) {
        return generateResponse({ value, message: "", status: true })
      } else {
        return generateResponse({
          value,
          message: this.ERRORS[this.LANG].email.notFromAvailable,
          status: false,
        })
      }
    }

    return generateResponse({ value, message: "", status: true })
  };
}

exports.Validation = Validation;
