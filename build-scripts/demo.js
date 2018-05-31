const fs = require("fs-extra");

const main = async () => {
    await fs.ensureDir("./docs/demo");
    await fs.copy("./src/demo.html", "./docs/demo/index.html");
    await fs.copy("./src/index.js", "./docs/demo/index.js");
};
main();