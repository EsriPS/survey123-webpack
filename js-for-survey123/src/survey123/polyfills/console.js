import { libraryName } from '../globals.js';
// const libraryName = "SSSSSS";
const messages =[]
let _messages = messages;
let devMode = false;
const devModeName = "dev";

messages.push({"type":"info", "time": new Date(Date.now()).toLocaleTimeString(), "value": ["Console loaded, namespace:", libraryName]});

export default (function() {

  if (typeof __survey123_console_object__  !== 'undefined') {
    // __survey123_console_object__.log(`Reusing console object with prefix '*${libraryName}.${devModeName}*'`);
    _messages = __survey123_console_object__._messages;
    devMode = true;
  }

  function generateConsoleMethod(type) {
    return function() {
      var method = type;
      var args = Array.prototype.slice.call(arguments);
      _messages.push({"type":method, "time": new Date(Date.now()).toLocaleTimeString(), "value":args, devMode});
    }
  }

  function getOutput({count, sizeLimit, level="verbose"}) {
    count = count ? Math.min(count, _messages.length) : _messages.length;
    sizeLimit = sizeLimit || 255;
    let msgs = [], size = 0;
    count--;
    if (count < 0) return;
    for (let idx=_messages.length - 1; count >= 0; count--, idx--) {
      const msg = _messages[idx];
      let line = [], text;
      if (msg.devMode) { line.push(`*${libraryName}.${devModeName}*`); }
      if (msg.type == "_log") {
        text = msg.value.join(" ");
      } else {
        if (msg.type != "log") { line.push(msg.type.toUpperCase()); }
        line.push(`[${msg.time}]:`);
        line.push(msg.value.join(" "));
        text = line.join(" ");
      }
      if (sizeLimit && size < sizeLimit && (size + text.length + 2) <= sizeLimit) {
          msgs.push(text);
          size += text.length + 2;
      } else {
        break;
      }
    }
    return msgs.reverse().join(`
`);
  }

  return {
    log: generateConsoleMethod("log"),
    warn: generateConsoleMethod("warn"),
    debug: generateConsoleMethod("debug"),
    info: generateConsoleMethod("info"),
    _log: generateConsoleMethod("_log"),
    clear: () => { _messages.length = 0; },
    getOutput,
    _messages
  };
})();
