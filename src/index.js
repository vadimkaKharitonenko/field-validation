const { generateResponse } = require('./generateResponse');
const { ERROR_MESSAGES } = require('./errorMessages');

const { RU_ERRORS, EN_ERRORS } = ERROR_MESSAGES;

function Validation({
  EMAIL_DOMAINS = [],
  MAX_LENGTH = null,
  MIN_LENGTH = null,
  LANG = "RU",
  CUSTOM_ERRORS = null,
} = {}) {
  const _LANG = LANG;
  const _ERRORS = {
    RU: RU_ERRORS,
    EN: EN_ERRORS,
    CUSTOM: CUSTOM_ERRORS,
  };
  let _EMAIL_DOMAINS = EMAIL_DOMAINS;
  let _MAX_LENGTH = MAX_LENGTH;
  let _MIN_LENGTH = MIN_LENGTH;

  const pipe = function(...fns) {
    return (x) => fns.reduce((y, f) => f(y), x);
  }

  const setMaxLength = function(value) {
    _MAX_LENGTH = value;
  }

  const setMinLength = function(value) {
    _MIN_LENGTH = value;
  }

  const setCustomErrors = function(value) {
    _ERRORS.CUSTOM = value;
  }

  const setEmailDomains = function(value) {
    _EMAIL_DOMAINS = value;
  }

  const notEmpty = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });

    if (value === "" || !value)
      return generateResponse({
        value,
        message: _ERRORS[_LANG].notEmpty,
        status: false,
      });
    if (value.match(/\s/gi) && value.match(/\s/gi).length === value.length)
      return generateResponse({
        value,
        message: _ERRORS[_LANG].notEmpty,
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  }

  const onlyRus = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (/[a-zA-Z]/i.test(value))
      return generateResponse({
        value,
        message: _ERRORS[_LANG].onlyRus,
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  }

  const onlyEng = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (/[а-яё]/i.test(value))
      return generateResponse({
        value,
        message: _ERRORS[_LANG].onlyEng,
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  }

  const withMaxLength = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (value.length > _MAX_LENGTH)
      return generateResponse({
        value,
        message: _ERRORS[_LANG].withMaxLength.replace('[MAX_LENGTH]', _MAX_LENGTH),
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  }

  const withMinLength = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });
  
    if (value.length < _MIN_LENGTH)
      return generateResponse({
        value,
        message: _ERRORS[_LANG].withMinLength.replace('[MIN_LENGTH]', _MIN_LENGTH),
        status: false,
      });
  
    return generateResponse({ value, message: "", status: true });
  }

  const email = ({ value, message, status = true }) => {
    if (!status) return generateResponse({ value, message, status });

    let regexp =
      /^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,6}$/i;

    if (value.indexOf(" ") !== -1)
      return generateResponse({
        value,
        message: _ERRORS[_LANG].email.spaces,
        status: false,
      });

    if (!(regexp.test(value) && value.split("@")[0].length >= 3))
      return generateResponse({
        value,
        message: _ERRORS[_LANG].email.missingDogOrDot,
        status: false,
      });
    
    if (_EMAIL_DOMAINS) {
      if (_EMAIL_DOMAINS.some((v) => value.indexOf(v) >= 0)) {
        return generateResponse({ value, message: "", status: true })
      } else {
        return generateResponse({
          value,
          message: _ERRORS[_LANG].email.notFromAvailable,
          status: false,
        })
      }
    }

    return generateResponse({ value, message: "", status: true }) 
  }

  return {
    EMAIL_DOMAINS: _EMAIL_DOMAINS,
    MAX_LENGTH: _MAX_LENGTH,
    MIN_LENGTH: _MIN_LENGTH,
    LANG: _LANG,
    ERRORS: _ERRORS,
    pipe,
    setMaxLength,
    setMinLength,
    setCustomErrors,
    setEmailDomains,
    notEmpty,
    onlyRus,
    onlyEng,
    withMaxLength,
    withMinLength,
    email,
  }
}

exports.Validation = Validation;
