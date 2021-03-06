﻿var crypto = require("crypto");

module.exports = {
    roundToPrecision: function(number, precision) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    },
    
    formatBytes: function(size) {
        if (size) {
            var base = Math.log(size) / Math.log(1000);
            var suffixes = ["", "KB", "MB", "GB", "TB"];
            var ret = this.roundToPrecision(Math.pow(1000, base - Math.floor(base)), 2) + suffixes[Math.floor(base)];
            return ret || "0";
        } else return "0";
    },

    truncateToFirstParagraph: function (string) {
        // Handle Unix and Windows newlines
        return string.replace(/(.*)\r?\n\r?\n.*/g, "$1");
    },

    isHexString: function (string) {
        return /^[0-9A-Fa-f]{8}-?[0-9A-Fa-f]{4}-?[0-9A-Fa-f]{4}-?[0-9A-Fa-f]{4}-?[0-9A-Fa-f]{12}$/.test(string);
    },

    hexToBin: function (hex) {
        return Buffer.from(hex.replace(/-/g, ""), "hex");
    },

    binToHex: function (bin) {
        var s = bin.toString("hex");
        return s.substr(0, 8) + "-" + s.substr(8, 4) + "-" + s.substr(12, 4) + "-" + s.substr(16, 4) + "-" + s.substr(-12);
    },

    sha256: function (toHash) {
        return crypto.createHash("sha256").update(toHash).digest("hex");
    },

    createSalt: function () {
        return crypto.randomBytes(32).toString("hex");
    }
};