"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractValues = void 0;
const extractValues = (data) => {
    const result = [];
    const extract = (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === "object" && obj[key] !== null) {
                    extract(obj[key]);
                }
                else {
                    result.push(obj[key]);
                }
            }
        }
    };
    extract(data);
    return result;
};
exports.extractValues = extractValues;
