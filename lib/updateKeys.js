"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateKeys;

var _getRandomValues = _interopRequireDefault(require("get-random-values"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// WHATWG crypto RNG - https://w3c.github.io/webcrypto/Overview.html
function whatwgRNG() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
  var rnds8 = new Uint8Array(length);
  (0, _getRandomValues.default)(rnds8);
  return rnds8;
}

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substring(1);
}

function randomKey(length) {
  return whatwgRNG(length).reduce((str, n) => str + byteToHex[n], '').slice(0, length);
}

function updateKeys(obj, keys) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      switch (typeof obj[prop]) {
        case 'object':
          if (keys.includes(prop)) {
            obj[prop] = randomKey(12);
          } else {
            updateKeys(obj[prop], keys);
          }

          break;

        default:
          if (keys.includes(prop)) {
            obj[prop] = randomKey(12);
          }

          break;
      }
    }
  }

  return obj;
}