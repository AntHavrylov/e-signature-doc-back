const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports.createPdf = function (data) {

    //create PDF object
    let pdfDoc = new PDFDocument;
    pdfDoc.font('assets/Rubik-VariableFont_wght.ttf');
    //Add file name
    pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));

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

      /*   var buffer = new Buffer(data.split(',')[1] || 'base64');
    pdfDoc.image(buffer, 10, 10, {
        height: 75
    });
 */
    let pic = pdfDoc.image(new Buffer(data.replace('data:image/png;base64,', ''), 'base64'), 100, 100); // this will decode your base64 to a new buffer
    let x = 3;

    //end and create the file
    pdfDoc.end();
}
