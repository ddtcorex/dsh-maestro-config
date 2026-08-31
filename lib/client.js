window.__ModuleLoader__.load({
  id: '@ddtcorex/dsh-maestro-config',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    var React = require("react");
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/can-promise.js"(exports, module2) {
    module2.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js"(exports) {
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version) throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-buffer.js"(exports, module2) {
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module2.exports = BitBuffer;
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-matrix.js"(exports, module2) {
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module2.exports = BitMatrix;
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1) return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i = 1; i < posCount - 1; i++) {
        positions[i] = positions[i - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i = 0; i < posLength; i++) {
        for (let j = 0; j < posLength; j++) {
          if (i === 0 && j === 0 || // top-left
          i === 0 && j === posLength - 1 || // bottom-left
          i === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module3 = data.get(row, col);
          if (module3 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module3;
            sameCountCol = 1;
          }
          module3 = data.get(col, row);
          if (module3 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module3;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports.applyMask(p, data);
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/galois-field.js"(exports) {
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x = 1;
      for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1;
        if (x & 256) {
          x ^= 285;
        }
      }
      for (let i = 255; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
      }
    })();
    exports.log = function log(n) {
      if (n < 1) throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x, y) {
      if (x === 0 || y === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var GF = require_galois_field();
    exports.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i = 0; i < divisor.length; i++) {
          result[i] ^= GF.mul(divisor[i], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i = 0; i < degree; i++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
      }
      return poly;
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module2) {
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module2.exports = ReedSolomonEncoder;
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version-check.js"(exports) {
    exports.isValid = function isValid(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/regex.js"(exports) {
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js"(exports) {
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10) return mode.ccBits[0];
      else if (version < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports.KANJI;
      else return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version.js"(exports) {
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d = version << 12;
      while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
      }
      return version << 12 | d;
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/format-info.js"(exports) {
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d = data << 10;
      while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
      }
      return (data << 10 | d) ^ G15_MASK;
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/numeric-data.js"(exports, module2) {
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i, group, value;
      for (i = 0; i + 3 <= this.data.length; i += 3) {
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i;
      if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module2.exports = NumericData;
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module2) {
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i;
      for (i = 0; i + 2 <= this.data.length; i += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
      }
    };
    module2.exports = AlphanumericData;
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/byte-data.js"(exports, module2) {
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        this.data = new TextEncoder().encode(data);
      } else {
        this.data = new Uint8Array(data);
      }
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i = 0, l = this.data.length; i < l; i++) {
        bitBuffer.put(this.data[i], 8);
      }
    };
    module2.exports = ByteData;
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/kanji-data.js"(exports, module2) {
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i;
      for (i = 0; i < this.data.length; i++) {
        let value = Utils.toSJIS(this.data[i]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module2.exports = KanjiData;
  }
});

