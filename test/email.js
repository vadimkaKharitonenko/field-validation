const { Validation } = require("../src/index");

const v = new Validation({ EMAIL_DOMAINS: ['@gmail.com', '@yandex.ru'] });

const cases = {
  0: {
    label: '[email]: empty string',
    pipe: v.pipe(v.email)({ value: '' }),
    result: `{"value":"","message":"Email должен содержать символы @ и \\".\\". Допускается ввод только латиницы","status":false}`,
  },
  1: {
    label: '[email]: has spaces',
    pipe: v.pipe(v.email)({ value: 'te st @gmail.com' }),
    result: `{"value":"te st @gmail.com","message":"Пробелов быть не должно","status":false}`,
  },
  2: {
    label: '[email]: missing @',
    pipe: v.pipe(v.email)({ value: 'testgmail.com' }),
    result: `{"value":"testgmail.com","message":"Email должен содержать символы @ и \\".\\". Допускается ввод только латиницы","status":false}`,
  },
  3: {
    label: '[email]: not in the list of available',
    pipe: v.pipe(v.email)({ value: 'test@test.com' }),
    result: `{"value":"test@test.com","message":"Мы не можем принять указанный Вами адрес электронной почты","status":false}`,
  },
  4: {
    label: '[email]: correct',
    pipe: v.pipe(v.email)({ value: 'test@gmail.com' }),
    result: `{"value":"test@gmail.com","message":"","status":true}`,
  },
};

const run = () => {
  for(let key in cases) {
    if (JSON.stringify(cases[key].pipe) === cases[key].result) {
      console.log("\x1b[32m", `PASS: ${cases[key].label}`);
    } else {
      console.log("\x1b[31m", `FAILED: ${cases[key].label}`);
      console.log(JSON.stringify(cases[key].pipe));
    }
  }
}

exports.emailTests = { run };