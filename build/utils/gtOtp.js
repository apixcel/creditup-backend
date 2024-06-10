"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const generateOtp = () => Math.floor(Math.random() * 1000000);
exports.generateOtp = generateOtp;
