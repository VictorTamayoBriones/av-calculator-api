"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOfferPDF = void 0;
const html_pdf_1 = __importDefault(require("html-pdf"));
const ejs_1 = __importDefault(require("ejs"));
const firebase_1 = require("../database/firebase");
const fs = require('fs');
function generateOfferPDF(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Render HTML to ejs
            let htmlToRender = yield ejs_1.default.renderFile("src/api/pdf/templates/offer-template.ejs", { data });
            let pdfResponse = yield generatePDF(htmlToRender);
            return pdfResponse;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.generateOfferPDF = generateOfferPDF;
function generatePDF(htmlToRender) {
    return __awaiter(this, void 0, void 0, function* () {
        // Generate PDF
        const generarPDF = new Promise((resolve, reject) => {
            html_pdf_1.default.create(htmlToRender, {
                "header": {
                    "height": "5mm",
                },
                childProcessOptions: {
                    env: {
                        OPENSSL_CONF: '/dev/null',
                    },
                }
            }).toFile(`./pdf/contrato-av.pdf`, function (err, res) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log("err", err);
                        throw {
                            code: 500,
                            message: "Failed to create PDF",
                            queryRequest: err,
                        };
                    }
                    if (res) {
                        // upload pdf to firebase
                        let filePath = `./pdf/contrato-av.pdf`;
                        let snapshot = yield (0, firebase_1.storage)().upload(filePath, {
                            public: true,
                            metadata: {
                                contentType: 'application/pdf',
                            },
                            gzip: true,
                            destination: `contrato/av`
                        });
                        resolve(snapshot[0].metadata.mediaLink);
                        fs.unlinkSync(`./pdf/contrato-av.pdf`);
                    }
                });
            });
        });
        return generarPDF.then(resultado => {
            return resultado;
        });
    });
}
//# sourceMappingURL=service.js.map