// ../../maestro-workspace/node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js"(exports, module2) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s, d) {
        var predecessors = {};
        var costs = {};
        costs[s] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u;
              }
            }
          }
        }
        if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
          var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while (u) {
          nodes.push(u);
          predecessor = predecessors[u];
          u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T = dijkstra.PriorityQueue, t2 = {}, key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t2[key] = T[key];
            }
          }
          t2.queue = [];
          t2.sorter = opts.sorter || T.default_sorter;
          return t2;
        },
        default_sorter: function(a, b) {
          return a.cost - b.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = { value, cost };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module2 !== "undefined") {
      module2.exports = dijkstra;
    }
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/segments.js"(exports) {
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i = 0; i < nodes.length; i++) {
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i = 1; i < path.length - 1; i++) {
        optimizedSegs.push(graph.table[path[i]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/qrcode.js"(exports) {
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r) continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c <= -1 || size <= col + c) continue;
            if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i = 0; i < 18; i++) {
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i, mod;
      for (i = 0; i < 15; i++) {
        mod = (bits >> i & 1) === 1;
        if (i < 6) {
          matrix.set(i, 8, mod, true);
        } else if (i < 8) {
          matrix.set(i + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i, 8, mod, true);
        }
        if (i < 8) {
          matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
          matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (!matrix.isReserved(row, col - c)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i = 0; i < remainingByte; i++) {
        buffer.put(i % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b = 0; b < ecTotalBlocks; b++) {
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b] = buffer.slice(offset, offset + dataSize);
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i, r;
      for (i = 0; i < maxDataSize; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i < dcData[r].length) {
            data[index++] = dcData[r][i];
          }
        }
      }
      for (i = 0; i < ecCount; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utils.js"(exports) {
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
          return [c, c];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
      const size = qr.modules.size;
      const data = qr.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i = 0; i < symbolSize; i++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style) canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts) opts = {};
      const canvasEl = exports.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x, y) {
      let str = cmd + x;
      if (typeof y !== "undefined") str += " " + y;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i = 0; i < data.length; i++) {
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
          lineLength++;
          if (!(i > 0 && col > 0 && data[i - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// ../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "../../maestro-workspace/node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/browser.js"(exports) {
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports.create = QRCode2.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/MaestroSettings.tsx
var import_react = require("react");
var import_qrcode = __toESM(require_browser(), 1);

// src/client/api.ts
var MAESTRO_RPC_CHANNEL = "/dsh-maestro-review";
var MAESTRO_ENDPOINTS = Object.freeze({
  status: "maestro.status",
  getConfig: "maestro.getConfig",
  saveConfig: "maestro.saveConfig",
  tunnelStart: "maestro.tunnelStart",
  tunnelStop: "maestro.tunnelStop",
  proxyStatus: "maestro.proxyStatus",
  getPin: "maestro.getPin",
  rotatePin: "maestro.rotatePin",
  lanPinStatus: "maestro.lanPin.status",
  lanPinSetEnabled: "maestro.lanPin.setEnabled",
  lanPinRotate: "maestro.lanPin.rotate",
  reviewsList: "maestro.reviews.list",
  modelsList: "maestro.models.list",
  modelsCurrent: "maestro.models.current"
});

// src/client/webhook-secret.ts
var BASE64URL_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
function generateWebhookSecret(randomValues = crypto.getRandomValues.bind(crypto)) {
  const bytes = randomValues(new Uint8Array(32));
  return Array.from(bytes, (byte) => BASE64URL_ALPHABET[byte & 63]).join("");
}
function gitlabWebhookUrl(hostname) {
  const authority = hostname?.trim().replace(/^https?:\/\//, "").replace(/\/+$/, "") || "<your-hostname>";
  return `https://${authority}/hooks/gitlab-mr`;
}

// src/client/MaestroSettings.tsx
var t = {
  bgLayer1: "var(--dsw-alias-bg-layer-1)",
  bgLayer2: "var(--dsw-alias-bg-layer-2)",
  bgLayer3: "var(--dsw-alias-bg-layer-3)",
  borderL2: "var(--dsw-alias-border-l2)",
  labelPrimary: "var(--dsw-alias-label-primary)",
  labelSecondary: "var(--dsw-alias-label-secondary)",
  labelTertiary: "var(--dsw-alias-label-tertiary)",
  labelDimmed: "var(--dsw-alias-label-dimmed)",
  labelFg: "var(--dsw-alias-label-primary-foreground)",
  primaryFill: "var(--dsw-alias-button-primary-fill)",
  primaryHover: "var(--dsw-alias-button-primary-hover)",
  interactiveHover: "var(--dsw-alias-interactive-bg-hover)",
  interactiveActive: "var(--dsw-alias-interactive-bg-active)",
  stateError: "var(--dsw-alias-state-error-primary)",
  brand: "var(--dsw-alias-brand-primary)",
  shadowLv3: "var(--dsw-shadow-lv3)",
  scrollbarL2: "var(--dsw-alias-scrollbar-bg-l2)"
};
function Button({
  variant = "ghost",
  size = "md",
  icon,
  children,
  style,
  ...rest
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    border: "none",
    borderRadius: size === "sm" ? 16 : 18,
    cursor: "pointer",
    fontSize: size === "sm" ? 13 : 14,
    lineHeight: size === "sm" ? "18px" : "22px",
    padding: size === "sm" ? "0 12px" : "0 14px",
    height: size === "sm" ? 32 : 36,
    color: t.labelPrimary,
    background: "transparent",
    fontFamily: "inherit"
  };
  if (variant === "primary") {
    base.background = t.primaryFill;
    base.color = t.labelFg;
  }
  if (variant === "outline") {
    base.border = `1px solid ${t.borderL2}`;
    base.background = "transparent";
  }
  const merged = { ...base, ...style };
  return (0, import_react.createElement)(
    "button",
    {
      type: "button",
      style: merged,
      onMouseEnter: (e) => {
        if (rest.disabled) return;
        if (variant === "primary") e.currentTarget.style.background = t.primaryHover;
        else e.currentTarget.style.background = t.interactiveHover;
      },
      onMouseLeave: (e) => {
        if (variant === "primary") e.currentTarget.style.background = t.primaryFill;
        else e.currentTarget.style.background = variant === "outline" ? "transparent" : "transparent";
      },
      ...rest
    },
    icon ? (0, import_react.createElement)("span", { style: { display: "inline-flex", width: 16, height: 16, alignItems: "center", justifyContent: "center" } }, icon) : null,
    children
  );
}
function InputWrap({
  icon,
  children,
  style,
  focused
}) {
  return (0, import_react.createElement)(
    "span",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 36,
        padding: "0 12px",
        border: `1px solid ${focused ? t.brand : t.borderL2}`,
        borderRadius: 10,
        background: t.bgLayer1,
        flex: 1,
        minWidth: 0,
        boxSizing: "border-box",
        ...style
      }
    },
    icon ? (0, import_react.createElement)("span", { style: { display: "inline-flex", width: 16, height: 16, color: t.labelTertiary } }, icon) : null,
    children
  );
}
function FieldInput(props) {
  const [focused, setFocused] = (0, import_react.useState)(false);
  const { icon, style, ...rest } = props;
  return (0, import_react.createElement)(
    InputWrap,
    { icon, focused, style: { ...style, flex: "1 1 auto" } },
    (0, import_react.createElement)("input", {
      ...rest,
      onFocus: (e) => {
        setFocused(true);
        rest.onFocus?.(e);
      },
      onBlur: (e) => {
        setFocused(false);
        rest.onBlur?.(e);
      },
      style: {
        flex: 1,
        minWidth: 0,
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: 14,
        lineHeight: "22px",
        color: t.labelPrimary,
        fontFamily: "inherit"
      }
    })
  );
}
function TextareaField(props) {
  const [focused, setFocused] = (0, import_react.useState)(false);
  return (0, import_react.createElement)("textarea", {
    ...props,
    onFocus: (e) => {
      setFocused(true);
      props.onFocus?.(e);
    },
    onBlur: (e) => {
      setFocused(false);
      props.onBlur?.(e);
    },
    style: {
      width: "100%",
      minHeight: 96,
      padding: "8px 10px",
      border: `1px solid ${focused ? t.brand : t.borderL2}`,
      borderRadius: 8,
      background: t.bgLayer1,
      color: t.labelPrimary,
      fontFamily: "inherit",
      fontSize: 13,
      lineHeight: "18px",
      resize: "vertical",
      boxSizing: "border-box",
      outline: "none",
      ...props.style
    }
  });
}
var fieldLabelStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: "500",
  color: t.labelSecondary,
  margin: "12px 0 0"
};
var captionStyle = {
  fontSize: "12px",
  lineHeight: "16px",
  color: t.labelSecondary,
  margin: "4px 0"
};
var cardInsetStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "12px",
  borderRadius: "12px",
  border: `1px solid ${t.borderL2}`,
  background: t.bgLayer1
};
var rowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "16px 0",
  borderBottom: `1px solid ${t.borderL2}`,
  minWidth: "0"
};
var rowTextStyle = {
  flex: "1",
  minWidth: "0",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  paddingRight: "48px"
};
var rowTitleStyle = {
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "22px",
  color: t.labelPrimary
};
var rowDescStyle = {
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "18px",
  color: t.labelTertiary
};
var pillSelectorStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "12px",
  height: "36px",
  padding: "0 14px",
  border: "none",
  borderRadius: "18px",
  background: "var(--dsw-alias-bg-module-platform, #F5F6F7)",
  font: "inherit",
  fontSize: "14px",
  lineHeight: "22px",
  color: t.labelPrimary,
  cursor: "pointer",
  whiteSpace: "nowrap"
};
function SettingRow({ title, description, control }) {
  return (0, import_react.createElement)(
    "div",
    { "data-maestro-row": "", style: rowStyle },
    (0, import_react.createElement)("div", { "data-maestro-row-text": "", style: rowTextStyle }, (0, import_react.createElement)("div", { style: rowTitleStyle }, title), description ? (0, import_react.createElement)("div", { style: rowDescStyle }, description) : null),
    (0, import_react.createElement)("div", { "data-maestro-control": "", style: { flex: "none", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, minHeight: "36px" } }, control)
  );
}
function ToggleRow({ title, description, checked, onChange }) {
  return (0, import_react.createElement)(
    "label",
    { "data-maestro-row": "", style: { ...rowStyle, cursor: "pointer", alignItems: "flex-start" } },
    (0, import_react.createElement)("input", { type: "checkbox", checked: checked === true, onChange: (e) => onChange(e.target.checked), style: { width: 16, height: 16, accentColor: t.primaryFill, marginTop: 4, flex: "none" } }),
    (0, import_react.createElement)("div", { "data-maestro-row-text": "", style: { ...rowTextStyle, paddingRight: "0" } }, (0, import_react.createElement)("div", { style: rowTitleStyle }, title), description ? (0, import_react.createElement)("div", { style: rowDescStyle }, description) : null)
  );
}
function QrImage({ url, size = 104 }) {
  const [dataUrl, setDataUrl] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    let live = true;
    import_qrcode.default.toDataURL(url, { margin: 0, width: size * 2 }).then((d) => {
      if (live) setDataUrl(d);
    }).catch(() => {
    });
    return () => {
      live = false;
    };
  }, [url, size]);
  return (0, import_react.createElement)(
    "div",
    {
      style: {
        background: "#ffffff",
        borderRadius: 10,
        boxSizing: "border-box",
        width: size + 20,
        height: size + 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
        flex: "none"
      }
    },
    dataUrl === null ? (0, import_react.createElement)("div", { style: { width: size, height: size, background: "var(--dsw-alias-bg-skeleton)", borderRadius: 4 } }) : (0, import_react.createElement)("img", { src: dataUrl, alt: url, width: size, height: size, style: { display: "block" } })
  );
}
function ReviewModelSelector({
  value,
  catalog,
  fallbackValue,
  fallbackLabel,
  onChange,
  label
}) {
  const groups = catalog?.groups ?? [];
  const providers = groups.map((g) => g.provider);
  const selectedProvider = value?.provider ?? "";
  const providerGroup = groups.find((g) => g.provider === selectedProvider);
  const selectedEffort = value?.reasoningEffort ?? "";
  const [open, setOpen] = (0, import_react.useState)(false);
  const [pane, setPane] = (0, import_react.useState)("root");
  const rootRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
        setPane("root");
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setPane("root");
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const getModelId = (m) => typeof m === "string" ? m : m.id;
  const getModelName = (m) => typeof m === "string" ? m : m.name ?? m.id;
  const selectedModelInfo = (() => {
    if (!selectedProvider || !value?.model) return null;
    const raw = (providerGroup?.models ?? []).find((mm) => getModelId(mm) === value.model);
    if (raw === void 0) return null;
    if (typeof raw === "string") return { id: raw, supportsReasoning: false, reasoningEfforts: [] };
    return raw;
  })();
  const supportsReasoning = (() => {
    if (!selectedModelInfo) return false;
    if (typeof selectedModelInfo.supportsReasoning === "boolean") return selectedModelInfo.supportsReasoning;
    const efforts = selectedModelInfo.reasoningEfforts ?? selectedModelInfo.reasoning?.efforts?.map((e) => e.id) ?? [];
    return efforts.filter((e) => e !== "off").length > 0;
  })();
  const availableEfforts = (() => {
    if (!supportsReasoning) return [];
    const efforts = selectedModelInfo?.reasoningEfforts ?? selectedModelInfo?.reasoning?.efforts?.map((e) => e.id) ?? [];
    const filtered = efforts.filter((e) => e !== "off" && e !== "");
    if (filtered.length > 0) return filtered;
    return ["low", "medium", "high"];
  })();
  const warning = selectedEffort !== "" && !supportsReasoning && selectedModelInfo !== null ? `\u26A0\uFE0F This model does not support reasoning effort "${selectedEffort}" \u2014 reviews will fail.` : null;
  const update = (field, newVal) => {
    if (newVal === "" && field === "provider") {
      onChange(null);
      setOpen(false);
      setPane("root");
      return;
    }
    const next = { provider: value?.provider ?? "", model: value?.model ?? "", ...value?.reasoningEffort ? { reasoningEffort: value.reasoningEffort } : {} };
    if (field === "provider") {
      const g = groups.find((x) => x.provider === newVal);
      const first = g?.models[0];
      next.provider = newVal;
      next.model = first !== void 0 ? getModelId(first) : "";
    } else if (field === "model") next.model = newVal;
    else if (field === "reasoningEffort") {
      if (newVal === "") delete next.reasoningEffort;
      else next.reasoningEffort = newVal;
    }
    if (!next.provider || !next.model) onChange(null);
    else onChange(next);
  };
  const effectiveFallback = fallbackValue !== void 0 ? fallbackValue : catalog?.current ?? null;
  const triggerLabel = value ? `${value.provider} / ${value.model}${value.reasoningEffort ? ` \xB7 ${value.reasoningEffort}` : ""}` : effectiveFallback ? `${fallbackLabel} \xB7 ${effectiveFallback.provider}/${effectiveFallback.model}${effectiveFallback.reasoningEffort ? ` \xB7 ${effectiveFallback.reasoningEffort}` : ""}` : fallbackLabel;
  const menuStyle = {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "0",
    minWidth: "300px",
    maxWidth: "360px",
    background: t.bgLayer2,
    border: `1px solid ${t.borderL2}`,
    borderRadius: "12px",
    boxShadow: t.shadowLv3,
    zIndex: "20",
    padding: "6px"
  };
  const rowStyle2 = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: "9px 10px",
    borderRadius: 8,
    border: "none",
    background: "transparent",
    color: t.labelPrimary,
    fontFamily: "inherit",
    fontSize: 13,
    cursor: "pointer",
    textAlign: "left"
  };
  const check = (active) => active ? (0, import_react.createElement)("svg", { width: 16, height: 16, viewBox: "0 0 16 16", style: { flex: "none" } }, (0, import_react.createElement)("path", { d: "M3.5 8.2l2.8 2.8L12.5 4.8", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" })) : (0, import_react.createElement)("span", { style: { width: 16, flex: "none" } });
  const chevronRight = (0, import_react.createElement)("svg", { width: 14, height: 14, viewBox: "0 0 14 14", style: { flex: "none", opacity: 0.6 } }, (0, import_react.createElement)("path", { d: "M5 3.5L8.5 7L5 10.5", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" }));
  const effortLabel = selectedEffort === "" ? "Default effort" : selectedEffort;
  const modelLabel = selectedProvider === "" ? "Select model" : value?.model ?? "Select model";
  return (0, import_react.createElement)(
    "div",
    { ref: rootRef, "data-maestro-trigger-wrap": "", style: { position: "relative", display: "inline-block", maxWidth: "100%" } },
    label ? (0, import_react.createElement)("span", { style: fieldLabelStyle }, label) : null,
    (0, import_react.createElement)(
      "button",
      {
        type: "button",
        style: {
          height: 36,
          padding: "0 14px 0 16px",
          borderRadius: 18,
          border: "none",
          background: "var(--dsw-alias-bg-module-platform, #F5F6F7)",
          color: t.labelPrimary,
          fontFamily: "inherit",
          fontSize: 13,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          maxWidth: 320,
          whiteSpace: "nowrap"
        },
        onClick: () => {
          setOpen((v) => !v);
          setPane("root");
        },
        "aria-expanded": open,
        "aria-haspopup": "menu",
        title: triggerLabel
      },
      (0, import_react.createElement)("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, triggerLabel),
      (0, import_react.createElement)("svg", { width: 14, height: 14, viewBox: "0 0 14 14", style: { flex: "none", opacity: 0.7 } }, (0, import_react.createElement)("path", { d: "M3.5 5L7 8.5L10.5 5", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" }))
    ),
    open ? (0, import_react.createElement)(
      "div",
      { "data-maestro-menu": "", style: menuStyle, role: "menu" },
      pane === "root" ? (0, import_react.createElement)(
        "div",
        null,
        (0, import_react.createElement)(
          "button",
          { type: "button", style: { ...rowStyle2, background: !value ? t.bgLayer1 : "transparent" }, onClick: () => {
            onChange(null);
            setOpen(false);
          } },
          (0, import_react.createElement)("span", null, fallbackLabel),
          check(!value)
        ),
        (0, import_react.createElement)("div", { style: { height: 1, background: t.borderL2, margin: "6px 2px" } }),
        (0, import_react.createElement)(
          "button",
          { type: "button", style: rowStyle2, onClick: () => setPane("model") },
          (0, import_react.createElement)("span", null, "Model"),
          (0, import_react.createElement)("span", { style: { display: "flex", alignItems: "center", gap: 8, color: t.labelSecondary, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, (0, import_react.createElement)("span", { style: { overflow: "hidden", textOverflow: "ellipsis" } }, modelLabel), chevronRight)
        ),
        (0, import_react.createElement)(
          "button",
          { type: "button", style: rowStyle2, onClick: () => setPane("effort") },
          (0, import_react.createElement)("span", null, "Effort"),
          (0, import_react.createElement)("span", { style: { display: "flex", alignItems: "center", gap: 8, color: t.labelSecondary } }, effortLabel, chevronRight)
        ),
        value ? (0, import_react.createElement)("p", { style: { ...captionStyle, margin: "8px 4px 2px" } }, `Selected: ${value.provider} / ${value.model}${value.reasoningEffort ? ` (${value.reasoningEffort})` : ""}`) : null,
        !value && effectiveFallback ? (0, import_react.createElement)("p", { style: { ...captionStyle, margin: "8px 4px 2px" } }, `${fallbackLabel === "Use Global" ? "Using Global" : "Using DSH default"}: ${effectiveFallback.provider} / ${effectiveFallback.model}${effectiveFallback.reasoningEffort ? ` (${effectiveFallback.reasoningEffort})` : ""}`) : null,
        warning ? (0, import_react.createElement)("p", { style: { ...captionStyle, margin: "4px 4px 2px", color: t.stateError } }, warning) : null
      ) : null,
      pane === "model" ? (0, import_react.createElement)(
        "div",
        null,
        (0, import_react.createElement)("button", { type: "button", style: { ...rowStyle2, color: t.labelSecondary }, onClick: () => setPane("root") }, (0, import_react.createElement)("span", null, "\u2190 Back"), (0, import_react.createElement)("span", { style: { fontSize: 12 } }, "Model")),
        (0, import_react.createElement)(
          "div",
          { style: { maxHeight: 260, overflowY: "auto", marginTop: 4 } },
          providers.length === 0 ? (0, import_react.createElement)("p", { style: captionStyle }, "No providers") : providers.map((p) => {
            const g = groups.find((x) => x.provider === p);
            const ms = g?.models ?? [];
            return (0, import_react.createElement)(
              "div",
              { key: p, style: { marginBottom: 8 } },
              (0, import_react.createElement)("div", { style: { fontSize: 11, fontWeight: 600, color: t.labelSecondary, padding: "6px 10px 2px", textTransform: "uppercase", letterSpacing: 0.4, display: "flex", alignItems: "center", gap: 6 } }, (0, import_react.createElement)("span", { style: { width: 6, height: 6, borderRadius: 3, background: t.borderL2, flex: "none" } }), g?.name ?? p),
              ms.length === 0 ? (0, import_react.createElement)("p", { style: { ...captionStyle, padding: "2px 10px 2px 28px" } }, "No models") : (0, import_react.createElement)(
                "div",
                { style: { marginLeft: 12, borderLeft: `1px solid ${t.borderL2}`, paddingLeft: 6, display: "flex", flexDirection: "column", gap: 2 } },
                ms.map((m) => {
                  const mid = getModelId(m);
                  const mname = getModelName(m);
                  const active = value?.provider === p && value?.model === mid;
                  return (0, import_react.createElement)(
                    "button",
                    {
                      key: mid,
                      type: "button",
                      style: { ...rowStyle2, paddingLeft: 10, background: active ? t.bgLayer1 : "transparent" },
                      onClick: () => {
                        update("model", mid);
                        if (value?.provider !== p) update("provider", p);
                        else {
                          const next = { provider: p, model: mid, ...selectedEffort ? { reasoningEffort: selectedEffort } : {} };
                          onChange(next);
                          setPane("root");
                        }
                      }
                    },
                    (0, import_react.createElement)("span", { style: { overflow: "hidden", textOverflow: "ellipsis" } }, mname),
                    check(active)
                  );
                })
              )
            );
          })
        )
      ) : null,
      pane === "effort" ? (0, import_react.createElement)(
        "div",
        null,
        (0, import_react.createElement)("button", { type: "button", style: { ...rowStyle2, color: t.labelSecondary }, onClick: () => setPane("root") }, (0, import_react.createElement)("span", null, "\u2190 Back"), (0, import_react.createElement)("span", { style: { fontSize: 12 } }, "Effort")),
        selectedModelInfo === null ? (0, import_react.createElement)("p", { style: { ...captionStyle, margin: "8px 4px 2px" } }, "Select a model first to configure effort.") : !supportsReasoning ? (0, import_react.createElement)(
          "div",
          null,
          (0, import_react.createElement)("p", { style: { ...captionStyle, margin: "8px 4px 6px" } }, "This model does not support reasoning effort \u2014 using provider default"),
          (0, import_react.createElement)(
            "div",
            { style: { marginTop: 4 } },
            [{ id: "", label: "Default effort" }].map(
              (e) => (0, import_react.createElement)(
                "button",
                { key: e.id || "default", type: "button", style: { ...rowStyle2, background: selectedEffort === e.id ? t.bgLayer1 : "transparent" }, onClick: () => {
                  update("reasoningEffort", e.id);
                  setPane("root");
                } },
                (0, import_react.createElement)("span", null, e.label),
                check(selectedEffort === e.id)
              )
            )
          ),
          warning ? (0, import_react.createElement)("p", { style: { ...captionStyle, margin: "8px 4px 2px", color: t.stateError } }, warning) : null
        ) : (0, import_react.createElement)(
          "div",
          null,
          (0, import_react.createElement)(
            "div",
            { style: { marginTop: 4 } },
            [{ id: "", label: "Default effort" }, ...availableEfforts.map((id) => ({ id, label: id }))].map(
              (e) => (0, import_react.createElement)(
                "button",
                { key: e.id || "default", type: "button", style: { ...rowStyle2, background: selectedEffort === e.id ? t.bgLayer1 : "transparent" }, onClick: () => {
                  update("reasoningEffort", e.id);
                  setPane("root");
                } },
                (0, import_react.createElement)("span", null, e.label),
                check(selectedEffort === e.id)
              )
            )
          ),
          warning ? (0, import_react.createElement)("p", { style: { ...captionStyle, margin: "8px 4px 2px", color: t.stateError } }, warning) : null
        )
      ) : null
    ) : null
  );
}
function ProjectMappingsEditor({ mappings, onChange, catalog, globalReviewModel }) {
  const rows = mappings;
  const updateRow = (index, field, value) => {
    const next = rows.map((row, i) => i === index ? { ...row, [field]: value } : row);
    onChange(next.filter((r) => (r.projectPath ?? "") !== "" || (r.localRepoPath ?? "") !== ""));
  };
  const removeRow = (index) => onChange(rows.filter((_, i) => i !== index));
  const addRow = () => onChange([...rows, { projectPath: "", localRepoPath: "", reviewProfile: "magento2" }]);
  return (0, import_react.createElement)(
    "div",
    { "data-maestro-projects": "", style: { display: "flex", flexDirection: "column", gap: 12, paddingTop: 8 } },
    // Header — count + primary Add
    (0, import_react.createElement)(
      "div",
      { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "4px 0 4px" } },
      (0, import_react.createElement)(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        (0, import_react.createElement)("div", { style: { fontSize: 14, fontWeight: 600, color: t.labelPrimary, lineHeight: "20px" } }, `Projects \u2014 ${rows.length} tracked`),
        (0, import_react.createElement)("div", { style: { fontSize: 12, color: t.labelSecondary, lineHeight: "16px", marginTop: 2 } }, "GitLab path \u2192 local checkout \u2192 profile \u2192 model override")
      ),
      (0, import_react.createElement)(Button, { variant: "primary", size: "md", onClick: addRow }, "+ Add project")
    ),
    rows.length === 0 ? (0, import_react.createElement)(
      "div",
      {
        "data-maestro-project-empty": "",
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          padding: "20px 16px",
          borderRadius: 12,
          border: `1px dashed ${t.borderL2}`,
          background: "transparent",
          textAlign: "center"
        }
      },
      (0, import_react.createElement)("div", { style: { fontSize: 13, color: t.labelSecondary, lineHeight: "18px" } }, "No projects yet \u2014 add your first mapping"),
      (0, import_react.createElement)(Button, { variant: "outline", size: "md", onClick: addRow }, "+ Add project")
    ) : (0, import_react.createElement)(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 12 } },
      ...rows.map(
        (row, i) => (0, import_react.createElement)(
          "div",
          {
            key: i,
            "data-maestro-project-card": "",
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 12,
              padding: 12,
              borderRadius: 12,
              border: `1px solid ${t.borderL2}`,
              background: t.bgLayer1,
              boxSizing: "border-box"
            }
          },
          // Card header: index + path + remove
          (0, import_react.createElement)(
            "div",
            { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 } },
            (0, import_react.createElement)(
              "div",
              { style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 } },
              (0, import_react.createElement)(
                "span",
                {
                  style: {
                    flex: "none",
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    background: "var(--dsw-alias-bg-module-platform, #F5F6F7)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 600,
                    color: t.labelSecondary
                  }
                },
                String(i + 1)
              ),
              (0, import_react.createElement)(
                "span",
                {
                  style: {
                    fontSize: 12,
                    fontFamily: "ui-monospace, monospace",
                    color: row.projectPath ? t.labelPrimary : t.labelTertiary,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    minWidth: 0
                  }
                },
                row.projectPath || "Untitled project"
              )
            ),
            (0, import_react.createElement)(
              Button,
              { variant: "outline", size: "sm", onClick: () => removeRow(i), "aria-label": `Remove project ${i + 1}`, title: "Remove mapping" },
              "\u2715"
            )
          ),
          // Grid 2-col for paths
          (0, import_react.createElement)(
            "div",
            { "data-maestro-project-grid": "", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
            (0, import_react.createElement)(
              "label",
              { style: fieldLabelStyle, "data-maestro-field": "" },
              "GitLab path",
              (0, import_react.createElement)(FieldInput, {
                placeholder: "group/project",
                value: row.projectPath,
                onChange: (e) => updateRow(i, "projectPath", e.target.value),
                "aria-label": `GitLab path ${i + 1}`,
                style: { width: "100%" }
              })
            ),
            (0, import_react.createElement)(
              "label",
              { style: fieldLabelStyle, "data-maestro-field": "" },
              "Local checkout",
              (0, import_react.createElement)(FieldInput, {
                placeholder: "/path/to/local/clone",
                value: row.localRepoPath,
                onChange: (e) => updateRow(i, "localRepoPath", e.target.value),
                "aria-label": `Local checkout ${i + 1}`,
                style: { width: "100%" }
              })
            )
          ),
          // Row for profile + model — unified label+control, gap 12, pill h36
          (0, import_react.createElement)(
            "div",
            { "data-maestro-project-profile-row": "", style: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start" } },
            (0, import_react.createElement)(
              "label",
              { style: { ...fieldLabelStyle, flex: "1 1 160px", minWidth: 0 } },
              "Review profile",
              (0, import_react.createElement)(
                "select",
                {
                  value: row.reviewProfile ?? "magento2",
                  onChange: (e) => updateRow(i, "reviewProfile", e.target.value),
                  "aria-label": `Review profile ${i + 1}`,
                  style: {
                    height: 36,
                    width: "100%",
                    padding: "0 14px",
                    border: "none",
                    borderRadius: 18,
                    background: "var(--dsw-alias-bg-module-platform, #F5F6F7)",
                    color: t.labelPrimary,
                    font: "inherit",
                    fontSize: 13
                  }
                },
                (0, import_react.createElement)("option", { value: "magento2" }, "Magento 2"),
                (0, import_react.createElement)("option", { value: "generic" }, "Generic")
              )
            ),
            (0, import_react.createElement)(
              "label",
              { style: { ...fieldLabelStyle, flex: "1 1 200px", minWidth: 0 } },
              "Model override",
              (0, import_react.createElement)(ReviewModelSelector, {
                value: row.reviewModel ?? null,
                catalog,
                fallbackValue: globalReviewModel ?? catalog?.current ?? null,
                fallbackLabel: globalReviewModel ? "Use Global" : "Use DSH default",
                onChange: (v) => updateRow(i, "reviewModel", v),
                label: null
              })
            )
          )
        )
      )
    )
  );
}
function LanAccess({ proxyStatus, lanPin }) {
  const urls = proxyStatus?.lanUrls ?? [];
  const [selected, setSelected] = (0, import_react.useState)(0);
  const index = Math.min(selected, Math.max(urls.length - 1, 0));
  if (!proxyStatus?.running) {
    return (0, import_react.createElement)("p", { style: { color: t.stateError, fontSize: 12, margin: "8px 0 0" } }, proxyStatus?.errorMessage ?? "Proxy not running");
  }
  return (0, import_react.createElement)(
    "div",
    null,
    (0, import_react.createElement)("p", { style: captionStyle }, lanPin?.enabled === true ? "Open this DSH UI from any device on your network \u2014 visitors enter the LAN PIN below." : "Open this DSH UI from any device on your network \u2014 no PIN needed."),
    urls.length > 0 ? (0, import_react.createElement)(
      "div",
      { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 } },
      ...urls.map(
        (url, i) => (0, import_react.createElement)(Button, { key: url, variant: i === index ? "primary" : "outline", size: "sm", onClick: () => setSelected(i) }, url.replace(/^http:\/\//, ""))
      )
    ) : null,
    urls.length > 0 ? (0, import_react.createElement)(
      "div",
      { "data-maestro-qr-row": "", style: { display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" } },
      (0, import_react.createElement)(QrImage, { url: urls[index], size: 116 }),
      (0, import_react.createElement)("div", null, (0, import_react.createElement)("div", { style: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 12, color: t.labelPrimary, wordBreak: "break-all" } }, urls[index]), (0, import_react.createElement)("p", { style: captionStyle }, "Scan with a phone on the same network."))
    ) : null,
    lanPin !== null ? (0, import_react.createElement)(LanPinRow, { lanPin }) : null
  );
}
function LanPinRow({ lanPin }) {
  return (0, import_react.createElement)(
    "div",
    { style: { marginTop: 12 } },
    (0, import_react.createElement)(
      "label",
      { style: { display: "flex", gap: 8, alignItems: "center", cursor: "pointer" } },
      (0, import_react.createElement)("input", { type: "checkbox", checked: lanPin.enabled, onChange: (e) => lanPin.onToggle(e.target.checked), style: { width: 15, height: 15, accentColor: t.primaryFill } }),
      (0, import_react.createElement)("span", { style: { ...fieldLabelStyle, margin: 0 } }, "Require a PIN on the LAN")
    ),
    lanPin.enabled ? (0, import_react.createElement)(
      "div",
      { style: { display: "flex", gap: 8, alignItems: "center", marginTop: 8, flexWrap: "wrap" } },
      (0, import_react.createElement)("span", { style: { ...fieldLabelStyle, margin: 0 } }, "LAN PIN"),
      (0, import_react.createElement)("code", { style: { fontFamily: "ui-monospace, monospace", fontSize: 15, letterSpacing: 2, color: t.labelPrimary } }, lanPin.show ? lanPin.pin ?? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"),
      lanPin.show ? (0, import_react.createElement)(Button, { variant: "outline", size: "sm", onClick: lanPin.onHide }, "Hide") : (0, import_react.createElement)(Button, { variant: "outline", size: "sm", onClick: lanPin.onShow }, "Show"),
      (0, import_react.createElement)(Button, { variant: "outline", size: "sm", onClick: lanPin.onRotate }, "Rotate")
    ) : null
  );
}
function PublicAccess({ status, pin, showPin, onRevealPin, onHidePin, onRotatePin }) {
  return (0, import_react.createElement)(
    "div",
    null,
    status?.running && status?.publicUrl ? (0, import_react.createElement)(
      "div",
      null,
      (0, import_react.createElement)(
        "div",
        { "data-maestro-qr-row": "", style: { display: "flex", gap: 14, alignItems: "center", marginBottom: 12, flexWrap: "wrap" } },
        (0, import_react.createElement)(QrImage, { url: status.publicUrl, size: 116 }),
        (0, import_react.createElement)("div", null, (0, import_react.createElement)("div", { style: { fontFamily: "ui-monospace, monospace", fontSize: 12, color: t.labelPrimary, wordBreak: "break-all" } }, status.publicUrl), (0, import_react.createElement)("p", { style: captionStyle }, "Works from anywhere; visitors enter the PIN below."))
      )
    ) : (0, import_react.createElement)("p", { style: captionStyle }, "Start the tunnel to get a public address."),
    (0, import_react.createElement)(
      "div",
      { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } },
      (0, import_react.createElement)("span", { style: { ...fieldLabelStyle, margin: 0 } }, "Access PIN"),
      (0, import_react.createElement)("code", { style: { fontFamily: "ui-monospace, monospace", fontSize: 15, letterSpacing: 2, color: t.labelPrimary } }, showPin && pin !== null ? pin : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"),
      showPin ? (0, import_react.createElement)(Button, { variant: "outline", size: "sm", onClick: onHidePin }, "Hide") : (0, import_react.createElement)(Button, { variant: "outline", size: "sm", onClick: onRevealPin }, "Show"),
      (0, import_react.createElement)(Button, { variant: "outline", size: "sm", onClick: onRotatePin }, "Rotate")
    ),
    (0, import_react.createElement)("p", { style: captionStyle }, "Stays the same across tunnel and DSH restarts; use Rotate when you need a new PIN.")
  );
}
function NamedTunnelSetupNote() {
  return (0, import_react.createElement)(
    "div",
    { style: { ...cardInsetStyle, marginTop: "12px" } },
    (0, import_react.createElement)("p", { style: { ...captionStyle, marginBottom: 4, fontWeight: 500, color: t.labelPrimary } }, "Named tunnel \u2014 one-time manual setup (requires your own Cloudflare account):"),
    (0, import_react.createElement)("ol", { style: { margin: "4px 0", paddingLeft: 20, fontSize: 12, color: t.labelSecondary, lineHeight: "18px" } }, (0, import_react.createElement)("li", null, "cloudflared tunnel login"), (0, import_react.createElement)("li", null, "cloudflared tunnel create dsh-maestro-webhook"), (0, import_react.createElement)("li", null, "cloudflared tunnel route dns dsh-maestro-webhook <your-hostname>"), (0, import_react.createElement)("li", null, "Paste the printed Tunnel ID, credentials file path and hostname below."))
  );
}
function MaestroSettingsTab({ rpcCall, configRpcCall }) {
  const [status, setStatus] = (0, import_react.useState)(null);
  const [proxyStatus, setProxyStatus] = (0, import_react.useState)(null);
  const [config, setConfig] = (0, import_react.useState)({ tunnelMode: "quick", projectMappings: [] });
  const [catalog, setCatalog] = (0, import_react.useState)(null);
  const [busy, setBusy] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const [pin, setPin] = (0, import_react.useState)(null);
  const [showPin, setShowPin] = (0, import_react.useState)(false);
  const [lanPinEnabled, setLanPinEnabled] = (0, import_react.useState)(false);
  const [lanPin, setLanPin] = (0, import_react.useState)(null);
  const [showLanPin, setShowLanPin] = (0, import_react.useState)(false);
  const [guard, setGuard] = (0, import_react.useState)({});
  const [patternsText, setPatternsText] = (0, import_react.useState)("");
  const [placeholdersText, setPlaceholdersText] = (0, import_react.useState)("");
  const [supervisorCfg, setSupervisorCfg] = (0, import_react.useState)({});
  const [notifierCfg, setNotifierCfg] = (0, import_react.useState)({});
  const [activeTab, setActiveTab] = (0, import_react.useState)("tunnel");
  (0, import_react.useEffect)(() => {
    const css = `
      /* Maestro nested tabs \u2014 market-like pill bar + mobile fixes */
      [data-maestro-tabs] { display:flex; gap:6px; overflow-x:auto; overflow-y:hidden; scrollbar-width:none; -webkit-overflow-scrolling:touch; overscroll-behavior-x:contain; touch-action:pan-x; padding-bottom:6px; margin-bottom:10px; border-bottom:1px solid var(--dsw-alias-border-l1, rgba(0,0,0,.08)); }
      [data-maestro-tabs]::-webkit-scrollbar { display:none; width:0; height:0; }
      [data-maestro-tab] { flex:none; height:32px; min-width:fit-content; padding:0 14px; border-radius:999px; border:1px solid var(--dsw-alias-border-l1, rgba(0,0,0,.12)); background:transparent; color:var(--dsw-alias-label-primary); font-size:13px; line-height:20px; white-space:nowrap; display:inline-flex; align-items:center; justify-content:center; cursor:pointer; font-family:inherit; -webkit-tap-highlight-color:transparent; }
      [data-maestro-tab][data-active="true"] { background:var(--dsw-specific-sidebar-nav-item-active, #EBEEF2); border-color:var(--dsw-specific-sidebar-nav-item-active, #EBEEF2); color:var(--dsw-alias-label-primary); }
      [data-maestro-tab]:hover { background:var(--dsw-alias-interactive-bg-hover, rgba(0,0,0,.06)); }
      [data-maestro-tab][data-active="true"]:hover { background:var(--dsw-specific-sidebar-nav-item-active, #EBEEF2); }
      [data-maestro-tab]:focus-visible { outline:2px solid var(--dsw-alias-state-business-primary, #4f6ef7); outline-offset:1px; }
      [data-maestro-panel] { width:100%; min-width:0; box-sizing:border-box; }
      /* label/input overlap fix: flex column gap + full width */
      [data-maestro-panel] label { gap:6px !important; }
      [data-maestro-row]:last-child { border-bottom:none !important; }
      [data-maestro-panel] label > span { width:100% !important; box-sizing:border-box !important; }
      @media (max-width: 640px) {
        [data-maestro-settings-card] { max-width:100% !important; gap:6px !important; padding:0 2px !important; }
        [data-maestro-tabs] { gap:6px !important; padding:0 0 6px !important; margin:0 -2px 10px !important; }
        [data-maestro-tab] { height:32px !important; padding:0 12px !important; font-size:13px !important; }
        [data-maestro-mapping-row] { flex-direction:column !important; align-items:stretch !important; gap:8px !important; }
        [data-maestro-mapping-row] > * { flex:1 1 100% !important; width:100% !important; max-width:100% !important; }
        [data-maestro-qr-row] { flex-direction:column !important; align-items:flex-start !important; }
        [data-maestro-trigger-wrap] { max-width:100% !important; }
        [data-maestro-menu] { min-width:0 !important; max-width:calc(100vw - 32px) !important; left:0 !important; right:auto !important; }
        [data-maestro-panel] label { gap:8px !important; }
        div[data-maestro-row] { flex-direction:column !important; align-items:stretch !important; padding:12px 0 !important; }
        [data-maestro-row-text] { padding-right:0 !important; }
        [data-maestro-control] { width:100% !important; justify-content:flex-start !important; }
        [data-maestro-control] > span { width:100% !important; }
        [data-maestro-control] select { width:100% !important; }
        [data-maestro-project-grid] { grid-template-columns:1fr !important; }
        [data-maestro-project-card] { padding:10px !important; }
        [data-maestro-project-profile-row] { flex-direction:column !important; align-items:stretch !important; }
        [data-maestro-project-profile-row] > label { flex:1 1 100% !important; width:100% !important; }
      }
      @media (max-width: 390px) {
        [data-maestro-tab] { height:30px !important; padding:0 10px !important; font-size:12px !important; }
      }
    `;
    const tag = document.createElement("style");
    tag.dataset.plugin = "@ddtcorex/dsh-maestro-config";
    tag.dataset.pluginCss = "maestro/mobile-tabs.css";
    tag.textContent = css;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);
  const call = async (endpoint, payload) => {
    const res = await rpcCall(endpoint, payload);
    if (!res?.ok) throw new Error(res?.error?.message ?? "RPC failed");
    return res.value;
  };
  const unwrap = (res) => {
    if (res && typeof res === "object" && "ok" in res) {
      if (res.ok) return res.value;
      throw new Error(res.error?.message ?? "RPC failed");
    }
    return res;
  };
  const cfgGet = async (domain) => {
    if (!configRpcCall) throw new Error("config RPC not available");
    const res = await configRpcCall("get", { domain });
    return unwrap(res);
  };
  const cfgSet = async (domain, patch) => {
    if (!configRpcCall) throw new Error("config RPC not available");
    const res = await configRpcCall("set", { domain, patch });
    return unwrap(res);
  };
  const saveGuard = async (patch) => {
    setError(null);
    const next = { ...guard, ...patch };
    if (patch.gitProtection && guard.gitProtection) next.gitProtection = { ...guard.gitProtection, ...patch.gitProtection };
    setGuard(next);
    try {
      await cfgSet("guard", patch);
    } catch (e) {
      setError(e.message ?? String(e));
    }
  };
  const commitBlacklistPatterns = async (text) => {
    const patterns = text.split("\n").map((s) => s.trim()).filter(Boolean);
    setError(null);
    try {
      await cfgSet("guardBlacklist", { patterns });
    } catch (e) {
      setError(e.message ?? String(e));
    }
  };
  const commitPlaceholders = async () => {
    setError(null);
    let obj = {};
    try {
      obj = placeholdersText.trim() ? JSON.parse(placeholdersText) : {};
      if (typeof obj !== "object" || obj === null || Array.isArray(obj)) throw new Error("placeholders must be JSON object");
    } catch (e) {
      setError(`placeholders JSON invalid: ${e.message ?? String(e)}`);
      return;
    }
    try {
      await cfgSet("guardBlacklist", { placeholders: obj });
    } catch (e) {
      setError(e.message ?? String(e));
    }
  };
  const saveSupervisorCfg = async (patch) => {
    setError(null);
    setSupervisorCfg((prev) => ({ ...prev, ...patch }));
    try {
      await cfgSet("supervisor", patch);
    } catch (e) {
      setError(e.message ?? String(e));
    }
  };
  const saveNotifierCfg = async (patch) => {
    setError(null);
    setNotifierCfg((prev) => {
      const next = { ...prev };
      for (const [k, v] of Object.entries(patch)) {
        if (k === "telegram" && typeof v === "object" && v !== null) next.telegram = { ...prev.telegram ?? {}, ...v };
        else if (k === "policy" && typeof v === "object" && v !== null) next.policy = { ...prev.policy ?? {}, ...v };
        else next[k] = v;
      }
      return next;
    });
    try {
      await cfgSet("notifier", patch);
    } catch (e) {
      setError(e.message ?? String(e));
    }
  };
  const refresh = async () => {
    try {
      setStatus(await call(MAESTRO_ENDPOINTS.status, {}));
    } catch {
    }
    try {
      setProxyStatus(await call(MAESTRO_ENDPOINTS.proxyStatus, {}));
    } catch {
    }
  };
  (0, import_react.useEffect)(() => {
    call(MAESTRO_ENDPOINTS.getConfig, {}).then((saved) => setConfig((prev) => ({ ...prev, ...saved }))).catch(() => {
    });
    if (configRpcCall) {
      configRpcCall("get", { domain: "supervisor" }).then((res) => {
        if (res?.ok && res.value?.model) setConfig((prev) => ({ ...prev, supervisorModel: res.value.model }));
      }).catch(() => {
      });
      Promise.all([cfgGet("guard").catch(() => ({})), cfgGet("guardBlacklist").catch(() => ({ patterns: [], placeholders: {} })), cfgGet("supervisor").catch(() => ({})), cfgGet("notifier").catch(() => ({}))]).then(([g, bl, sup, not]) => {
        setGuard(g ?? {});
        const pats = Array.isArray(bl?.patterns) ? bl.patterns : [];
        const ph = bl?.placeholders && typeof bl.placeholders === "object" ? bl.placeholders : {};
        setPatternsText(pats.join("\n"));
        setPlaceholdersText(JSON.stringify(ph, null, 2));
        setSupervisorCfg(sup ?? {});
        setNotifierCfg(not ?? {});
      }).catch(() => {
      });
    }
    call(MAESTRO_ENDPOINTS.lanPinStatus, {}).then((value) => {
      setLanPinEnabled(value.enabled);
      if (value.enabled) setLanPin(value.pin ?? null);
    }).catch(() => {
    });
    call(MAESTRO_ENDPOINTS.modelsList, {}).then((value) => setCatalog(value)).catch(() => {
    });
  }, []);
  (0, import_react.useEffect)(() => {
    refresh();
    const t2 = setInterval(refresh, 3e3);
    return () => clearInterval(t2);
  }, []);
  const revealPin = async () => {
    if (pin === null) {
      try {
        setPin((await call(MAESTRO_ENDPOINTS.getPin, {})).pin);
      } catch (err) {
        setError(err.message);
      }
    }
    setShowPin(true);
  };
  const rotatePin = async () => {
    setError(null);
    try {
      const fresh = (await call(MAESTRO_ENDPOINTS.rotatePin, {})).pin;
      setPin(fresh);
      setShowPin(true);
    } catch (err) {
      setError(err.message);
    }
  };
  const toggleLanPin = async (enabled) => {
    setError(null);
    const previous = lanPinEnabled;
    setLanPinEnabled(enabled);
    try {
      await call(MAESTRO_ENDPOINTS.lanPinSetEnabled, { enabled });
      if (enabled) {
        const value = await call(MAESTRO_ENDPOINTS.lanPinStatus, {});
        setLanPin(value.pin ?? null);
        setShowLanPin(true);
      } else {
        setLanPin(null);
        setShowLanPin(false);
      }
    } catch (err) {
      setLanPinEnabled(previous);
      setError(err.message);
    }
  };
  const revealLanPin = async () => {
    if (lanPin === null) {
      try {
        setLanPin((await call(MAESTRO_ENDPOINTS.lanPinStatus, {})).pin ?? null);
      } catch (err) {
        setError(err.message);
      }
    }
    setShowLanPin(true);
  };
  const rotateLanPin = async () => {
    setError(null);
    try {
      const fresh = (await call(MAESTRO_ENDPOINTS.lanPinRotate, {})).pin;
      setLanPin(fresh);
      setShowLanPin(true);
    } catch (err) {
      setError(err.message);
    }
  };
  const startTunnel = async () => {
    setBusy(true);
    setError(null);
    try {
      setStatus(await call(MAESTRO_ENDPOINTS.tunnelStart, {}));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  const stopTunnel = async () => {
    setBusy(true);
    setError(null);
    try {
      setStatus(await call(MAESTRO_ENDPOINTS.tunnelStop, {}));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  const saveField = async (field, value) => {
    setError(null);
    setConfig((prev) => ({ ...prev, [field]: value }));
    if (field === "supervisorModel" && configRpcCall) {
      try {
        const res = await configRpcCall("set", { domain: "supervisor", patch: { model: value } });
        if (res?.ok) return;
      } catch {
      }
    }
    try {
      await call(MAESTRO_ENDPOINTS.saveConfig, { [field]: value });
    } catch (err) {
      setError(err.message);
    }
  };
  const TABS = [
    { id: "tunnel", label: "Tunnel" },
    { id: "gitlab", label: "GitLab" },
    { id: "review", label: "Review" },
    { id: "guard", label: "Guard" },
    { id: "blacklist", label: "Blacklist" },
    { id: "supervisor", label: "Supervisor" },
    { id: "notifier", label: "Notifier" }
  ];
  const tabContents = {
    tunnel: (0, import_react.createElement)(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      (0, import_react.createElement)(SettingRow, { title: "Tunnel mode", description: "Quick = ephemeral URL, Named = stable URL with Cloudflare setup.", control: (0, import_react.createElement)("select", { value: config.tunnelMode, onChange: (e) => saveField("tunnelMode", e.target.value), style: { height: 36, padding: "0 12px", border: `1px solid ${t.borderL2}`, borderRadius: 18, background: "var(--dsw-alias-bg-module-platform, #F5F6F7)", color: t.labelPrimary, font: "inherit", fontSize: 13 } }, (0, import_react.createElement)("option", { value: "quick" }, "Quick"), (0, import_react.createElement)("option", { value: "named" }, "Named")) }),
      config.tunnelMode === "named" ? (0, import_react.createElement)(NamedTunnelSetupNote, null) : null,
      config.tunnelMode === "named" ? (0, import_react.createElement)(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        (0, import_react.createElement)(SettingRow, { title: "Tunnel ID", description: "Cloudflare tunnel ID.", control: (0, import_react.createElement)(FieldInput, { placeholder: "Tunnel ID", value: config.tunnelId ?? "", onChange: (e) => saveField("tunnelId", e.target.value), style: { width: 260 } }) }),
        (0, import_react.createElement)(SettingRow, { title: "Credentials file", description: "Path to tunnel credentials JSON.", control: (0, import_react.createElement)(FieldInput, { placeholder: "~/.cloudflared/<id>.json", value: config.tunnelCredentialsFile ?? "", onChange: (e) => saveField("tunnelCredentialsFile", e.target.value), style: { width: 260 } }) }),
        (0, import_react.createElement)(SettingRow, { title: "Hostname", description: "Public hostname for the tunnel.", control: (0, import_react.createElement)(FieldInput, { placeholder: "dsh.example.com", value: config.tunnelHostname ?? "", onChange: (e) => saveField("tunnelHostname", e.target.value), style: { width: 260 } }) })
      ) : null,
      (0, import_react.createElement)("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", padding: "12px 0", borderBottom: `1px solid ${t.borderL2}` } }, status?.running ? (0, import_react.createElement)(Button, { variant: "outline", size: "md", disabled: busy, onClick: stopTunnel }, "Stop tunnel") : (0, import_react.createElement)(Button, { variant: "primary", size: "md", disabled: busy, onClick: startTunnel }, "Start tunnel")),
      (0, import_react.createElement)("div", { style: { ...cardInsetStyle, marginTop: "12px" } }, (0, import_react.createElement)("div", { style: { fontSize: 13, fontWeight: 600, color: t.labelPrimary } }, "Remote access \u2014 LAN"), (0, import_react.createElement)(LanAccess, { proxyStatus, lanPin: lanPinEnabled === null ? null : { enabled: lanPinEnabled, pin: lanPin, show: showLanPin, onShow: revealLanPin, onHide: () => setShowLanPin(false), onRotate: rotateLanPin, onToggle: toggleLanPin } })),
      (0, import_react.createElement)("div", { style: { ...cardInsetStyle, marginTop: "12px" } }, (0, import_react.createElement)("div", { style: { fontSize: 13, fontWeight: 600, color: t.labelPrimary } }, "Public access"), (0, import_react.createElement)(PublicAccess, { status, pin, showPin, onRevealPin: revealPin, onHidePin: () => setShowPin(false), onRotatePin: rotatePin }))
    ),
    gitlab: (0, import_react.createElement)(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      (0, import_react.createElement)(SettingRow, { title: "GitLab base URL", description: "e.g. https://gitlab.example.com", control: (0, import_react.createElement)(FieldInput, { placeholder: "https://gitlab.example.com", value: config.gitlabBaseUrl ?? "", onChange: (e) => saveField("gitlabBaseUrl", e.target.value), style: { width: 260 } }) }),
      (0, import_react.createElement)(SettingRow, { title: "GitLab token", description: "Personal access token with api scope.", control: (0, import_react.createElement)("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, (0, import_react.createElement)(FieldInput, { type: "password", autoComplete: "off", value: config.hasGitlabToken ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "", placeholder: "GitLab token", onChange: (e) => saveField("gitlabToken", e.target.value), style: { width: 200 } }), config.hasGitlabToken ? (0, import_react.createElement)(Button, { variant: "outline", size: "md", onClick: () => saveField("gitlabToken", "") }, "Clear") : null) }),
      (0, import_react.createElement)(SettingRow, { title: "Bot username", description: "Username of the bot that posts reviews.", control: (0, import_react.createElement)(FieldInput, { placeholder: "maestro-bot", value: config.botUsername ?? "", onChange: (e) => saveField("botUsername", e.target.value), style: { width: 220 } }) }),
      (0, import_react.createElement)(SettingRow, { title: "Webhook secret", description: "Secret token for GitLab webhooks.", control: (0, import_react.createElement)("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, (0, import_react.createElement)(FieldInput, { type: "password", autoComplete: "off", value: config.hasWebhookSecret ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "", placeholder: "Webhook secret", onChange: (e) => saveField("webhookSecret", e.target.value), style: { width: 200 } }), (0, import_react.createElement)(Button, { variant: "outline", size: "md", onClick: () => saveField("webhookSecret", generateWebhookSecret()) }, "Generate")) }),
      (0, import_react.createElement)(
        "div",
        { style: { padding: "16px 0", display: "flex", flexDirection: "column", gap: 6 } },
        (0, import_react.createElement)("p", { style: captionStyle }, "In GitLab: Settings \u2192 Webhooks, Secret token = this value, enable Merge request events. Webhook URL:"),
        (0, import_react.createElement)("div", { style: { fontFamily: "ui-monospace, monospace", fontSize: 12, color: t.labelPrimary, wordBreak: "break-all", padding: "10px 12px", borderRadius: 8, background: t.bgLayer3, border: `1px solid ${t.borderL2}`, overflowWrap: "anywhere" } }, gitlabWebhookUrl(config.tunnelHostname))
      )
    ),
    review: (0, import_react.createElement)(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      (0, import_react.createElement)(ToggleRow, { title: "Re-review on push", description: "When new commits are pushed, trigger an automatic re-review.", checked: config.autoRereviewOnPush === true, onChange: (v) => saveField("autoRereviewOnPush", v) }),
      (0, import_react.createElement)(SettingRow, { title: "Global review model", description: "Model for automated reviews. Empty = DSH default.", control: (0, import_react.createElement)(ReviewModelSelector, { value: config.reviewModel ?? null, catalog, fallbackValue: catalog?.current ?? null, fallbackLabel: "Use DSH default", onChange: (v) => saveField("reviewModel", v), label: null }) }),
      (0, import_react.createElement)(SettingRow, { title: "Supervisor model", description: "Model for auto-fixing DSH Web crashes.", control: (0, import_react.createElement)(ReviewModelSelector, { value: config.supervisorModel ?? null, catalog, fallbackValue: catalog?.current ?? null, fallbackLabel: "Use DSH default", onChange: (v) => saveField("supervisorModel", v), label: null }) }),
      (0, import_react.createElement)(ProjectMappingsEditor, { mappings: config.projectMappings ?? [], onChange: (mappings) => saveField("projectMappings", mappings), catalog, globalReviewModel: config.reviewModel ?? null })
    ),
    guard: (0, import_react.createElement)(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      (0, import_react.createElement)(ToggleRow, { title: "Block publish commands", description: "Prevent publish-related commands when enabled.", checked: guard.publishBlocked === true, onChange: (v) => saveGuard({ publishBlocked: v }) }),
      (0, import_react.createElement)(ToggleRow, { title: "Protect git branches", description: "Block direct pushes to protected branches.", checked: guard.gitProtection?.enabled === true, onChange: (v) => saveGuard({ gitProtection: { enabled: v, branches: guard.gitProtection?.branches ?? ["master", "main"] } }) }),
      (0, import_react.createElement)(SettingRow, { title: "Protected branches", description: "Comma-separated list, e.g. master, main.", control: (0, import_react.createElement)(FieldInput, { value: (guard.gitProtection?.branches ?? ["master", "main"]).join(", "), placeholder: "master, main", onChange: (e) => saveGuard({ gitProtection: { enabled: guard.gitProtection?.enabled ?? true, branches: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) } }), style: { width: 260 } }) }),
      (0, import_react.createElement)(ToggleRow, { title: "Contain working directory", description: "Restrict file operations to the session working directory.", checked: guard.cwdContainment === true, onChange: (v) => saveGuard({ cwdContainment: v }) }),
      (0, import_react.createElement)(SettingRow, { title: "Credential file paths", description: "Comma-separated paths to credential files.", control: (0, import_react.createElement)(FieldInput, { value: (guard.credentialPaths ?? []).join(", "), placeholder: "~/.config/credentials.yaml", onChange: (e) => saveGuard({ credentialPaths: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }), style: { width: 260 } }) })
    ),
    blacklist: (0, import_react.createElement)(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      (0, import_react.createElement)(
        "div",
        { style: { ...rowStyle, flexDirection: "column", alignItems: "stretch", gap: 8 } },
        (0, import_react.createElement)("div", { style: rowTitleStyle }, "Blacklist patterns"),
        (0, import_react.createElement)("div", { style: rowDescStyle }, "One pattern per line. Matching files are blocked from commit."),
        (0, import_react.createElement)(TextareaField, { value: patternsText, placeholder: "example-project\nacme-shop", onChange: (e) => setPatternsText(e.target.value), onBlur: (e) => commitBlacklistPatterns(e.target.value) })
      ),
      (0, import_react.createElement)(
        "div",
        { style: { ...rowStyle, flexDirection: "column", alignItems: "stretch", gap: 8, borderBottom: "none" } },
        (0, import_react.createElement)("div", { style: rowTitleStyle }, "Placeholder mappings"),
        (0, import_react.createElement)("div", { style: rowDescStyle }, "JSON object mapping blocked patterns to placeholder suggestions."),
        (0, import_react.createElement)(TextareaField, { value: placeholdersText, placeholder: '{"example-project":"my-project"}', onChange: (e) => setPlaceholdersText(e.target.value), onBlur: () => commitPlaceholders(), style: { minHeight: 80 } }),
        (0, import_react.createElement)("div", { style: { marginTop: 8 } }, (0, import_react.createElement)(Button, { variant: "outline", size: "sm", onClick: () => {
          commitBlacklistPatterns(patternsText);
          commitPlaceholders();
        } }, "Save Blacklist"))
      )
    ),
    supervisor: (0, import_react.createElement)(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      (0, import_react.createElement)(SettingRow, { title: "Check interval", description: "Milliseconds between supervisor checks. Default 5000.", control: (0, import_react.createElement)(FieldInput, { type: "number", value: supervisorCfg.intervalMs ?? "", placeholder: "5000", onChange: (e) => {
        const v = e.target.value === "" ? void 0 : Number(e.target.value);
        saveSupervisorCfg({ intervalMs: v });
      }, style: { width: 160 } }) }),
      (0, import_react.createElement)(SettingRow, { title: "Down threshold", description: "Consecutive failures before marking a session as down.", control: (0, import_react.createElement)(FieldInput, { type: "number", value: supervisorCfg.downThreshold ?? "", placeholder: "3", onChange: (e) => {
        const v = e.target.value === "" ? void 0 : Number(e.target.value);
        saveSupervisorCfg({ downThreshold: v });
      }, style: { width: 160 } }) }),
      (0, import_react.createElement)(ToggleRow, { title: "Auto-resume sessions", description: "Automatically resume sessions marked as down.", checked: supervisorCfg.autoResumeEnabled === true, onChange: (v) => saveSupervisorCfg({ autoResumeEnabled: v }) })
    ),
    notifier: (0, import_react.createElement)(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      (0, import_react.createElement)("div", { style: { padding: "12px 0", borderBottom: `1px solid ${t.borderL2}` } }, (0, import_react.createElement)("p", { style: captionStyle }, "Telegram bot settings for notifications: startup PIN, review digests, PIN rotation. Leave blank to disable.")),
      (0, import_react.createElement)(SettingRow, { title: "Bot token", description: "Telegram bot token from @BotFather.", control: (0, import_react.createElement)("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, (0, import_react.createElement)(FieldInput, { type: "password", autoComplete: "off", value: notifierCfg.telegram?.botToken ?? "", placeholder: "123456:ABC-DEF...", onChange: (e) => saveNotifierCfg({ telegram: { botToken: e.target.value } }), style: { width: 220 } }), notifierCfg.telegram?.botToken ? (0, import_react.createElement)(Button, { variant: "outline", size: "md", onClick: () => saveNotifierCfg({ telegram: { botToken: "" } }) }, "Clear") : null) }),
      (0, import_react.createElement)(SettingRow, { title: "Chat ID", description: "Target chat, e.g. -1001234567890.", control: (0, import_react.createElement)(FieldInput, { value: notifierCfg.telegram?.chatId ?? "", placeholder: "-1001234567890", onChange: (e) => saveNotifierCfg({ telegram: { chatId: e.target.value } }), style: { width: 220 } }) }),
      (0, import_react.createElement)(ToggleRow, { title: "Review notifications", description: "Also notify about finished reviews.", checked: notifierCfg.policy?.reviewNotifications === true, onChange: (v) => saveNotifierCfg({ policy: { reviewNotifications: v } }) })
    )
  };
  return (0, import_react.createElement)(
    "div",
    { "data-maestro-settings-card": "", style: { display: "flex", flexDirection: "column", gap: 8, width: "100%", maxWidth: 640, minWidth: 0, boxSizing: "border-box" } },
    (0, import_react.createElement)(
      "div",
      { style: { padding: "2px 2px 8px", display: "flex", gap: 10, alignItems: "flex-start" } },
      // Shared BrandBadge — same as dashboard sidebar/popup (BrandMark #0A84FF)
      (0, import_react.createElement)(
        "span",
        { "data-maestro-logo": "", style: { width: 28, height: 28, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--dsw-alias-brand-primary, #0A84FF)", backgroundColor: "#0A84FF", color: "#fff", flex: "none", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 0 0 1px var(--dsw-alias-border-l1)", boxSizing: "border-box", alignSelf: "flex-start", marginTop: 2 } },
        (0, import_react.createElement)("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, (0, import_react.createElement)("path", { d: "M2 11 L5 4 L8 9 L11 4 L14 11", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }))
      ),
      (0, import_react.createElement)(
        "div",
        { style: { display: "flex", flexDirection: "column", minWidth: 0 } },
        (0, import_react.createElement)("div", { style: { fontSize: 15, fontWeight: 600, color: t.labelPrimary, lineHeight: "22px" } }, "Maestro"),
        (0, import_react.createElement)("div", { style: { fontSize: 12, color: t.labelSecondary, lineHeight: "16px", marginTop: 2 } }, "Tunnel, access, review & guard \u2014 all via the shared Maestro store. Uses the same tokens and primitives as DSH settings.")
      )
    ),
    (0, import_react.createElement)("style", {}, "[data-maestro-logo]{background:#0A84FF !important; background-color:#0A84FF !important; color:#fff !important;}"),
    (0, import_react.createElement)(
      "div",
      { "data-maestro-tabs": "", role: "tablist", "aria-label": "Maestro settings sections" },
      ...TABS.map((tab) => (0, import_react.createElement)("button", { key: tab.id, "data-maestro-tab": "", "data-active": String(activeTab === tab.id), role: "tab", "aria-selected": activeTab === tab.id, onClick: () => setActiveTab(tab.id) }, tab.label))
    ),
    (0, import_react.createElement)("div", { "data-maestro-panel": activeTab, style: { display: "flex", flexDirection: "column", gap: 10, minWidth: 0 } }, tabContents[activeTab]),
    error ? (0, import_react.createElement)("p", { style: { color: t.stateError, fontSize: 12, margin: "8px 0 0", padding: "8px 10px", borderRadius: 8, background: "color-mix(in srgb, var(--dsw-alias-state-error-primary) 10%, transparent)", border: `1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 30%, transparent)` } }, error) : null
  );
}

// src/client/settings-nav-icon.ts
var SETTINGS_NAV_MARKER = "data-maestro-settings-nav";
function registerSettingsNavIcon(label, root) {
  if (typeof document === "undefined" && root === void 0) {
    return () => {
    };
  }
  const scope = root ?? document;
  let disposed = false;
  const sync = () => {
    if (disposed) return;
    const currentLabel = label().trim();
    const buttons = scope.querySelectorAll('[role="dialog"] nav button');
    for (const button of Array.from(buttons)) {
      const el = button;
      const matches = currentLabel.length > 0 && button.textContent != null && button.textContent.trim() === currentLabel;
      if (matches) el.setAttribute(SETTINGS_NAV_MARKER, "");
      else el.removeAttribute(SETTINGS_NAV_MARKER);
    }
  };
  sync();
  let observer = null;
  if (typeof MutationObserver !== "undefined") {
    observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  return () => {
    disposed = true;
    if (observer !== null) observer.disconnect();
    for (const element of Array.from(scope.querySelectorAll(`[${SETTINGS_NAV_MARKER}]`))) {
      ;
      element.removeAttribute(SETTINGS_NAV_MARKER);
    }
  };
}

// src/client/index.tsx
var SETTINGS_NAV_CSS = `

/* maestro: replace the settings-nav fallback gear with the Maestro M-logo glyph \u2014 same mark as sidebar/popup BrandMark */
[${SETTINGS_NAV_MARKER}] > svg:first-child,
[${SETTINGS_NAV_MARKER}] > svg.zWKi1a_navIcon {
  display: none !important;
}

[${SETTINGS_NAV_MARKER}]::before {
  content: '';
  flex: none;
  width: 16px;
  height: 16px;
  display: inline-block;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 11 L5 4 L8 9 L11 4 L14 11'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none' stroke='black' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 11 L5 4 L8 9 L11 4 L14 11'/%3E%3C/svg%3E") center / contain no-repeat;
}
`;
var inject = ["slots", "connection"];
function installNavIconStyle() {
  const tag = document.createElement("style");
  tag.dataset.plugin = "@ddtcorex/dsh-maestro-config";
  tag.dataset.pluginCss = "maestro/settings-nav.css";
  tag.textContent = SETTINGS_NAV_CSS;
  document.head.appendChild(tag);
  return () => {
    document.querySelector('style[data-plugin-css="maestro/settings-nav.css"]')?.remove();
  };
}
function apply(ctx) {
  const slots = ctx.get?.("slots");
  if (slots === void 0) return;
  const rpcCall = (endpoint, payload, signal) => {
    const connection = ctx.get?.("connection");
    if (!connection?.rpc?.call) return Promise.reject(new Error("RPC not available"));
    return connection.rpc.call(MAESTRO_RPC_CHANNEL, endpoint, payload, signal);
  };
  const configRpcCall = (endpoint, payload, signal) => {
    const connection = ctx.get?.("connection");
    if (!connection?.rpc?.call) return Promise.reject(new Error("RPC not available"));
    return connection.rpc.call("/dsh-maestro-config", endpoint, payload, signal);
  };
  ctx.effect(() => registerSettingsNavIcon(() => "Maestro"), "maestro: settings nav icon");
  ctx.effect(installNavIconStyle, "maestro: settings nav css");
  slots.inject(
    "settings.section",
    () => slots.register(
      { name: "settings.section", id: "maestro", order: 25, label: () => "Maestro", inject: () => ({ rpcCall, configRpcCall }) },
      MaestroSettingsTab
    )
  );
}

    return module.exports;
  }
});
