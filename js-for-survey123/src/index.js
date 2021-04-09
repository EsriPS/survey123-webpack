import { console, globals, fetchSync } from "./survey123/lib.js";
import txt from "./test.txt";
import main from "./main.js";
import proj4 from "proj4";
import QRCode from "qrcode";

//Add Helpers for Turf
var helpers = require("@turf/helpers");
import centroid from "@turf/centroid";

export function importText() {
  console.log(`\`${globals.libraryName}.importText\` method invoked`);
  return txt;
}

export function HelloWorld(language) {
  console.log("Reached Hello World");
  if (language == "en") return JSON.stringify({ Hello: "World" });
  else if (language == "es") return JSON.stringify({ Hola: "Mundo" });
  else return JSON.stringify({ error: "No Language Selected" });
}

export function importJson() {
  console.log(`\`${globals.libraryName}.importJson\` method invoked`);
  return main().object.string;
}

function createPolygons(polygons) {
  try {
    var p = JSON.stringify(polygons).replace(/,0]/g, "]");
    //Loop through the Polygons and Build Turf Polygons
    var polygon = JSON.parse(p);
    //return polygons[0].hasOwnProperty('rings');
    //return polygon
    var output = [];
    var rings;
    for (var i = 0; i < polygon.length; i++) {
      for (var r = 0; r < polygon[i].rings.length; r++) {
        rings = polygon[i].rings[r];
        rings.push(rings[0]);
        output.push(rings);
      }
    }

    var checkPolygon = helpers.polygon(output);
    return checkPolygon;
  } catch (e) {
    return { message: e.message };
  }
}

function groupPolygons(polygons) {
  if (polygons.length != 0) {
    try {
      return JSON.stringify(polygons);
    } catch (e) {
      return JSON.stringify({ error: e.message });
    }
  } else {
    return JSON.stringify({ error: "Must have at least one polygon in Area" });
  }
}

export function getCentroid(polygons) {
  try {
    //Split the JSON at the |
    var splitPolygons = JSON.parse("[" + polygons.replace("|", ",") + "]");

    try {
      var checkPolygon = createPolygons(splitPolygons);
      var checkCentroid = centroid(checkPolygon);

      return checkCentroid.geometry.coordinates.reverse().join(" ");
    } catch (e) {
      return JSON.stringify({ error: e.message });
    }
  } catch (e) {
    return JSON.stringify({
      error: e.message,
    });
  }
}

export function reprojectPoint(location) {
  try {
    if (location == null) {
      return JSON.stringify({ error: "Please select a location on the map" });
    }

    //https://spatialreference.org/ref/epsg/indian-1960-utm-zone-48n/proj4/
    var projectTo =
      "+proj=utm +zone=48 +a=6377276.345 +b=6356075.41314024 +units=m +no_defs";
    var coords = proj4(projectTo, [location.x, location.y]);
    return JSON.stringify({ x: coords[0], y: coords[1] });
  } catch (e) {
    return JSON.stringify({ error: e.message });
  }
}

export function getConsole() {
  return console.getOutput({ sizeLimit: 4096 });
}

export { dev } from "./survey123/lib.js";

export { debugTerminal } from "./survey123/lib.js";