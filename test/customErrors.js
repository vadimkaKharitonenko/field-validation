const { FV } = require("../index");

const v = new FV({ 
  LANG: 'CUSTOM', 
  CUSTOM_ERRORS: {
    notEmpty: "フィールドが入力されていません",
    onlyRus: "キーボード レイアウトを確認する",
    onlyEng: "キーボード レイアウトを確認する",
    withMaxLength: `最大文字数 [MAX_LENGTH]`,
    withMinLength: `最小文字数 [MIN_LENGTH]`,
    email: {
      spaces: "スペースがあってはならない",
      missingDogOrDot: `メールには @ と "." 文字を含める必要があります。 ラテン文字のみ使用できます`,
      notFromAvailable: `ご提供いただいたメールアドレスは受け付けておりません。`,
    }
  }
});

const cases = {
  0: {
    label: '[customErrors]: empty string with custom error',
    pipe: v.pipe(v.notEmpty)({ value: '' }),
    result: `{"value":"","message":"フィールドが入力されていません","status":false}`,
  },
  1: {
    label: '[customErrors]: missing @ with custom error',
    pipe: v.pipe(v.email)({ value: 'testgmail.com' }),
    result: `{"value":"testgmail.com","message":"メールには @ と \\".\\" 文字を含める必要があります。 ラテン文字のみ使用できます","status":false}`,
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

exports.customErrorsTests = { run };