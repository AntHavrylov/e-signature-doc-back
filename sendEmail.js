// import nodemailer (after npm install nodemailer)
const nodemailer = require('nodemailer');
const log = require('./global/console');


const emailFrom = "Pure.m.s.037791101@gmail.com";
const emailTo = "Pure.m.k.037791101@gmail.com";
const pass = "ybrt037791101";


//send email that send the pdf file 
async function sendPdfToMail(data) {
    return new Promise(async (res, rej) => {
        let pdfFile = data;

        let subject = "מסמך חתימה דיגטלית חדש";
        let message = `
        <div style="text-align: center">
        <h1>הגיע אלייך מסמך חתום דיגיטלי חדש</h1>
        <p style="font-size: 16px">
            <label>קובץ חדש</label> 
            <br/>
            תוכל לצפות בקובץ עם החתימה הדיגיטלית או להוריד אותו
        </p>
        <img border="0" width="200" height="100" id="m_4331912880153398889_x0000_i1026" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Jaffa_slope1821.jpg/1000px-Jaffa_slope1821.jpg" class="CToWUd">
        </div>
        `;

        try {
            let response = await sendMail(subject, message, pdfFile);

            res(response);
        } catch (err) {
            log.error("Failed to send approve email to user");
            res(false);
        }
    });
}



/* function that send the email */
/* function of  'nodemailer' packege*/
async function sendMail(subject, text, pdfFile) {
    return new Promise(async (res, rej) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailFrom,
                pass: pass,
            },
        });

        var mailOptions = {
            from: emailFrom,
            to: emailTo,
            subject: subject,
            html: text,
            attachments: [{
                filename: 'filename.pdf',
                content: pdfFile,
                contentType: 'application/pdf'
            }]
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                log.error(error.message);
                res(false);
            } else {
                log.info("Email sent: " + info.response);
                log.info("Email sent to : " + mailOptions.to);
                res(true);
            }
        });
    })
}

module.exports.sendPdfToMail = sendPdfToMail;