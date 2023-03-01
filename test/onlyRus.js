const { Validation } = require("../src/index");

const v = new Validation();

const cases = {
  0: {
    label: '[onlyRus]: only english',
    pipe: v.pipe(v.onlyRus)({ value: 'fd sdfsdf' }),
    result: `{"value":"fd sdfsdf","message":"Проверьте раскладку клавиатуры","status":false}`,
  },
  1: {
    label: '[onlyRus]: only russian',
    pipe: v.pipe(v.onlyRus)({ value: 'Привет!' }),
    result: `{"value":"Привет!","message":"","status":true}`,
  },
  2: {
    label: '[onlyRus]: russian and english',
    pipe: v.pipe(v.onlyRus)({ value: 'ПриHelloвет!' }),
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

exports.onlyRusTests = { run };