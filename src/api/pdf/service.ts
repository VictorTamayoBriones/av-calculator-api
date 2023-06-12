import pdf from 'html-pdf';
import ejs from 'ejs';
import { storage } from '../database/firebase';

const fs = require('fs');



async function generateOfferPDF(data: any) {
    try {
        // Render HTML to ejs
        let htmlToRender = await ejs.renderFile("src/api/pdf/templates/offer-template.ejs", {data})

        let pdfResponse = await generatePDF(htmlToRender)
        
        return pdfResponse


    } catch (error) {
        console.log(error);
    }
}


async function generatePDF(htmlToRender: any) {
    // Generate PDF
    const generarPDF = new Promise((resolve, reject) => {
        pdf.create(htmlToRender,{
            "header":{
                "height": "5mm",
            },
            childProcessOptions: {
                env: {
                  OPENSSL_CONF: '/dev/null',
                },
              }
        }).toFile(`./pdf/contrato-av.pdf`, async function (err, res) {
            
            if (err) {
                console.log("err",err)
                throw {
                    code: 500,
                    message: "Failed to create PDF",
                    queryRequest: err,
                };
            }

            if (res) {

                // upload pdf to firebase
                let filePath = `./pdf/contrato-av.pdf`;

                let snapshot: any = await storage().upload(filePath, {
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
        })
    })

    return generarPDF.then(resultado => {
        return resultado
    })
}

export {
    generateOfferPDF
}