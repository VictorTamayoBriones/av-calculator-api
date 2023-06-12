import * as express from "express";
import * as service from "./service";

async function getPDFLinkController(req: express.Request, res: express.Response) {
    try {
        const data = req.body.data;
        await service.generateOfferPDF(data)
        .then((response) => {
            res.send({
                code: 200,
                message: 'Contrato generado correctamente',
                data: response
            })
        })
        .catch((error) => {
            throw new Error(error)
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

export {
    getPDFLinkController
}