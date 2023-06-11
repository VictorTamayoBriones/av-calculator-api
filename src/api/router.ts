import express from "express";


import * as PdfController from './pdf/controller';

const router = express.Router();

//PDF
router.post("/get-pdf/contrato-pdf", PdfController.getPDFLinkController);


export { router };