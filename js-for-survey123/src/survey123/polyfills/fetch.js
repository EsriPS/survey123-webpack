/**
 * Source: https://github.com/developit/unfetch
 * Local changes to source are denoted by  comment: // EDITED: <reason>
 */

 // EDITED: Include local Polyfill of Promise rather than the
 //         native one shipped in the JS engine (for Synchronous sake)
/* ++ */ import Promise from "./Promise.js";

// EDITED: Added `fetchSync` function for use in Survey123;
export function fetchSync() {
  var prom = fetch.apply(null, arguments);
  var text, json, returnValue = {
    text: () => text,
    json: () => json
  };
  prom.then(response => { prom = response; }, e => { throw new Error(e); });
  try { prom.text().then(r => { text = r; }); } catch (e) {}
  try { prom.json().then(r => { json = r; }); } catch (e) {}
  return returnValue;
}

export function fetch(url, options) {
	options = options || {};
	return new Promise( (resolve, reject) => {
		const request = new XMLHttpRequest();
		const keys = [];
		const all = [];
		const headers = {};

		const response = () => ({
			ok: (request.status/100|0) == 2,		// 200-299
			statusText: request.statusText,
			status: request.status,
			url: request.responseURL,
			text: () => Promise.resolve(request.responseText),
			json: () => Promise.resolve(JSON.parse(request.responseText)),
			blob: () => Promise.resolve(new Blob([request.response])),
			clone: response,
			headers: {
				keys: () => keys,
				entries: () => all,
				get: n => headers[n.toLowerCase()],
				has: n => n.toLowerCase() in headers
			}
		});

    // EDITED: Survey123 only handles synchronous requests at this time
		// request.open(options.method || 'get', url, true);
    /* ++ */ request.open(options.method || 'get', url, false);

		request.onload = () => {
			request.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, (m, key, value) => {
				keys.push(key = key.toLowerCase());
				all.push([key, value]);
				headers[key] = headers[key] ? `${headers[key]},${value}` : value;
      });
			resolve(response());
		};

		request.onerror = reject;

		request.withCredentials = options.credentials=='include';

		for (const i in options.headers) {
			request.setRequestHeader(i, options.headers[i]);
		}

		request.send(options.body || null);
	});
}