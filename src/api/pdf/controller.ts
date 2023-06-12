import * as express from "express";
import * as service from "./service";

async function getPDFLinkController(req: express.Request, res: express.Response) {
    try {
        const data = req.body.data;
        const pdf = await service.generateOfferPDF(data)
        res.send({
            test: "test",
            fileLink: pdf
        })
    } catch (error) {
        res.status(error.code).send(error);
    }
}

export {
    getPDFLinkController
}