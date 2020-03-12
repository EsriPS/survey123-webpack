import console from './console.js';
// import fetch from './fetch.js';
import { fetchSync, fetch } from './fetch.js';

const global = { console, fetch, fetchSync };
const globalInclude = `
  var console = global.console;
  var fetch = global.fetch;
  var fetchSync = global.fetchSync;
`;

export default function(code) {
  code = code.trim();
  if (!code || code == "") { return ""; }
  console._log("> " + code);
  try {
    let x = eval(globalInclude + code);
    if (x) console._log(x);
    return x;
  }
  catch (e) {
    console._log(e.toString());
    return e.toString();
  }
}
