import * as express from "express";
import * as service from "./service";

async function getPDFLinkController(req: express.Request, res: express.Response) {
    try {
        const data = req.body.data;

        res.send({
            code: 200,
            message: 'Contrato generado correctamente',
            data: await service.generateOfferPDF(data)
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

export {
    getPDFLinkController
}