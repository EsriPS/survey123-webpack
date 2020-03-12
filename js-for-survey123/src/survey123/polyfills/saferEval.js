import console from './console.js';

export default function(evalText, returnString, reload){
  try {
    if (!returnString) {
      return Function('"use strict"; var __survey123_console_object__ = arguments[0]; return (' + evalText + ')')(console);
    }
    else {
      return Function('"use strict"; var __survey123_console_object__ = arguments[0]; ' + evalText + '; return ' + returnString)(console);
    }
  }
  catch(e) {
    return undefined;
  }
}
