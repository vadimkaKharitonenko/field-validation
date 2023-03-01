const { FV } = require("../index");

const v = new FV({ MAX_LENGTH: 30 });

const cases = {
  0: {
    label: '[withMaxLength]: length > MAX_LENGTH',
    pipe: v.pipe(v.withMaxLength)({ value: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }),
    result: `{"value":"Lorem Ipsum is simply dummy text of the printing and typesetting industry.","message":"Максимальное количество символов 30","status":false}`,
  },
  1: {
    label: '[withMaxLength]: length < MAX_LENGTH',
    pipe: v.pipe(v.withMaxLength)({ value: 'Lorem Ipsum is' }),
    result: `{"value":"Lorem Ipsum is","message":"","status":true}`,
  },
  2: {
    label: '[withMaxLength]: length === MAX_LENGTH',
    pipe: v.pipe(v.withMaxLength)({ value: 'Lorem Ipsum isLorem Ipsum isLo' }),
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

exports.withMaxLengthTests = { run };