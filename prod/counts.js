"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = require("path");
const logHandler_1 = require("./utils/logHandler");
const titleCase_1 = require("./utils/titleCase");
const namespaces = ["becca", "beccalia", "naomi", "novas", "rosalia"];
(() => __awaiter(void 0, void 0, void 0, function* () {
    let grandTotal = 0;
    let result = "\n";
    for (const name of namespaces) {
        result += `=== ${(0, titleCase_1.titleCase)(name)} ===\n`;
        let total = 0;
        const fileNames = yield (0, promises_1.readdir)((0, path_1.join)(process.cwd(), "json", name));
        for (const file of fileNames) {
            const json = (yield Promise.resolve(`${(0, path_1.join)(process.cwd(), "json", name, file)}`).then(s => __importStar(require(s))))
                .default;
            result += `${(0, titleCase_1.titleCase)(file.split(".")[0])}: ${json.length}\n`;
            total += json.length;
            grandTotal += json.length;
        }
        result += `Total: ${total}\n`;
        logHandler_1.logHandler.log("info", result);
    }
    result += "=== Grand Total ===\n";
    result += `Total assets: ${grandTotal}\n`;
    logHandler_1.logHandler.log("info", result);
}))();
