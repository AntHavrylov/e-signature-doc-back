const PDFDocument = require('pdfkit');
const sendemail = require('./sendEmail');
const fs = require('fs');


const companyName = "עמותת דקות הזהב על שם אדיר";
const companyNumber = "1234321";
const clientNumber = ""


/* ***************************************************************** */
/*                          Create Pdf file                          */
/* ***************************************************************** */
// create pdf file
// download it to the location of this project
// return buffer of the pdf file

async function mainCreatePdf(data) {
    return new Promise(async resolve => {
        let responseFromSendEmail = false;
        let responseFromCreatePdfFile = false;


        //create teh pdf file
        responseFromCreatePdfFile = await createPdf(data);

        //send email with pdf file
        /*  if (responseFromCreatePdfFile.status)
             responseFromSendEmail = await sendPdfInEmail(responseFromCreatePdfFile.pdfBufferData); */


        resolve({
            pdfStatus: responseFromCreatePdfFile.status,
            mailStatus: responseFromSendEmail
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



            /* ******************************** */
            /*      IMAGES IN THE PDF FILE      */
            /* ******************************** */
            // Scale the image
            pdfDoc.image('assets/images/2.jpg', 450, 10, {
                scale: 0.08
            }).text(reverseString("  עמותת דקות הזהב golden-minutes") + "                            . ", {
                align: 'right'
            })

            pdfDoc.image('assets/images/1.jpg', 10, 10, {
                scale: 0.19
            }).text(".                " + "levana-pure", {
                align: 'left'
            });




            /* ******************************** */
            /*     CONTACTS IN THE PDF FILE     */
            /* ******************************** */

            //GENERAL
            pdfDoc.moveDown(0.9);

            //add contact page 
            pdfDoc.text(reverseString(" בקשה להקמת הרשאה לחיוב בחשבון"), {
                align: 'center'
            })



            pdfDoc.text(reverseString("לכבוד"), {
                align: 'right'
            });
            pdfDoc.text(reverseString("בנק:  " + data.selectedBank), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' סניף הבנק: ' + data.bankBranchInput), {
                align: 'right'
            });


            pdfDoc.text(reverseString("\n"), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' מספר בנק: ' + data.selectedBank + '    מספר סניף: ' + data.bankBranchInput + '    מספר חשבון: ' + data.bankAccountInput), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' שם המוסד: ' + companyName + '    קוד המוסד: ' + companyNumber), {
                align: 'right'
            });

            pdfDoc.text(reverseString(' אסמכתא מספר מזהה של הלקוח אצל המוטב: ' + clientNumber), {
                align: 'right'
            });



            pdfDoc.text(reverseString(" הרשאה כללית, שאינה כוללת הגבלות: \n"), {
                align: 'right'
            }).rect(340, 239, 20, 20).stroke();



            pdfDoc.text(reverseString(" הרשאה הכוללת לפחות אחת מההגבלות הבאות:  \n"), {
                align: 'right'
            });

            pdfDoc.text(reverseString(' תקרת סכום החיוב ב- ש"ח: ' + data.moneyAmountInput), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' מועד פקיעת תוקף ההרשאה ביום: ' + data.datepickerInput), {
                align: 'right'
            });

            pdfDoc.fillColor('red');
            pdfDoc.text(reverseString(' לתשומת לבכם: '), {
                align: 'right'
            })
            pdfDoc.text(reverseString(' אי סימון אחת מהחלופות המוצגות לעיל, משמעה בחירה בהרשאה כללית, שאינה כוללת הגבלות'), {
                align: 'right'
            }).fillColor('black');


            /* 1 */
            pdfDoc.text(reverseString("\n"), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' .1 ' + ' אני הח"מ: ' + data.fullNameInput + ',    מספר זהות: ' + data.idNumberInput), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' מבקש בזה להקים בחשבוננו הנ"ל "החשבון"  הרשאה לחיוב חשבוננו, בסכומים ובמועדים שיומצאו'), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' לכם מדי פעם ע"י המוטב באמצעות קוד המוסד, בכפוף למגבלות שסומנו לעיל  ככל שסומנו'), {
                align: 'right'
            });


            /* 2 */
            pdfDoc.text(reverseString("\n"), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' .2 ' + " כמו כן יחולן ההוראות הבאות: "), {
                align: 'right'
            });

            pdfDoc.text(reverseString(" א - עלינו לקבל מהמוטב את הפרטים הנדרשים למילוי הבקשה להקמת הרשאה לחיוב בחשבון."), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' ב - הרשאה זו ניתנת לביטול ע"י הודעה בכתב מאיתנו לבנק, שתכנס לתוקף יום עסקים אחד'), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' לאחר מתן ההודעה לבנק, וכן ניתנת לביטול עפ"י הוראת כל דין. '), {
                align: 'right'
            });

            pdfDoc.text(reverseString(' ג - נהיה רשאים לבטל חיוב מסיום, ובלבד שההודעה על כך תמסר על ידנו בכתב לבנק, '), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' לא יאוחר מ-3 ימי עסקים לאחר מועד החיוב. ככל שהודעת הביטול ניתנה לאחר מועד החיוב, '), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' הזיכוי ייעשה בערך יום מתן הודעת הביטול. '), {
                align: 'right'
            });

            pdfDoc.text(reverseString(' ד - נהיה רשאים לדרוש מהבנק, בהודעה בכתב, לבטל חיוב, אם החיוב אינו תואם את מועד'), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' פקיעת התוקף שנקבע בהרשאה או את הסכומים שנקבעו בהרשאה, אם נקבעו. '), {
                align: 'right'
            });

            pdfDoc.text(reverseString(' ה - הבנק אינו אחראי בכל הנוגע לעסקה שבינינו לבין המוטב. '), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' ו - הרשאה שלא יעשה בה שימוש במשך תקופה של 24 חודשים ממועד החיוב האחרון, בטלה. '), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' ז - אם תענו לבקשתנו, הבנק יפעל בהתאם להוראות הרשאה זו, בכפוף להוראות כל דין והסכם'), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' שבינינו לבין הבנק. '), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' ח - הבנק רשאי להוציאנו מן הסדר המפורט בהרשאה זו, אם תהיה לו סיבה סבירה לכך, ויודיע לנו'), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' על כך מיד לאחר קבלת החלטתו תוך ציון הסיבה. '), {
                align: 'right'
            });



            pdfDoc.text(reverseString("\n\n"), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' אנו מסכימים שבקשה זו תוגש לבנק ע"י המוטב'), {
                align: 'right'
            });
            pdfDoc.text(reverseString("\n"), {
                align: 'right'
            });
            pdfDoc.text(reverseString(' תאריך: ' + getStringDateNow() + "    חתימה: "), {
                align: 'center'
            });




            // Fit the image in the dimensions, and center it both horizontally and vertically
            pdfDoc.image(new Buffer(data.pictureData.replace('data:image/png;base64,', ''), 'base64'), 125, 640, {
                    fit: [100, 100],
                    align: 'center',
                    valign: 'center'
                })
                .rect(120, 665, 110, 50).stroke();


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






/* **************************************************************** */
/*                          reverse string                          */
/* **************************************************************** */
function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(" "); // var splitString = "hello".split("");

    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = .reverse();


    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(" "); // var joinArray = 

    //Step 4. Return the reversed string
    return joinArray;
}


/* ********************************************* */
/* return string date : 'dd/mm/yyyy' of date now */
/* ********************************************* */
function getStringDateNow() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (day < 10)
        day = "0" + day;
    if (month < 10)
        month = "0" + month;

    let stringDate = day + "/" + month + "/" + date.getFullYear();

    return stringDate;
}


module.exports.mainCreatePdf = mainCreatePdf;