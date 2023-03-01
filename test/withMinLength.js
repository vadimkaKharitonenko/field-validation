const { Validation } = require("../src/index");

const v = new Validation({ MIN_LENGTH: 30 });

const cases = {
  0: {
    label: '[withMinLength]: length > MIN_LENGTH',
    pipe: v.pipe(v.withMinLength)({ value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }),
    result: `{"value":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","message":"","status":true}`,
  },
  1: {
    label: '[withMinLength]: length < MIN_LENGTH',
    pipe: v.pipe(v.withMinLength)({ value: 'Lorem Ipsum is' }),
    result: `{"value":"Lorem Ipsum is","message":"Минимальное количество символов 30","status":false}`,
  },
  2: {
    label: '[withMinLength]: length === MIN_LENGTH',
    pipe: v.pipe(v.withMinLength)({ value: 'Lorem Ipsum isLorem Ipsum isLo' }),
    result: `{"value":"Lorem Ipsum isLorem Ipsum isLo","message":"","status":true}`,
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

exports.withMinLengthTests = { run };