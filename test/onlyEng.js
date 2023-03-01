const { FV } = require("../index");

const v = new FV();

const cases = {
  0: {
    label: '[onlyEng]: only english',
    pipe: v.pipe(v.onlyEng)({ value: 'fd sdfsdf' }),
    result: `{"value":"fd sdfsdf","message":"","status":true}`,
  },
  1: {
    label: '[onlyEng]: only russian',
    pipe: v.pipe(v.onlyEng)({ value: 'Привет!' }),
    result: `{"value":"Привет!","message":"Проверьте раскладку клавиатуры","status":false}`,
  },
  2: {
    label: '[onlyEng]: russian and english',
    pipe: v.pipe(v.onlyEng)({ value: 'ПриHelloвет!' }),
    result: `{"value":"ПриHelloвет!","message":"Проверьте раскладку клавиатуры","status":false}`,
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

exports.onlyEngTests = { run };