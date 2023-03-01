const { notEmptyTests } = require("./notEmpty");
const { onlyRusTests } = require("./onlyRus");
const { onlyEngTests } = require("./onlyEng");
const { withMaxLengthTests } = require("./withMaxLength");
const { withMinLengthTests } = require("./withMinLength");
const { emailTests } = require("./email");

notEmptyTests.run();
onlyRusTests.run();
onlyEngTests.run();
withMaxLengthTests.run();
withMinLengthTests.run();
emailTests.run();