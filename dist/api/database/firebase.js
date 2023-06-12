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
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.auth = exports.firestore = void 0;
const admin = __importStar(require("firebase-admin"));
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const bucket = process.env.STORAGE_BUCKET;
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com"
});
function firestore() {
    try {
        return admin.firestore();
    }
    catch (error) {
        throw error;
    }
}
exports.firestore = firestore;
function auth() {
    try {
        return admin.auth();
    }
    catch (error) {
        throw error;
    }
}
exports.auth = auth;
function storage() {
    try {
        return admin.storage().bucket(bucket);
    }
    catch (error) {
    }
}
exports.storage = storage;
//# sourceMappingURL=firebase.js.map