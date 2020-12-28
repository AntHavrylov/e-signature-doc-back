const PDFDocument = require('pdfkit');
const sendemail = require('./sendEmail');
const fs = require('fs');


/* ***************************************************************** */
/*                          Create Pdf file                          */
/* ***************************************************************** */
// create pdf file
// download it to the location of this project
// return buffer of the pdf file

async function mainCreatePdf(data) {
    return new Promise(async resolve => {
        let responseFromsendEmail;
        let responseFromCreatePdfFile;
        //create teh pdf file
        responseFromCreatePdfFile = await createPdf(data);

        //send email with pdf file
        if (responseFromCreatePdfFile.status)
            responseFromsendEmail = await sendPdfInEmail(responseFromCreatePdfFile.pdfBufferData);
        else
            responseFromsendEmail = false;


        resolve({
            pdfStatus: responseFromCreatePdfFile.status,
            mailStatus: responseFromsendEmail
        })
    })
}

//create the pdf file
//return the buffer of the pdf file
async function createPdf(data) {
    return new Promise(async resolve => {
        try {
            //create PDF object
            let pdfDoc = new PDFDocument;
            pdfDoc.font('assets/Rubik-VariableFont_wght.ttf');

            //Add file name
            pdfDoc.pipe(fs.createWriteStream('DigitalSignature.pdf'));

            //add contact page 
            pdfDoc.text("בקשה להרשאת הרשמה לחיוב בחשבון", {
                align: 'center'
            });

            pdfDoc.text("לכבוד", {
                align: 'right'
            });
            pdfDoc.text("בנק", {
                align: 'right'
            });
            pdfDoc.text('סניף              ("הבנק")', {
                align: 'right'
            });

            pdfDoc.text("הרשאה כללית, שאינה כוללת הגבלות", {
                align: 'right'
            });

            pdfDoc.text("הרשאה הכוללת לפחות אחת נההגבלות הבאות:", {
                align: 'right'
            });

            pdfDoc.text('תקרת סכום החיוב ב-              ש"ח', {
                align: 'right'
            });
            pdfDoc.text('מועד פקיעת תוקף ההרשאה ביום -        ', {
                align: 'right'
            });

            pdfDoc.text('לתשומת לבכם: אי סימון אחת מהחלופות המוצגות לעיל, משמעה בחירה בהרשאה כללית, שאינה כוללת הגבלות.', {
                align: 'right'
            });

            pdfDoc.text('1.  אנו הח"מ              מס זהות/ח.פ          ("הלקוחות")', {
                align: 'center'
            });

            pdfDoc.text('מבקשים בזה להקים בחשבוננו הנ"ל ("החשבון")  הרשאה לחיוב חשבוננו, בסכומים ובמועדים שיומצאו לכם מדי פעם ע"י המוטב באמצעות קוד המוסד, בכפוף למגבלות שסומנו לעיל ( ככל שסומנו)', {
                align: 'right'
            });

            pdfDoc.text("2.  כמו כן יחולן ההוראות הבאות:", {
                align: 'center'
            });

            let pic = pdfDoc.image(new Buffer(data.pictureData.replace('data:image/png;base64,', ''), 'base64'), 100, 100); // this will decode your base64 to a new buffer


            //end and create the file
            pdfDoc.end();



            //Finalize document and convert to buffer array
            let buffers = []
            pdfDoc.on("data", buffers.push.bind(buffers))
            pdfDoc.on("end", () => {
                let pdfBufferData = new Uint8Array(Buffer.concat(buffers));
                resolve({
                    status: true,
                    pdfBufferData: pdfBufferData
                });
            });
        } catch (ex) {
            log.error("Failed create pdf file, Error: " + ex.message);
            resolve({
                status: false,
                pdfBufferData: null
            });
        }
    });
}


/* ************************************************************ */
/*                          Send email                          */
/* ************************************************************ */
// send request to email with the pdf buffer data
async function sendPdfInEmail(pdfData) {
    return new Promise(async resolve => {
        let response = await sendemail.sendPdfToMail(pdfData);

        resolve(response);
    });
}






module.exports.mainCreatePdf = mainCreatePdf;