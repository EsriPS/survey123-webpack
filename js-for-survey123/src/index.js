import { console, globals, fetchSync } from './survey123/lib.js';
import txt from './test.txt';
import main from './main.js';
import proj4 from 'proj4';

export function importText() {
  console.log(`\`${globals.libraryName}.importText\` method invoked`);
  return txt;
}

export function importJson() {
  // console.log(`\`${globals.libraryName}.importJson\` method invoked`);
  return main().object.string;
}

export function fetchTest() {
  // console.log(`\`${globals.libraryName}.importText\` method invoked`);
  // return txt;
  return fetchSync("http://aero.esri.com/arcgis/rest/services?f=pjson")
    .json()
    .currentVersion;
}

export function reprojectPoint(x, y) {
  // console.log(`\`${globals.libraryName}.reprojectPoint\` method invoked`);
  x = typeof x != "undefined" ? x : 2;
  y = typeof y != "undefined" ? y : 5;
  var firstProjection = 'PROJCS["NAD83 / Massachusetts Mainland",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",42.68333333333333],PARAMETER["standard_parallel_2",41.71666666666667],PARAMETER["latitude_of_origin",41],PARAMETER["central_meridian",-71.5],PARAMETER["false_easting",200000],PARAMETER["false_northing",750000],AUTHORITY["EPSG","26986"],AXIS["X",EAST],AXIS["Y",NORTH]]';
  var secondProjection = "+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
  return proj4(firstProjection,secondProjection,[x,y]);
}

export function getConsole() {
  return console.getOutput({sizeLimit: 4096});
}

export { dev }  from './survey123/lib.js';

export { debugTerminal }  from './survey123/lib.js';
