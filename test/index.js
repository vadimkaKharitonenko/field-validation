const { notEmptyTests } = require("./notEmpty");
const { onlyRusTests } = require("./onlyRus");
const { onlyEngTests } = require("./onlyEng");
const { withMaxLengthTests } = require("./withMaxLength");

notEmptyTests.run();
onlyRusTests.run();
onlyEngTests.run();
withMaxLengthTests.run();