const { Validation } = require("../src/index");

const v = new Validation();

const cases = {
  0: {
    label: '[notEmpty]: empty string',
    pipe: v.pipe(v.notEmpty)({ value: '' }),
    result: `{"value":"","message":"Поле не заполнено","status":false}`,
  },
  1: {
    label: '[notEmpty]: only spaces',
    pipe: v.pipe(v.notEmpty)({ value: '   ' }),
    result: `{"value":"   ","message":"Поле не заполнено","status":false}`,
  },
  2: {
    label: '[notEmpty]: spaces at the beginning and end',
    pipe: v.pipe(v.notEmpty)({ value: ' 3  ' }),
    result: `{"value":" 3  ","message":"Поле заполнено не правильно","status":false}`,
  },
  3: {
    label: '[notEmpty]: normal value',
    pipe: v.pipe(v.notEmpty)({ value: 'string' }),
    result: `{"value":"string","message":"","status":true}`,
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

exports.notEmptyTests = { run };