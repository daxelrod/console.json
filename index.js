// arguments to JSON.stringify described in standard
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

(function init(root) {


  function consoleJson(replacer, space, jsonStringify) {
    if (typeof replacer === 'number') {
      space = replacer;
      replacer = null;
    }
    if (typeof space === 'undefined') {
      space = 2;
    }
    if (typeof jsonStringify !== 'function') {
      jsonStringify = JSON.stringify.bind(JSON);
    }

    setConsoleJson(replacer, space, jsonStringify);
  }

  function setConsoleJson(replacer, space, jsonStringify) {
    if (typeof space === 'number') {
      console.assert(space >= 0, 'invalid space number ' + space);
    } else if (typeof space !== 'string') {
      throw new Error('space argument should be either number of string, not ' + space);
    }

    console.json = function consoleJsonWorker() {
      var args = Array.prototype.slice.call(arguments);
      args = args.map(function (k) {
        if (typeof k === 'object' || Array.isArray(k)) {
          return jsonStringify(k, replacer, space);
        }
        return k;
      });
      console.log.apply(console, args);
    };
  }

  setConsoleJson(null, 2, JSON.stringify.bind(JSON));

  if (typeof module !== 'undefined') {
    module.exports = consoleJson;
  } else {
    root.consoleJson = consoleJson;
  }
}(this));
