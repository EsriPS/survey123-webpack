import { console, globals, fetchSync } from "./survey123/lib.js";
import txt from "./test.txt";
import main from "./main.js";
import proj4 from "proj4";

export function importText() {
  console.log(`\`${globals.libraryName}.importText\` method invoked`);
  return txt;
}

export function importJson() {
  console.log(`\`${globals.libraryName}.importJson\` method invoked`);
  return main().object.string;
}

export function HelloWorld() {
  return JSON.stringify({ Hola: "Mundo" });
}

export function fetchTest(url, where, token) {
  try{
  var queryString = url + "/query?f=json&outfields=*";
  if (where) queryString += "&where=" + where;
  console.log(queryString);
  return JSON.stringify(fetchSync(queryString).json());
  } catch (e){
    return JSON.stringify({error: e.message})
  }
}

export function reprojectPoint(x, y) {
  try {
    if (isNaN(x) || isNaN(y)) {
      return "Please provide numbers for x or y";
    }

    if (!isFinite(x) || !isFinite(y)) {
      return "Please provide finite numbers for x or y";
    }

    //https://spatialreference.org/ref/epsg/indian-1960-utm-zone-48n/proj4/
    var projectTo =
      "+proj=utm +zone=48 +a=6377276.345 +b=6356075.41314024 +units=m +no_defs";
    return proj4(projectTo, [x, y]);
  } catch (e) {
    return "";
  }
}

export function getConsole() {
  return console.getOutput({ sizeLimit: 4096 });
}

export { dev } from "./survey123/lib.js";

export { debugTerminal } from "./survey123/lib.js";
