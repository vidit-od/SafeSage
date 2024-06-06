"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.createPost = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
    name: zod_1.default.string().optional(),
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
exports.createPost = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.updatePost = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional()
});
