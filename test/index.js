const { notEmptyTests } = require("./notEmpty");
const { onlyRusTests } = require("./onlyRus");
const { onlyEngTests } = require("./onlyEng");
const { withMaxLengthTests } = require("./withMaxLength");
const { withMinLengthTests } = require("./withMinLength");
const { emailTests } = require("./email");
const { customErrorsTests } = require("./customErrors");

notEmptyTests.run();
onlyRusTests.run();
onlyEngTests.run();
withMaxLengthTests.run();
withMinLengthTests.run();
emailTests.run();
customErrorsTests.run();