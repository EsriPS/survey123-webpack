import { libraryName, libraryFilename } from '../globals.js';
import console from './console.js';
import saferEval from './saferEval.js'

// const libraryName = globals.libraryName;
// const libraryName = "SSSSS";

export function getLibraryAsText() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "./" + libraryFilename + "?_=" + new Date().getTime(), false);
  xmlhttp.send();
  if (xmlhttp.status!==200) {
    throw new Error("Error: File does not exist at path: '<survey directory>/extensions/" + module + "'");
  }
  return xmlhttp.responseText;
}

export default function() {
  // console.info(`\`${libraryName}.dev\` method invoked`);
  const evalScript = getLibraryAsText();
  const methodName = arguments[0];
  const args = Array.prototype.slice.call(arguments).slice(1);
  const method = saferEval(evalScript, methodName, console);
  return method.apply(null, args);
}
