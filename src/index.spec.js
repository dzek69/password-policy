const validator = require("./index");

const log = (value) => {
    console.log(value, validator(value))
};

log("Hi");
log("123456");
log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
log("HelloThere");
log("My password is not weak");
log("Correct horse battery staple");