import { Application } from "./Application";
let pkg = require('../package.json');

let app = new Application(pkg.title, pkg.description, pkg.version);
app.start();