import getRandomValues from 'get-random-values';

// WHATWG crypto RNG - https://w3c.github.io/webcrypto/Overview.html
function whatwgRNG(length = 16) {
  const rnds8 = new Uint8Array(length);
  getRandomValues(rnds8);
  return rnds8;
}

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substring(1);
}

function randomKey(length) {
  return whatwgRNG(length)
    .reduce((str, n) => str + byteToHex[n], '')
    .slice(0, length);
}

export default function updateKeys(obj, keys) {
  for (const prop in obj) {
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
